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
 * Full-page cinematic loading screen featuring a glowing neon ECG heartbeat
 * that draws itself like a digital marker on an obsidian clinical canvas.
 */
export function PageLoader() {
  return (
    <div className="min-h-screen bg-[#070A13] flex items-center justify-center relative overflow-hidden">
      <style>{`
        @keyframes clinsync-draw {
          0% {
            stroke-dashoffset: 240;
          }
          45% {
            stroke-dashoffset: 0;
          }
          70% {
            stroke-dashoffset: 0;
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(37, 99, 235, 0.9)) drop-shadow(0 0 5px rgba(37, 99, 235, 0.4));
          }
          90%, 100% {
            stroke-dashoffset: 0;
            opacity: 0;
            filter: drop-shadow(0 0 0px transparent);
          }
        }
        .animate-clinsync-draw-line {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: clinsync-draw 3s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
      `}</style>

      {/* Deep medical ambient background grid & radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.08)_0%,_transparent_70%)] pointer-events-none" />
      
      {/* Dynamic scan line effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0)_50%,_rgba(37,99,235,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

      <div className="relative w-80 h-32 flex items-center justify-center">
        <svg
          className="w-full h-full text-[#3B82F6]"
          viewBox="0 0 100 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Faint indicator baseline guideline */}
          <path
            d="M 10 20 L 35 20 L 42 5 L 53 35 L 60 20 L 90 20"
            className="opacity-5"
            strokeWidth="1.5"
          />

          {/* Core neon heartbeat line that self-draws */}
          <path
            d="M 10 20 L 35 20 L 42 5 L 53 35 L 60 20 L 90 20"
            className="animate-clinsync-draw-line"
          />
        </svg>
      </div>
    </div>
  );
}


