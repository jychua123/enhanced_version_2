import { useEffect, useRef, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  Play,
  X,
} from 'lucide-react';
import {
  APP_FEATURES,
  ASSISTANCE_TILES,
  AppFeatureId,
  AssistanceCategory,
  CARD_CHARM_DESIGNS,
  CardCharmDesign,
  HERO_SLIDES,
  QUICK_SEARCH_ITEMS,
  SIMPLYGO_ASSETS,
  ScreenId,
  TICKET_OFFICES,
  TICKET_OFFICE_STOCK,
} from '../data/simplygoData';
import { ResilientImage } from './ResilientImage';
import {
  StockStatusIndicator,
  StockStatusLegend,
} from './StockStatusIndicator';

interface HomeScreenProps {
  onNavigate: (
    screen: ScreenId,
    options?: {
      appFeature?: AppFeatureId;
      cardTab?: 'ezlink' | 'charms' | 'concession' | 'motoring';
      assistanceCategory?: AssistanceCategory;
    }
  ) => void;
}

const POPULAR_SEARCHES = [
  { label: 'Latest Charms', query: 'charm' },
  { label: 'Fare Calculator', query: 'fare' },
  { label: 'Auto Top-Up', query: 'top up' },
  { label: 'Concession Status', query: 'status' },
];

const CATEGORY_META: Record<
  'ezlink' | 'charm' | 'concession',
  { label: string; summary: string; ctaLabel: string; cardTab: 'ezlink' | 'charms' | 'concession' }
