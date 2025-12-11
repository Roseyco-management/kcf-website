"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartLine, ChartDataPoint } from '@/types/analytics';

interface BarChartProps {
  data: ChartDataPoint[];
  bars: ChartLine[];
  height?: number;
  layout?: 'vertical' | 'horizontal';
  showGrid?: boolean;
  showLegend?: boolean;
}

export function BarChart({
  data,
  bars,
  height = 300,
  layout = 'horizontal',
  showGrid = true,
  showLegend = true,
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

  const margin =
    layout === 'vertical'
      ? { top: 5, right: 30, left: 60, bottom: 5 }
      : { top: 5, right: 30, left: 20, bottom: 5 };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={data}
        layout={layout === 'vertical' ? 'vertical' : 'horizontal'}
        margin={margin}
      >
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" />}
        {layout === 'horizontal' ? (
          <>
            <XAxis
              dataKey="date"
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
              dataKey="date"
              type="category"
              stroke="#4A4A4A"
              tick={{ fill: '#4A4A4A', fontSize: 12 }}
              tickLine={{ stroke: '#E5E0D8' }}
              width={100}
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
        {bars.map((bar) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            fill={bar.color}
            name={bar.name}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
