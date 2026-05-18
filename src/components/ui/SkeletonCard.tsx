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

interface PageLoaderProps {
  isFadingOut?: boolean;
}

/**
 * Full-page cinematic loading screen featuring a glowing blue ECG heartbeat
 * that draws itself like a marker on a pristine white clinical canvas.
 * Fades out smoothly when the page is ready to be revealed.
 */
export function PageLoader({ isFadingOut = false }: PageLoaderProps) {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
        isFadingOut
          ? 'opacity-0 scale-[1.02] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      aria-busy="true"
      aria-label="Cargando ClinSync..."
    >
      <style>{`
        @keyframes clinsync-draw {
          0% {
            stroke-dashoffset: 240;
          }
          50% {
            stroke-dashoffset: 0;
          }
          75% {
            stroke-dashoffset: 0;
            filter: drop-shadow(0 0 10px rgba(37, 99, 235, 0.5)) drop-shadow(0 0 2px rgba(37, 99, 235, 0.2));
            opacity: 1;
          }
          95%, 100% {
            stroke-dashoffset: 0;
            opacity: 0.1;
          }
        }
        .animate-clinsync-draw-line {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: clinsync-draw 2.5s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
      `}</style>

      {/* Subtle soft blue ambient radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.02)_0%,_transparent_75%)] pointer-events-none" />

      <div className="relative w-80 h-32 flex items-center justify-center">
        <svg
          className="w-full h-full text-[#2563EB]"
          viewBox="0 0 100 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Faint baseline guide */}
          <path
            d="M 10 20 L 35 20 L 42 5 L 53 35 L 60 20 L 90 20"
            className="opacity-5"
            strokeWidth="1.5"
          />

          {/* Glowing ECG heartbeat line that draws itself */}
          <path
            d="M 10 20 L 35 20 L 42 5 L 53 35 L 60 20 L 90 20"
            className="animate-clinsync-draw-line"
          />
        </svg>
      </div>
    </div>
  );
}



