interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

/**
 * Animated skeleton placeholder for loading states.
 * Drop-in replacement for any content area while data is fetching.
 */
export function SkeletonCard({ lines = 3, className = '' }: SkeletonCardProps) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#E2E8F0] p-5 animate-pulse ${className}`}
      aria-busy="true"
      aria-label="Cargando..."
    >
      {/* Header bar */}
      <div className="h-4 bg-[#E2E8F0] rounded-full w-1/3 mb-4" />
      {/* Content lines */}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 bg-[#E2E8F0] rounded-full mb-3"
          style={{ width: `${85 - i * 15}%` }}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton stat card for dashboard summary cards.
 */
export function SkeletonStatCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-white rounded-xl border border-[#E2E8F0] p-5 animate-pulse ${className}`}
      aria-busy="true"
      aria-label="Cargando estadística..."
    >
      <div className="flex items-center justify-between mb-4">
        <div className="h-3 bg-[#E2E8F0] rounded-full w-1/2" />
        <div className="w-10 h-10 bg-[#E2E8F0] rounded-lg" />
      </div>
      <div className="h-8 bg-[#E2E8F0] rounded-full w-1/3 mb-2" />
      <div className="h-3 bg-[#E2E8F0] rounded-full w-2/3" />
    </div>
  );
}

/**
 * Full-page centered loading spinner for route guards.
 */
export function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#E2E8F0]" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2563EB] animate-spin" />
        </div>
        <p className="text-sm text-[#64748B] font-medium">Cargando ClinSync...</p>
      </div>
    </div>
  );
}