> = {
  ezlink: {
    label: 'EZ-Link Cards',
    summary: 'Everyday stored-value cards for everyone · Standard Adult fares · Buy off the shelf',
    ctaLabel: 'All EZ-Link Cards',
    cardTab: 'ezlink',
  },
  charm: {
    label: 'EZ-Link Charms',
    summary: 'Wearable tap-and-go accessories · Sold without stored value · Top up before riding',
    ctaLabel: 'All Charms & Stockists',
    cardTab: 'charms',
  },
  concession: {
    label: 'Concession Cards',
    summary: 'Subsidised travel & monthly passes · Personalised for eligible commuters via Singpass',
    ctaLabel: 'Concession & Pass Estimator',
    cardTab: 'concession',
  },
};

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [activeFeatureId, setActiveFeatureId] =
    useState<AppFeatureId>('transactions');
  const [advisoryVisible, setAdvisoryVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCardCategory, setActiveCardCategory] = useState<
    'charm' | 'ezlink' | 'concession'
  >('charm');
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>(
    TICKET_OFFICES[0].id
  );
  const [selectedDesign, setSelectedDesign] =
    useState<CardCharmDesign | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselPaused) return;
    const timer = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [carouselPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.tagName === 'SELECT';

      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setSelectedDesign(null);
        setSearchFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSlide = HERO_SLIDES[slideIndex];
  const activeFeature =
    APP_FEATURES.find((f) => f.id === activeFeatureId) ?? APP_FEATURES[0];

  const selectedOffice =
    TICKET_OFFICES.find((o) => o.id === selectedOfficeId) ?? TICKET_OFFICES[0];
  const officeStockMap = TICKET_OFFICE_STOCK[selectedOffice.id] ?? {};

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const searchResults = normalizedQuery
    ? QUICK_SEARCH_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(normalizedQuery) ||
          item.keywords.toLowerCase().includes(normalizedQuery) ||
          item.category.toLowerCase().includes(normalizedQuery)
      ).slice(0, 6)
    : [];

  const visibleDesigns = CARD_CHARM_DESIGNS.filter(
    (d) => d.category === activeCardCategory
  );
  const categoryMeta = CATEGORY_META[activeCardCategory];

  return (
    <div>
      {/* Slim Dismissible Service Notice */}
      {advisoryVisible && (
        <div className="bg-[#316aa1] text-white text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-4">
            <p className="truncate">
              <span className="font-semibold">Notice:</span> Scheduled maintenance 27 Nov, 12 AM – 6 AM.
            </p>
            <button
              type="button"
              onClick={() => setAdvisoryVisible(false)}
              className="p-0.5 rounded hover:bg-white/15 transition-colors shrink-0 cursor-pointer"
              aria-label="Dismiss service notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 1. Minimalist Split Hero */}
      <section className="bg-gradient-to-b from-[#ebf2f9]/85 to-white py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142333] leading-tight">
                Simplifying journeys across Singapore
              </h1>

              {/* Instant Search Input */}
              <div className="relative" ref={searchContainerRef}>
                <div className="relative flex items-center">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onFocus={() => setSearchFocused(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSearchFocused(true);
                    }}
                    placeholder="Search charms, cards, fares, or MRT stations..."
                    className="w-full pl-10 pr-9 py-3 bg-white border border-slate-200 focus:border-[#316aa1] rounded-xl text-sm text-[#142333] shadow-xs focus:outline-none"
                    aria-label="Search SimplyGo functions and cards"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      }}
                      className="absolute right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                      aria-label="Clear search query"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {searchFocused && (
                  <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 overflow-hidden">
                    {!normalizedQuery ? (
                      <div className="p-3.5 space-y-2">
                        <p className="text-xs font-medium text-slate-500">
                          Quick lookups
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {POPULAR_SEARCHES.map((item) => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => setSearchQuery(item.query)}
                              className="px-2.5 py-1 rounded-lg bg-[#ebf2f9] hover:bg-[#dce8f5] text-xs font-semibold text-[#316aa1] transition-colors cursor-pointer"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="p-4 text-xs text-slate-600 space-y-2">
                        <p className="font-semibold text-[#142333]">
                          No match for "{searchQuery}".
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {POPULAR_SEARCHES.map((item) => (
                            <button
                              key={item.label}
                              type="button"
                              onClick={() => setSearchQuery(item.query)}
                              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-[#ebf2f9] text-xs font-semibold text-[#316aa1] cursor-pointer"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <ul className="divide-y divide-slate-100">
                        {searchResults.map((item) => (
                          <li key={item.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery('');
                                setSearchFocused(false);
                                onNavigate(item.screen, {
                                  appFeature: item.appFeature,
                                  cardTab: item.cardTab,
                                  assistanceCategory: item.assistanceCategory,
                                });
                              }}
                              className="w-full text-left px-4 py-2.5 hover:bg-[#ebf2f9]/65 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                            >
                              <div>
                                <span className="text-[11px] font-medium text-[#3f84c5] block">
                                  {item.category}
                                </span>
                                <span className="text-sm font-semibold text-[#142333]">
                                  {item.label}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-[#316aa1] shrink-0" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Clean Minimal Links */}
              <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-[#316aa1]">
                <a href="#cards-charms-hub" className="hover:underline">
                  Cards & Charms Stock →
                </a>
                <a href="#simplygo-app-hub" className="hover:underline">
                  SimplyGo App →
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:underline cursor-pointer"
                >
                  Fare Calculator →
                </button>
              </div>
            </div>

            {/* Right: Clean Compact Highlight */}
            <div
              className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200/80 bg-[#0c1a27] shadow-sm"
              onMouseEnter={() => setCarouselPaused(true)}
              onMouseLeave={() => setCarouselPaused(false)}
              aria-label="Featured SimplyGo Highlights"
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                <ResilientImage
                  src={currentSlide.desktopImage}
                  alt={currentSlide.title}
                  fallbackLabel={currentSlide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c1a27]/90 via-[#0c1a27]/45 to-transparent px-5 pt-10 pb-3.5 flex items-end justify-between gap-3">
                  <div className="text-white min-w-0">
                    <p className="text-[11px] font-medium text-[#9ec7f0]">
                      {currentSlide.accentNote} · {slideIndex + 1}/{HERO_SLIDES.length}
                    </p>
                    <h2 className="text-sm sm:text-base font-bold text-white truncate">
                      {currentSlide.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate(currentSlide.targetScreen)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#3f84c5] hover:bg-[#316aa1] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{currentSlide.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSlideIndex(
                      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
                    )
                  }
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#0c1a27] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous announcement"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length)
                  }
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-[#0c1a27] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next announcement"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-[#0c1a27] py-2 flex items-center justify-center gap-1.5">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setSlideIndex(idx)}
                    aria-label={`View slide ${idx + 1}: ${slide.title}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === slideIndex
                        ? 'w-6 bg-[#3f84c5]'
                        : 'w-1.5 bg-slate-500 hover:bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Clean Tabbed Cards, Charms & Concession Showcase + Live Ticket Office Stock */}
      <section id="cards-charms-hub" className="py-12 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Header Row + Clean Category Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142333]">
                Cards & Charms
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                {categoryMeta.summary}
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
              {(
                [
                  { id: 'charm', label: 'EZ-Link Charms' },
                  { id: 'ezlink', label: 'EZ-Link Cards' },
                  { id: 'concession', label: 'Concession Cards' },
                ] as const
              ).map((tab) => {
                const isActive = activeCardCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCardCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#316aa1] shadow-xs'
                        : 'text-slate-600 hover:text-[#142333]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Single-Line Ticket Office Stock Bar (only when viewing Cards or Charms) */}
          {activeCardCategory !== 'concession' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex flex-wrap items-center gap-2.5">
                <label
                  htmlFor="home-ticket-office-select"
                  className="text-xs font-semibold text-[#142333]"
                >
                  Stock at:
                </label>
                <select
                  id="home-ticket-office-select"
                  value={selectedOfficeId}
                  onChange={(e) => setSelectedOfficeId(e.target.value)}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#142333] focus:outline-none focus:border-[#316aa1] cursor-pointer"
                >
                  {TICKET_OFFICES.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.name}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-slate-400">
                  {selectedOffice.updatedAt}
                </span>
              </div>

              <StockStatusLegend />
            </div>
          )}

          {/* Airy Product Cards Grid (Title + Visual + Status + Price only) */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              visibleDesigns.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            } gap-5`}
          >
            {visibleDesigns.map((item) => {
              const stockInfo = officeStockMap[item.id];
              const isSoldOut = stockInfo?.status === 'sold-out';

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedDesign(item)}
                  className={`group text-left bg-white border rounded-2xl p-4 transition-all hover:shadow-md flex flex-col justify-between cursor-pointer ${
                    isSoldOut
                      ? 'border-slate-200 opacity-90'
                      : 'border-slate-200 hover:border-[#3f84c5]'
                  }`}
                >
                  <div>
                    <div className="relative h-36 rounded-xl bg-[#ebf2f9]/50 flex items-center justify-center p-3 overflow-hidden mb-3.5">
                      <ResilientImage
                        src={item.image}
                        alt={item.name}
                        fallbackLabel={item.name}
                        className={`max-h-28 w-auto object-contain transition-transform duration-200 group-hover:scale-105 ${
                          isSoldOut ? 'grayscale opacity-75' : ''
                        }`}
                      />
                      {item.videoUrl && (
                        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 bg-[#0c1a27]/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded-md">
                          <Play className="w-3 h-3" />
                          <span>Video</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-[#142333] group-hover:text-[#316aa1] transition-colors line-clamp-2">
                      {item.name}
                    </h3>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-slate-100 space-y-2.5">
                    {stockInfo ? (
                      <StockStatusIndicator
                        status={stockInfo.status}
                        detail={stockInfo.note}
                        compact
                      />
                    ) : (
                      <p className="text-xs font-medium text-emerald-800">
                        Apply via Singpass
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-600 tabular-nums truncate pr-2">
                        {item.priceOrFee}
                      </span>
                      <span className="font-semibold text-[#316aa1] shrink-0">
                        Details →
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() =>
                onNavigate('cards', { cardTab: categoryMeta.cardTab })
              }
              className="text-xs font-semibold text-[#316aa1] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{categoryMeta.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Ultra-Clean SimplyGo App Summary & Download */}
      <section
        id="simplygo-app-hub"
        className="py-10 lg:py-12 bg-[#ebf2f9]/75 border-y border-slate-200/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#142333]">
                  SimplyGo App
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Track trips, automate top-ups, pay ERP/EV, and renew monthly passes in one app.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {APP_FEATURES.map((feature) => {
                  const isSelected = feature.id === activeFeatureId;
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => setActiveFeatureId(feature.id)}
                      className={`text-left p-3 rounded-xl border transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#316aa1] shadow-xs'
                          : 'bg-white/75 border-slate-200/80 hover:bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#ebf2f9] flex items-center justify-center shrink-0 p-1.5">
                        <ResilientImage
                          src={feature.icon}
                          alt={feature.title}
                          fallbackLabel={feature.shortTitle}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span
                        className={`text-xs sm:text-sm font-bold leading-tight ${
                          isSelected ? 'text-[#316aa1]' : 'text-[#142333]'
                        }`}
                      >
                        {feature.shortTitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate('app', { appFeature: activeFeature.id })
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#316aa1] hover:bg-[#255582] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <span>Try {activeFeature.shortTitle}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://play.google.com/store/apps/details?id=sg.com.transitlink.tlapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <ResilientImage
                    src={SIMPLYGO_ASSETS.playStore}
                    alt="Download SimplyGo on Google Play"
                    className="h-10 w-auto object-contain"
                  />
                </a>
                <a
                  href="https://apps.apple.com/sg/app/simplygo/id1460864759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                >
                  <ResilientImage
                    src={SIMPLYGO_ASSETS.appStore}
                    alt="Download SimplyGo on the App Store"
                    className="h-10 w-auto object-contain"
                  />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-5">
              <div className="bg-[#f4f8fc] border border-slate-200/80 rounded-xl p-2 w-36 sm:w-40 shrink-0 flex items-center justify-center">
                <ResilientImage
                  src={activeFeature.screenImage}
                  alt={`${activeFeature.title} app screen`}
                  fallbackLabel={activeFeature.title}
                  className="w-full h-auto max-h-[220px] object-contain"
                />
              </div>
              <div className="min-w-0 space-y-1.5">
                <h3 className="text-base font-bold text-[#142333]">
                  {activeFeature.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeFeature.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Minimal Assistance Strip */}
      <section className="py-10 lg:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 mb-5">
            <h2 className="text-xl font-bold tracking-tight text-[#142333]">
              Locations & Support
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('locations')}
              className="text-xs font-semibold text-[#316aa1] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ASSISTANCE_TILES.map((tile) => (
              <button
                key={tile.id}
                type="button"
                onClick={() =>
                  onNavigate('locations', { assistanceCategory: tile.category })
                }
                className="group text-left bg-white border border-slate-200 hover:border-[#3f84c5] rounded-xl p-4 transition-all hover:shadow-sm flex items-center gap-3.5 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ebf2f9]/70 flex items-center justify-center p-2 shrink-0">
                  <ResilientImage
                    src={tile.image}
                    alt={tile.title}
                    fallbackLabel={tile.title}
                    className="max-h-9 w-auto object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#142333] group-hover:text-[#316aa1] transition-colors leading-snug">
                  {tile.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Card & Charm Detail Modal */}
      {selectedDesign && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c1a27]/55 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label={selectedDesign.name}
          onClick={() => setSelectedDesign(null)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#3f84c5]">
                  {selectedDesign.badge}
                </p>
                <h3 className="text-xl font-bold text-[#142333] mt-0.5">
                  {selectedDesign.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDesign(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                aria-label="Close card design preview (Escape)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#ebf2f9]/65 rounded-xl p-4 flex items-center justify-center">
              {selectedDesign.videoUrl ? (
                <video
                  src={selectedDesign.videoUrl}
                  poster={selectedDesign.image}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="max-h-60 rounded-lg w-auto object-contain"
                />
              ) : (
                <ResilientImage
                  src={selectedDesign.image}
                  alt={selectedDesign.name}
                  fallbackLabel={selectedDesign.name}
                  className="max-h-52 w-auto object-contain"
                />
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedDesign.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="font-semibold text-[#142333] block mb-0.5">
                  Price / Rate
                </span>
                <span className="text-[#316aa1] font-bold tabular-nums">
                  {selectedDesign.priceOrFee}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#142333] block mb-0.5">
                  Where to Buy / Apply
                </span>
                <span className="text-slate-600">{selectedDesign.whereToBuy}</span>
              </div>
            </div>

            {selectedDesign.category !== 'concession' && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#142333] block">
                  Ticket Office Availability
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TICKET_OFFICES.map((office) => {
                    const entry =
                      TICKET_OFFICE_STOCK[office.id]?.[selectedDesign.id];
                    if (!entry) return null;
                    return (
                      <div
                        key={office.id}
                        className="flex items-center justify-between gap-2 p-2 rounded-lg border border-slate-200 bg-white text-xs"
                      >
                        <span className="font-medium text-[#142333] truncate">
                          {office.name.replace(' Ticket Office', '')}
                        </span>
                        <StockStatusIndicator status={entry.status} compact />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setSelectedDesign(null)}
                className="px-4 py-2 border border-slate-200 hover:border-slate-300 text-slate-700 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const tab =
                    selectedDesign.category === 'concession'
                      ? 'concession'
                      : selectedDesign.category === 'charm'
                      ? 'charms'
                      : 'ezlink';
                  setSelectedDesign(null);
                  onNavigate('cards', { cardTab: tab });
                }}
                className="px-4 py-2 bg-[#316aa1] hover:bg-[#255582] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
              >
                View Full Category
              </button>
            </div>
          </div>
        </div>
      )}

      <DiscussionEmbed
        shortname='simplygo-uiux'
        config={{
          url: typeof window !== 'undefined' ? window.location.href : 'https://simplygo.com.sg/',
          identifier: 'simplygo-home',
          title: 'SimplyGo — Transit & Travel Card Platform',
          language: 'en',
        }}
      />
    </div>
  );
}
