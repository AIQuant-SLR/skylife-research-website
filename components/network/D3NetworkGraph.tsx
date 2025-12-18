'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { NetworkNode, NetworkLink, NetworkGraphData } from '@/lib/types/network';

interface Props {
  data: NetworkGraphData;
  width?: number;
  height?: number;
  onNodeClick?: (node: NetworkNode) => void;
}

export default function D3NetworkGraph({
  data,
  width = 1200,
  height = 700,
  onNodeClick,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous render

    // Create container group for zoom/pan
    const g = svg.append('g');

    // Color scale by cluster
    const colorScale = d3.scaleOrdinal<number, string>()
      .domain([0, 1, 2, 3, 4])
      .range(['#22d3ee', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899']);

    // Pre-compute connected links for each node for fast lookup
    const nodeConnections = new Map<string, Set<number>>();
    data.nodes.forEach(node => {
      nodeConnections.set(node.id, new Set());
    });

    data.links.forEach((link, index) => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      nodeConnections.get(sourceId)?.add(index);
      nodeConnections.get(targetId)?.add(index);
    });

    // Create force simulation with tighter clustering
    const simulation = d3.forceSimulation<NetworkNode>(data.nodes)
      .force('link', d3.forceLink<NetworkNode, NetworkLink>(data.links)
        .id(d => d.id)
        .distance(60) // Reduced from 100 to bring nodes closer
        .strength(d => d.weight * 0.8) // Increased strength for tighter links
      )
      .force('charge', d3.forceManyBody().strength(-250)) // Less repulsion for tighter clustering
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(25)) // Slightly reduced collision radius
      .force('x', d3.forceX(width / 2).strength(0.05)) // Pull nodes toward center X
      .force('y', d3.forceY(height / 2).strength(0.05)); // Pull nodes toward center Y

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom as any);

    // Draw links
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .enter()
      .append('line')
      .attr('stroke', '#334155')
      .attr('stroke-width', d => Math.sqrt(d.weight) * 2)
      .attr('stroke-opacity', 0.4);

    // Draw nodes
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(data.nodes)
      .enter()
      .append('g')
      .style('cursor', 'pointer')
      .call(d3.drag<SVGGElement, NetworkNode>()
        .on('start', dragStarted)
        .on('drag', dragged)
        .on('end', dragEnded) as any
      );

    // Add circles to nodes (increased default size)
    const circles = node.append('circle')
      .attr('r', d => d.size || 16) // Increased from 12 to 16
      .attr('fill', d => colorScale(d.cluster || 0))
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add labels (adjusted position for larger nodes)
    const labels = node.append('text')
      .text(d => d.id)
      .attr('font-size', 12) // Slightly larger font
      .attr('font-weight', 600)
      .attr('fill', '#cbd5e1')
      .attr('text-anchor', 'middle')
      .attr('dy', -22) // Adjusted for larger nodes
      .style('pointer-events', 'none')
      .style('user-select', 'none');

    // Optimized hover behavior using D3 only (no React state)
    node
      .on('mouseenter', function(event, d) {
        const connectedLinkIndices = nodeConnections.get(d.id);

        if (connectedLinkIndices) {
          // Highlight connected links
          link
            .filter((_, i) => connectedLinkIndices.has(i))
            .attr('stroke', '#22d3ee')
            .attr('stroke-opacity', 0.8)
            .attr('stroke-width', function() {
              return parseFloat(d3.select(this).attr('stroke-width')) * 1.5;
            });
        }

        // Highlight node
        d3.select(this).select('circle')
          .attr('r', (d.size || 16) * 1.3)
          .attr('stroke-width', 3);

        // Count connections for this node
        const connectionCount = connectedLinkIndices ? connectedLinkIndices.size : 0;

        // Show tooltip
        if (tooltipRef.current) {
          const tooltip = d3.select(tooltipRef.current);
          tooltip
            .style('display', 'block')
            .html(`
              <div class="font-bold text-lg text-cyan-400 mb-1">${d.id}</div>
              <div class="text-sm text-slate-400 mb-2">
                Connections: <span class="text-white font-semibold">${connectionCount}</span>
              </div>
              ${d.momentum ? `<div class="text-sm text-slate-400 mb-2">Momentum: <span class="text-white font-semibold">${d.momentum}</span></div>` : ''}
              <div class="mt-3 pt-3 border-t border-slate-800 text-xs text-slate-500">
                Drag to reposition • Click for details
              </div>
            `);
        }
      })
      .on('mouseleave', function(event, d) {
        const connectedLinkIndices = nodeConnections.get(d.id);

        if (connectedLinkIndices) {
          // Reset connected links
          link
            .filter((_, i) => connectedLinkIndices.has(i))
            .attr('stroke', '#334155')
            .attr('stroke-opacity', 0.4)
            .attr('stroke-width', function() {
              return parseFloat(d3.select(this).attr('stroke-width')) / 1.5;
            });
        }

        // Reset node
        d3.select(this).select('circle')
          .attr('r', d.size || 16)
          .attr('stroke-width', 2);

        // Hide tooltip
        if (tooltipRef.current) {
          d3.select(tooltipRef.current).style('display', 'none');
        }
      })
      .on('click', (event, d) => {
        event.stopPropagation();
        onNodeClick?.(d);
      });

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as NetworkNode).x!)
        .attr('y1', d => (d.source as NetworkNode).y!)
        .attr('x2', d => (d.target as NetworkNode).x!)
        .attr('y2', d => (d.target as NetworkNode).y!);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragStarted(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event: d3.D3DragEvent<SVGGElement, NetworkNode, NetworkNode>) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // Cleanup on unmount
    return () => {
      simulation.stop();
    };
  }, [data, width, height, onNodeClick]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="bg-slate-900/50 rounded-xl border border-slate-800"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      {/* Hover tooltip */}
      <div
        ref={tooltipRef}
        className="absolute top-4 right-4 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-lg p-4 shadow-2xl max-w-xs"
        style={{ display: 'none' }}
      />

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-lg p-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span>🔍 Scroll to zoom</span>
          <span>👆 Drag to pan</span>
          <span>🖱️ Hover to highlight connections</span>
        </div>
      </div>
    </div>
  );
}
