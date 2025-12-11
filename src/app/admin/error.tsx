'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/components/analytics/error-state';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error('Analytics dashboard error:', error);
  }, [error]);

  return (
    <ErrorState
      title="Something went wrong"
      message="There was an error loading your analytics dashboard. This could be due to a network issue or a problem with the analytics service."
      showRetry={true}
    />
  );
}
