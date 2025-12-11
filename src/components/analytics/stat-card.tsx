"use client";

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Sparkline } from '@/components/charts/sparkline';
import { LineChart } from '@/components/charts/line-chart';
import { ComparisonBadge } from './comparison-badge';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ChartDataPoint } from '@/types/analytics';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  sparklineData?: number[];
  detailedData?: ChartDataPoint[];
  icon: React.ReactNode;
  tooltip: string;
  color?: 'navy' | 'gold' | 'green' | 'orange' | 'purple';
}

const colorGradients = {
  navy: 'from-[#151A4A] to-[#0F1238]',
  gold: 'from-[#C9A961] to-[#B89A52]',
  green: 'from-green-500 to-green-600',
  orange: 'from-orange-500 to-orange-600',
  purple: 'from-purple-500 to-purple-600',
};

export function StatCard({
  title,
  value,
  change,
  changeLabel,
  sparklineData,
  detailedData,
  icon,
  tooltip,
  color = 'navy',
}: StatCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const isPositive = change !== undefined && change > 0;

  return (
    <>
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <div
              onClick={() => detailedData && setModalOpen(true)}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${colorGradients[color]} p-6 shadow-lg hover:shadow-2xl hover:border-2 hover:border-[#C9A961] transition-all duration-300 ${detailedData ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors" />

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                    <div className="text-white h-6 w-6">{icon}</div>
                  </div>
                  {change !== undefined && <ComparisonBadge value={change} />}
                </div>
                <p className="text-white/90 text-sm font-medium mb-1">{title}</p>
                <p className="text-4xl font-bold text-white">{value}</p>
                <p className="text-white/70 text-xs mt-2">{changeLabel || 'Last 30 days'}</p>

                {sparklineData && sparklineData.length > 0 && (
                  <div className="mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Sparkline data={sparklineData} color="#FFFFFF" height={40} />
                  </div>
                )}
              </div>
            </div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="max-w-xs rounded-lg bg-[#151A4A] px-4 py-3 text-sm text-white shadow-lg z-50"
              sideOffset={5}
            >
              {tooltip}
              <Tooltip.Arrow className="fill-[#151A4A]" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>

      {/* Detailed Modal */}
      {detailedData && (
        <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-w-4xl w-[90vw] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl">
              <Dialog.Title className="flex items-center gap-3 text-2xl font-bold text-[#151A4A]">
                <div className="rounded-xl bg-[#151A4A]/10 p-2">
                  {icon}
                </div>
                {title}
              </Dialog.Title>

              <div className="space-y-6 mt-4">
                {change !== undefined ? (
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 rounded-lg bg-[#F8F6F2]">
                      <p className="text-sm text-[#4A4A4A] mb-1">Current</p>
                      <p className="text-2xl font-bold text-[#151A4A]">{value}</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-[#F8F6F2]">
                      <p className="text-sm text-[#4A4A4A] mb-1">Change</p>
                      <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{change?.toFixed(1)}%
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-[#F8F6F2]">
                      <p className="text-sm text-[#4A4A4A] mb-1">Trend</p>
                      <div className="flex items-center justify-center gap-2">
                        <TrendingUp className={`h-6 w-6 ${isPositive ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4 rounded-lg bg-[#F8F6F2]">
                    <p className="text-sm text-[#4A4A4A] mb-1">Current Value</p>
                    <p className="text-3xl font-bold text-[#151A4A]">{value}</p>
                  </div>
                )}

                <LineChart
                  data={detailedData}
                  lines={[{ key: 'value', color: '#151A4A', name: title }]}
                  height={300}
                />
              </div>

              <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#C9A961] focus:ring-offset-2 disabled:pointer-events-none">
                <span className="h-6 w-6 text-[#151A4A] font-bold text-xl">×</span>
                <span className="sr-only">Close</span>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </>
  );
}
