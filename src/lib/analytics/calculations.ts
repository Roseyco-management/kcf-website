// Analytics Calculation Utilities

import { Metric } from '@/types/analytics';

/**
 * Calculate percentage change between two numbers
 * @param current - Current period value
 * @param previous - Previous period value
 * @returns Percentage change (can be negative)
 */
export function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Create a Metric object with change calculation
 * @param current - Current period value
 * @param previous - Previous period value
 * @returns Metric object
 */
export function createMetric(current: number, previous: number): Metric {
  return {
    current,
    previous,
    change: calculateChange(current, previous),
  };
}

/**
 * Calculate conversion rate
 * @param conversions - Number of conversions
 * @param total - Total number of sessions/visits
 * @returns Conversion rate percentage
 */
export function calculateConversionRate(conversions: number, total: number): number {
  if (total === 0) return 0;
  return (conversions / total) * 100;
}

/**
 * Calculate Click-Through Rate
 * @param clicks - Number of clicks
 * @param impressions - Number of impressions
 * @returns CTR percentage
 */
export function calculateCTR(clicks: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (clicks / impressions) * 100;
}

/**
 * Calculate Return on Ad Spend
 * @param conversionValue - Total conversion value
 * @param adSpend - Total ad spend
 * @returns ROAS multiplier
 */
export function calculateROAS(conversionValue: number, adSpend: number): number {
  if (adSpend === 0) return 0;
  return conversionValue / adSpend;
}

/**
 * Calculate Cost per Click
 * @param cost - Total ad cost
 * @param clicks - Number of clicks
 * @returns CPC in dollars
 */
export function calculateCPC(cost: number, clicks: number): number {
  if (clicks === 0) return 0;
  return cost / clicks;
}

/**
 * Sum array of numbers
 * @param values - Array of numbers
 * @returns Sum
 */
export function sum(values: number[]): number {
  return values.reduce((acc, val) => acc + val, 0);
}

/**
 * Calculate average
 * @param values - Array of numbers
 * @returns Average value
 */
export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

/**
 * Get trend direction
 * @param change - Percentage change
 * @returns 'up', 'down', or 'neutral'
 */
export function getTrend(change: number): 'up' | 'down' | 'neutral' {
  if (Math.abs(change) < 0.1) return 'neutral';
  return change > 0 ? 'up' : 'down';
}
