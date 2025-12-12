// Analytics Data Formatters

import { format, parseISO } from 'date-fns';

/**
 * Format number with commas
 * @param num - Number to format
 * @returns Formatted string (e.g., "1,234")
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Format currency
 * @param num - Number to format
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format percentage
 * @param num - Number to format (0-100 scale)
 * @param decimals - Number of decimal places
 * @returns Formatted percentage string (e.g., "12.3%")
 */
export function formatPercentage(num: number, decimals: number = 1): string {
  return `${num.toFixed(decimals)}%`;
}

/**
 * Format duration in seconds to readable format
 * @param seconds - Duration in seconds
 * @returns Formatted string (e.g., "4m 23s")
 */
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes}m ${secs}s`;
}

/**
 * Format date to short format
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "Dec 11")
 */
export function formatDateShort(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMM d');
  } catch {
    return dateString;
  }
}

/**
 * Format date to long format
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "December 11, 2024")
 */
export function formatDateLong(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMMM d, yyyy');
  } catch {
    return dateString;
  }
}

/**
 * Format compact numbers (e.g., 1.2K, 3.4M)
 * @param num - Number to format
 * @returns Compact formatted string
 */
export function formatCompact(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

/**
 * Safe number conversion
 * @param value - Value to convert
 * @param defaultValue - Default if conversion fails
 * @returns Valid number
 */
export function safeNumber(value: unknown, defaultValue: number = 0): number {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) ? num : defaultValue;
}
