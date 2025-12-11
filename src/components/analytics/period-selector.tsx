'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function PeriodSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPeriod = searchParams.get('period') || '30d';

  const periods = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
  ];

  const handlePeriodChange = (period: string) => {
    router.push(`/admin?period=${period}`);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <span className="text-sm text-[#4A4A4A] font-medium hidden sm:inline">Time Period:</span>
      <div className="flex gap-1 bg-white rounded-lg p-1 border border-[#E5E0D8] shadow-sm">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => handlePeriodChange(period.value)}
            className={`px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              currentPeriod === period.value
                ? 'bg-[#151A4A] text-white'
                : 'text-[#4A4A4A] hover:bg-[#F8F6F2]'
            }`}
          >
            <span className="hidden sm:inline">{period.label}</span>
            <span className="sm:hidden">{period.value.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
