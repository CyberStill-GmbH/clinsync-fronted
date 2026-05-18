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
 * Full-page centered loading screen featuring a minimalist animated ECG heartbeat
 * based on the ClinSync logo and brand identity.
 */
export function PageLoader() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Self-contained CSS for high-fidelity interactive animations */}
      <style>{`
        @keyframes clinsync-heartbeat {
          0% {
            stroke-dashoffset: 120;
            opacity: 0.3;
          }
          40% {
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(37, 99, 235, 0.6));
          }
          80%, 100% {
            stroke-dashoffset: 0;
            opacity: 0.3;
          }
        }
        @keyframes clinsync-pulse-glow {
          0%, 100% {
            transform: scale(0.96);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.04);
            opacity: 1;
            filter: drop-shadow(0 0 12px rgba(37, 99, 235, 0.2));
          }
        }
        @keyframes clinsync-wave {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        .animate-clinsync-line {
          stroke-dasharray: 60;
          stroke-dashoffset: 120;
          animation: clinsync-heartbeat 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-clinsync-logo {
          animation: clinsync-pulse-glow 2s ease-in-out infinite;
        }
        .animate-clinsync-wave-1 {
          animation: clinsync-wave 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .animate-clinsync-wave-2 {
          animation: clinsync-wave 3s cubic-bezier(0.1, 0.8, 0.3, 1) infinite 1.5s;
        }
      `}</style>

      {/* Radial soft ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.04)_0%,_transparent_65%)] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Glowing concentric rings */}
        <div className="absolute w-36 h-36 rounded-full border border-blue-200/40 animate-clinsync-wave-1 pointer-events-none" />
        <div className="absolute w-36 h-36 rounded-full border border-blue-100/30 animate-clinsync-wave-2 pointer-events-none" />

        {/* Center Animated Logo Icon container */}
        <div className="relative w-28 h-28 bg-white rounded-3xl border border-[#E2E8F0] shadow-xl flex items-center justify-center animate-clinsync-logo p-4 z-10">
          <svg
            className="w-20 h-20 text-[#2563EB]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background static shadow wave */}
            <path
              d="M2 12h4l3-9l6 18l3-9h4"
              className="opacity-10"
              strokeWidth="2"
            />
            {/* Foreground animated heartbeat line */}
            <path
              d="M2 12h4l3-9l6 18l3-9h4"
              className="animate-clinsync-line"
            />
          </svg>
        </div>

        {/* Logo Text & Tagline */}
        <div className="mt-8 text-center z-10">
          <h1 className="text-2xl font-bold tracking-tight text-[#0F172A]">
            Clin<span className="text-[#2563EB]">Sync</span>
          </h1>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#94A3B8] max-w-[200px] leading-relaxed">
            Sincronizando tu Salud
          </p>
        </div>
      </div>
    </div>
  );
}

