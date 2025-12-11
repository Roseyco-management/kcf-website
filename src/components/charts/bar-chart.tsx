"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartLine, ChartDataPoint } from '@/types/analytics';

interface BarChartProps {
  data: any[]; // Accept any array of objects
  bars?: ChartLine[]; // Optional - for multi-bar charts
  dataKey?: string; // Key for the data value (for single bar)
  nameKey?: string; // Key for the name/label
  height?: number;
  layout?: 'vertical' | 'horizontal';
  orientation?: 'vertical' | 'horizontal'; // Alias for layout
  showGrid?: boolean;
  showLegend?: boolean;
}

export function BarChart({
  data,
  bars,
  dataKey,
  nameKey = 'name',
  height = 300,
  layout,
  orientation,
  showGrid = true,
  showLegend = false,
}: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className="flex items-center justify-center text-sm text-gray-500"
        style={{ height }}
      >
        No data available
      </div>
    );
  }

  // Use orientation as fallback for layout
  const chartLayout = layout || orientation || 'horizontal';

  const margin =
    chartLayout === 'vertical'
      ? { top: 5, right: 30, left: 120, bottom: 5 }
      : { top: 5, right: 30, left: 20, bottom: 5 };

  // For single bar charts with dataKey
  const isSingleBar = dataKey && !bars;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        layout={chartLayout === 'vertical' ? 'vertical' : 'horizontal'}
        margin={margin}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" />}
        {chartLayout === 'horizontal' ? (
          <>
            <XAxis
              dataKey={nameKey || 'date'}
              stroke="#4A4A4A"
              tick={{ fill: '#4A4A4A', fontSize: 12 }}
              tickLine={{ stroke: '#E5E0D8' }}
            />
            <YAxis
              stroke="#4A4A4A"
              tick={{ fill: '#4A4A4A', fontSize: 12 }}
              tickLine={{ stroke: '#E5E0D8' }}
            />
          </>
        ) : (
          <>
            <XAxis
              type="number"
              stroke="#4A4A4A"
              tick={{ fill: '#4A4A4A', fontSize: 12 }}
              tickLine={{ stroke: '#E5E0D8' }}
            />
            <YAxis
              dataKey={nameKey || 'date'}
              type="category"
              stroke="#4A4A4A"
              tick={{ fill: '#4A4A4A', fontSize: 12 }}
              tickLine={{ stroke: '#E5E0D8' }}
              width={150}
            />
          </>
        )}
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E0D8',
            borderRadius: '8px',
            padding: '12px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          labelStyle={{
            color: '#151A4A',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        />
        {showLegend && (
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
        )}
        {isSingleBar ? (
          <Bar
            dataKey={dataKey}
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || '#151A4A'} />
            ))}
          </Bar>
        ) : (
          bars?.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              fill={bar.color}
              name={bar.name}
              radius={[4, 4, 0, 0]}
            />
          ))
        )}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
