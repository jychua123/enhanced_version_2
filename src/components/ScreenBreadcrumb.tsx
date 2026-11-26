import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ScreenId } from '../data/simplygoData';

interface ScreenBreadcrumbProps {
  currentLabel: string;
  subLabel?: string;
  onBackHome: () => void;
  onNavigate?: (screen: ScreenId) => void;
}

export function ScreenBreadcrumb({
  currentLabel,
  subLabel,
  onBackHome,
}: ScreenBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200/80">
      <nav
        className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500"
        aria-label="Breadcrumb"
      >
        <button
          type="button"
          onClick={onBackHome}
          className="font-medium text-slate-600 hover:text-[#316aa1] transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span
          className={
            subLabel ? 'font-medium text-slate-600' : 'font-semibold text-[#316aa1]'
          }
        >
          {currentLabel}
        </span>
        {subLabel && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-semibold text-[#316aa1]">{subLabel}</span>
          </>
        )}
      </nav>

      <button
        type="button"
        onClick={onBackHome}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#316aa1] text-xs font-semibold text-[#142333] hover:text-[#316aa1] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>
    </div>
  );
}
