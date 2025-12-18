'use client';

import { useState, useEffect, useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { StockSearchResult } from '@/lib/types/stock';
import { Search, Loader2 } from 'lucide-react';

interface Props {
  value: string;
  onChange: (symbol: string) => void;
  placeholder?: string;
  error?: string;
}

export default function StockAutocomplete({ value, onChange, placeholder, error }: Props) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<StockSearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  const searchStocks = useDebouncedCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/stocks/search?q=${encodeURIComponent(q)}`);
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error('Stock search error:', error);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    searchStocks(query);
  }, [query, searchStocks]);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (stock: StockSearchResult) => {
    setQuery(stock.symbol);
    onChange(stock.symbol);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || 'Search stock symbol...'}
          className={`w-full pl-10 pr-10 py-3 bg-slate-800/50 border ${
            error ? 'border-red-500' : 'border-slate-700'
          } rounded-lg focus:border-cyan-500 focus:outline-none transition-colors text-white placeholder-slate-500`}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-5 h-5 text-cyan-400 animate-spin" />
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl max-h-64 overflow-y-auto"
        >
          {suggestions.map((stock, index) => (
            <button
              key={stock.symbol}
              type="button"
              onClick={() => handleSelect(stock)}
              className={`w-full px-4 py-3 text-left transition-colors flex justify-between items-center ${
                index === selectedIndex
                  ? 'bg-slate-800 border-l-2 border-cyan-500'
                  : 'hover:bg-slate-800/50'
              }`}
            >
              <div>
                <div className="font-semibold text-white">{stock.symbol}</div>
                <div className="text-sm text-slate-400 truncate">{stock.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
