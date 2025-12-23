'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import StockAutocomplete from './StockAutocomplete';
import { useAuth } from '@/lib/auth/context';
import { Plus, Trash2, TrendingUp, AlertCircle } from 'lucide-react';

const schema = z.object({
  stocks: z
    .array(
      z.object({
        symbol: z.string().min(1, 'Stock symbol required'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
      })
    )
    .min(1, 'At least one stock required')
    .max(5, 'Maximum 5 stocks allowed'),
  custom_instructions: z.string().optional(),
  market_context: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  onAnalysisComplete: (data: any) => void;
}

export default function StockInputForm({ onAnalysisComplete }: Props) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      stocks: [{ symbol: '', quantity: 1 }],
      market_context: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'stocks',
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      setError('Please sign in to analyze portfolio');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/portfolio/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          email: user.email,
          uid: user.uid,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      onAnalysisComplete(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze portfolio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Stock inputs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Your Portfolio ({fields.length}/5 stocks)
          </h3>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-3 items-start p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
          >
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Stock Symbol
              </label>
              <Controller
                name={`stocks.${index}.symbol`}
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <StockAutocomplete
                    value={value}
                    onChange={onChange}
                    placeholder="e.g., RELIANCE, TCS"
                    error={error?.message}
                  />
                )}
              />
            </div>

            <div className="w-32">
              <label className="block text-sm font-medium mb-2 text-slate-300">
                Quantity
              </label>
              <input
                type="number"
                {...register(`stocks.${index}.quantity`, { valueAsNumber: true })}
                min="1"
                placeholder="1"
                className="w-full px-3 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
              />
              {errors.stocks?.[index]?.quantity && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.stocks[index]?.quantity?.message}
                </p>
              )}
            </div>

            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="mt-8 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                aria-label="Remove stock"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}

        {/* Add stock button */}
        {fields.length < 5 && (
          <button
            type="button"
            onClick={() => append({ symbol: '', quantity: 1 })}
            className="w-full py-3 border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-lg text-slate-400 hover:text-cyan-400 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Another Stock
          </button>
        )}

        {errors.stocks && (
          <p className="text-red-400 text-sm">{errors.stocks.message}</p>
        )}
      </div>

      {/* Optional settings */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-300">Analysis Options</h4>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            {...register('market_context')}
            className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-0 focus:ring-offset-slate-950"
          />
          <span className="text-sm text-slate-300 group-hover:text-slate-200">
            Include current market context and economic indicators
          </span>
        </label>

        <div>
          <label className="block text-sm font-medium mb-2 text-slate-300">
            Custom Instructions (Optional)
          </label>
          <textarea
            {...register('custom_instructions')}
            placeholder="e.g., Focus on long-term growth potential, or compare with specific peers..."
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors resize-none"
            rows={3}
          />
          <p className="text-xs text-slate-500 mt-1">
            Provide specific guidance for the AI analysis
          </p>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-medium">Analysis Failed</p>
            <p className="text-red-300 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Analyzing Portfolio...
          </>
        ) : (
          <>
            <TrendingUp className="w-5 h-5" />
            Analyze Portfolio
          </>
        )}
      </button>

      {loading && (
        <p className="text-center text-sm text-slate-400">
          This may take 15-30 seconds. Please don't refresh the page.
        </p>
      )}
    </form>
  );
}
