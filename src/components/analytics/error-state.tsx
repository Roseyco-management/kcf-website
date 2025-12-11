'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ErrorStateProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
}

export function ErrorState({
  title = 'Unable to Load Analytics',
  message = 'There was an error loading your analytics data. Please try again later.',
  showRetry = true,
}: ErrorStateProps) {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>

        <h2 className="text-2xl font-bold text-[#151A4A] mb-2">{title}</h2>
        <p className="text-[#4A4A4A] mb-6">{message}</p>

        {showRetry && (
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#151A4A] text-white rounded-lg hover:bg-[#0F1238] transition-colors font-medium"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

export function SectionErrorState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl bg-red-50 border border-red-200 p-6 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-3">
        <AlertTriangle className="h-6 w-6 text-red-600" />
      </div>
      <p className="text-sm text-red-800 font-medium">{message}</p>
    </div>
  );
}
