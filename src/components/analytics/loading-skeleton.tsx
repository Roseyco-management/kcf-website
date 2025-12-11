/**
 * Loading Skeleton Components
 * Provides loading states for dashboard components
 */

export function StatCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 p-6 h-[200px] animate-pulse">
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="h-12 w-12 rounded-xl bg-white/20" />
          <div className="h-6 w-16 rounded-full bg-white/20" />
        </div>
        <div className="h-4 w-32 bg-white/20 rounded mb-2" />
        <div className="h-8 w-24 bg-white/20 rounded" />
      </div>
    </div>
  );
}

export function PlatformCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8] animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-12 w-12 rounded-xl bg-gray-200" />
        <div className="flex-1">
          <div className="h-4 w-32 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 bg-gray-200 rounded" />
              <div className="flex items-center gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded" />
                <div className="h-5 w-12 bg-gray-200 rounded" />
              </div>
            </div>
            {i < 3 && <div className="h-px bg-[#E5E0D8] mt-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetricBoxSkeleton() {
  return (
    <div className="text-center p-6 rounded-xl bg-gray-200 animate-pulse">
      <div className="flex items-center justify-center mb-3">
        <div className="h-6 w-6 rounded bg-gray-300" />
      </div>
      <div className="h-3 w-24 bg-gray-300 rounded mb-3 mx-auto" />
      <div className="h-8 w-16 bg-gray-300 rounded mx-auto" />
      <div className="h-4 w-12 bg-gray-300 rounded mt-2 mx-auto" />
    </div>
  );
}

export function TopPagesListSkeleton() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8] animate-pulse">
      <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 p-3">
            <div className="h-10 w-10 rounded-xl bg-gray-200" />
            <div className="flex-1">
              <div className="h-4 w-48 bg-gray-200 rounded mb-2" />
              <div className="h-3 w-32 bg-gray-200 rounded" />
            </div>
            <div className="text-right">
              <div className="h-5 w-16 bg-gray-200 rounded mb-1" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div
      className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8] animate-pulse"
      style={{ height }}
    >
      <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
      <div className="h-full w-full bg-gray-100 rounded" />
    </div>
  );
}

export function DashboardLoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Hero KPI Skeleton */}
      <section>
        <div className="mb-6">
          <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-48 bg-gray-200 rounded mt-2 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </section>

      {/* Traffic Sources Skeleton */}
      <ChartSkeleton height={300} />

      {/* Platform Cards Skeleton */}
      <section>
        <div className="mb-6">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 rounded mt-2 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PlatformCardSkeleton />
          <PlatformCardSkeleton />
          <PlatformCardSkeleton />
        </div>
      </section>

      {/* Top Pages Skeleton */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPagesListSkeleton />
        <TopPagesListSkeleton />
      </section>

      {/* GSC Skeleton */}
      <section>
        <div className="mb-6">
          <div className="h-7 w-56 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-80 bg-gray-200 rounded mt-2 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricBoxSkeleton />
          <MetricBoxSkeleton />
          <MetricBoxSkeleton />
          <MetricBoxSkeleton />
        </div>
      </section>

      {/* Google Ads Skeleton */}
      <section>
        <div className="mb-6">
          <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-96 bg-gray-200 rounded mt-2 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricBoxSkeleton />
          <MetricBoxSkeleton />
          <MetricBoxSkeleton />
          <MetricBoxSkeleton />
        </div>
      </section>

      {/* Daily Trend Skeleton */}
      <ChartSkeleton height={400} />
    </div>
  );
}
