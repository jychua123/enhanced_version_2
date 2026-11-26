import { ScreenId, SIMPLYGO_ASSETS } from '../data/simplygoData';
import { ResilientImage } from './ResilientImage';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0c1a27] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="inline-block bg-white rounded-lg px-2.5 py-1">
              <ResilientImage
                src={SIMPLYGO_ASSETS.logo}
                alt="SimplyGo"
                fallbackLabel="SimplyGo"
                className="h-6 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-400">
              Singapore Public Transport Ticketing & Motoring · Hotline:{' '}
              <span className="text-slate-200 font-semibold tabular-nums">
                1800-2255-663
              </span>
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-300">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('cards')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cards & Charms
            </button>
            <button
              type="button"
              onClick={() => onNavigate('app')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              SimplyGo App
            </button>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Fare Calculator
            </button>
            <button
              type="button"
              onClick={() => onNavigate('locations')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Locations
            </button>
          </nav>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2026 SimplyGo Pte. Ltd.</p>
          <div className="flex items-center gap-3">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
