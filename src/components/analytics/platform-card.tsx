"use client";

import * as Tooltip from '@radix-ui/react-tooltip';
import { ComparisonBadge } from './comparison-badge';

interface PlatformMetric {
  label: string;
  value: string | number;
  change?: number;
}

interface PlatformCardProps {
  name: string;
  icon: React.ReactNode;
  accentColor: 'navy' | 'gold' | 'purple' | 'blue' | 'green';
  id: string;
  metrics: PlatformMetric[];
  tooltip: string;
  configured: boolean;
}

const accentColors = {
  navy: {
    icon: 'bg-[#151A4A]/10 text-[#151A4A]',
    border: 'border-[#151A4A]/20',
  },
  gold: {
    icon: 'bg-[#C9A961]/10 text-[#C9A961]',
    border: 'border-[#C9A961]/20',
  },
  purple: {
    icon: 'bg-purple-100 text-purple-600',
    border: 'border-purple-200',
  },
  blue: {
    icon: 'bg-blue-100 text-blue-600',
    border: 'border-blue-200',
  },
  green: {
    icon: 'bg-green-100 text-green-600',
    border: 'border-green-200',
  },
};

export function PlatformCard({
  name,
  icon,
  accentColor,
  id,
  metrics,
  tooltip,
  configured,
}: PlatformCardProps) {
  const colors = accentColors[accentColor];

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className={`rounded-2xl bg-white p-4 sm:p-6 shadow-sm border ${colors.border} hover:shadow-md transition-all duration-300 cursor-pointer group`}>
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className={`rounded-xl ${colors.icon} p-2 sm:p-3 flex-shrink-0`}>
                <div className="h-5 w-5 sm:h-6 sm:w-6">{icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base text-[#151A4A] truncate">{name}</h3>
                <p className="text-[10px] sm:text-xs text-[#4A4A4A] truncate">{id}</p>
              </div>
            </div>

            {configured ? (
              <div className="space-y-3 sm:space-y-4">
                {metrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs sm:text-sm text-[#4A4A4A] truncate flex-shrink">{metric.label}</span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-base sm:text-lg font-bold text-[#151A4A]">
                          {typeof metric.value === 'number'
                            ? metric.value.toLocaleString()
                            : metric.value}
                        </span>
                        {metric.change !== undefined && (
                          <ComparisonBadge value={metric.change} size="sm" />
                        )}
                      </div>
                    </div>
                    {index < metrics.length - 1 && (
                      <div className="h-px bg-[#E5E0D8] mt-3 sm:mt-4" />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-[#4A4A4A]">Platform not configured</p>
            )}
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
  );
}
