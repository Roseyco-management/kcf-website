"use client";

import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface ComparisonBadgeProps {
  value: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ComparisonBadge({ value, label, size = 'md' }: ComparisonBadgeProps) {
  const isPositive = value > 0;
  const isNeutral = value === 0 || Math.abs(value) < 0.1;

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  const colorClass = isNeutral
    ? 'text-gray-700 bg-gray-100'
    : isPositive
    ? 'text-green-700 bg-green-100'
    : 'text-red-700 bg-red-100';

  return (
    <div className={`inline-flex items-center gap-1 font-medium ${sizeClasses[size]} ${colorClass} px-2 py-0.5 rounded-full`}>
      {isNeutral ? (
        <Minus className={iconSize[size]} />
      ) : isPositive ? (
        <ArrowUp className={iconSize[size]} />
      ) : (
        <ArrowDown className={iconSize[size]} />
      )}
      <span>{Math.abs(value).toFixed(1)}%</span>
      {label && <span className="text-xs text-gray-500 ml-1">{label}</span>}
    </div>
  );
}
