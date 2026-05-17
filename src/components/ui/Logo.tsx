import { cn } from '../../lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
}

export function Logo({ className, iconClassName, textClassName, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src="/favicon.svg" alt="ClinSync Logo" className={cn("w-8 h-8", iconClassName)} />
      {showText && <span className={cn("text-xl font-bold text-[#0F172A]", textClassName)}>ClinSync</span>}
    </div>
  );
}
