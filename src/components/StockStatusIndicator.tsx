import { StockStatus } from '../data/simplygoData';

interface StockStatusIndicatorProps {
  status: StockStatus;
  detail?: string;
  compact?: boolean;
}

const STATUS_STYLES: Record<
  StockStatus,
  {
    label: string;
    dotClass: string;
    boxClass: string;
    textClass: string;
  }
> = {
  available: {
    label: 'Available',
    dotClass: 'bg-emerald-600',
    boxClass: 'bg-emerald-50 border-emerald-200',
    textClass: 'text-emerald-800',
  },
  low: {
    label: 'Running Low',
    dotClass: 'bg-amber-500',
    boxClass: 'bg-amber-50 border-amber-200',
    textClass: 'text-amber-900',
  },
  'sold-out': {
    label: 'Sold Out',
    dotClass: 'bg-slate-400',
    boxClass: 'bg-slate-100 border-slate-200',
    textClass: 'text-slate-600',
  },
};

export function StockStatusIndicator({
  status,
  detail,
  compact = false,
}: StockStatusIndicatorProps) {
  const style = STATUS_STYLES[status];

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-lg border ${style.boxClass} ${
        compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'
      }`}
    >
      <span
        className={`w-2.5 h-2.5 rounded-full shrink-0 ${style.dotClass}`}
        aria-hidden="true"
      />
      <span className={`font-semibold whitespace-nowrap ${style.textClass}`}>
        {style.label}
      </span>
      {detail && (
        <span className={`truncate ${style.textClass} opacity-85`}>
          · {detail}
        </span>
      )}
    </div>
  );
}

export function StockStatusLegend() {
  return (
    <div
      className="flex flex-wrap items-center gap-3 text-xs text-slate-600"
      aria-label="Ticket Office Stock Status Legend"
    >
      <span className="font-semibold text-[#142333]">
        Ticket Office Stock:
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="w-2.5 h-2.5 rounded-full bg-emerald-600"
          aria-hidden="true"
        />
        <span className="font-medium text-emerald-800">Available</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="w-2.5 h-2.5 rounded-full bg-amber-500"
          aria-hidden="true"
        />
        <span className="font-medium text-amber-900">Running Low</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="w-2.5 h-2.5 rounded-full bg-slate-400"
          aria-hidden="true"
        />
        <span className="font-medium text-slate-600">Sold Out</span>
      </span>
    </div>
  );
}
