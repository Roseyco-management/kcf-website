"use client";

import * as Tooltip from '@radix-ui/react-tooltip';
import { ComparisonBadge } from './comparison-badge';

interface MetricBoxProps {
  title: string;
  value: string | number;
  change?: number;
  color: 'navy' | 'gold' | 'green' | 'orange' | 'purple' | 'blue';
  icon: React.ReactNode;
  tooltip: string;
}

const colorClasses = {
  navy: 'from-[#151A4A] to-[#0F1238] border-[#151A4A]',
  gold: 'from-[#C9A961] to-[#B89A52] border-[#C9A961]',
  green: 'from-green-50 to-green-100 border-green-200',
  orange: 'from-orange-50 to-orange-100 border-orange-200',
  purple: 'from-purple-50 to-purple-100 border-purple-200',
  blue: 'from-blue-50 to-blue-100 border-blue-200',
};

const textColors = {
  navy: 'text-white',
  gold: 'text-white',
  green: 'text-green-900',
  orange: 'text-orange-900',
  purple: 'text-purple-900',
  blue: 'text-blue-900',
};

const labelColors = {
  navy: 'text-white/80',
  gold: 'text-white/80',
  green: 'text-green-700',
  orange: 'text-orange-700',
  purple: 'text-purple-700',
  blue: 'text-blue-700',
};

const iconColors = {
  navy: 'text-white',
  gold: 'text-white',
  green: 'text-green-700',
  orange: 'text-orange-700',
  purple: 'text-purple-700',
  blue: 'text-blue-700',
};

export function MetricBox({ title, value, change, color, icon, tooltip }: MetricBoxProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className={`text-center p-4 sm:p-6 rounded-xl bg-gradient-to-br ${colorClasses[color]} border hover:shadow-md transition-all duration-300 cursor-pointer group`}>
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <div className={`${iconColors[color]} h-5 w-5 sm:h-6 sm:w-6`}>{icon}</div>
            </div>
            <p className={`text-xs sm:text-sm ${labelColors[color]} font-medium mb-2`}>{title}</p>
            <p className={`text-2xl sm:text-3xl font-bold ${textColors[color]} break-all`}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {change !== undefined && (
              <div className="mt-2 flex items-center justify-center">
                <ComparisonBadge value={change} size="sm" />
              </div>
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
