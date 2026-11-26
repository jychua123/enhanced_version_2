import { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Send,
  CheckCircle2,
  X,
  AlertCircle,
} from 'lucide-react';
import {
  ASSISTANCE_TILES,
  AssistanceCategory,
  CARD_CHARM_DESIGNS,
  SERVICE_LOCATIONS,
  ScreenId,
  TICKET_OFFICE_STOCK,
} from '../data/simplygoData';
import { ScreenBreadcrumb } from './ScreenBreadcrumb';
import {
  StockStatusIndicator,
  StockStatusLegend,
} from './StockStatusIndicator';

interface LocationsViewProps {
  initialCategory: AssistanceCategory;
  onNavigate: (screen: ScreenId) => void;
}

const CATEGORY_FILTERS: { id: AssistanceCategory; label: string }[] = [
  { id: 'all', label: 'All Locations' },
  { id: 'ticket-office', label: 'Ticket Offices' },
  { id: 'service-centre', label: 'Service Centres' },
  { id: 'kiosk', label: 'Self-Help Kiosks' },
  { id: 'contact', label: 'Contact Centre' },
];

const REGIONS = ['All', 'Central', 'East', 'West', 'North', 'North-East'] as const;

export function LocationsView({
  initialCategory,
  onNavigate,
}: LocationsViewProps) {
  const [category, setCategory] = useState<AssistanceCategory>(initialCategory);
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [enquiryName, setEnquiryName] = useState('');
  const [enquiryEmail, setEnquiryEmail] = useState('');
  const [enquiryMessage, setEnquiryMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const visibleLocations = SERVICE_LOCATIONS.filter((loc) => {
    const matchesCat =
      category === 'all' || category === 'contact' || loc.category === category;
    const matchesRegion =
      regionFilter === 'All' || loc.region === regionFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      loc.name.toLowerCase().includes(q) ||
      loc.station.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q);
    return matchesCat && matchesRegion && matchesQuery;
  });

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!enquiryName.trim()) {
      setFormError('Please enter your name so we know how to address you.');
      return;
    }
    if (!emailPattern.test(enquiryEmail.trim())) {
      setFormError(
        'Please enter a valid email address (for example: name@example.com).'
      );
      return;
    }
    if (enquiryMessage.trim().length < 8) {
      setFormError(
        'Please share a brief description of your enquiry (at least 8 characters).'
      );
      return;
    }
    setFormError(null);
    setEnquirySubmitted(true);
  };

  return (
    <section className="py-10 lg:py-12 bg-white min-h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScreenBreadcrumb
          currentLabel="Locations & Support"
          subLabel={
            CATEGORY_FILTERS.find((c) => c.id === category)?.label ?? 'All'
          }
          onBackHome={() => onNavigate('home')}
        />

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142333]">
              Locations & Ticket Office Stock
            </h1>
            <p className="mt-1.5 text-sm sm:text-base text-slate-600">
              Find SimplyGo Ticket Offices, Service Centres, and Kiosks with live card & charm stock status.
            </p>
          </div>

          <div className="w-full lg:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search MRT station (e.g. Raffles Place)..."
              className="w-full px-4 pr-9 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#316aa1]"
              aria-label="Search MRT station or region"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label="Clear location search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#ebf2f9]/70 p-2 rounded-xl border border-slate-200/80">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORY_FILTERS.map((tab) => {
              const isActive = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#316aa1] text-white'
                      : 'text-slate-700 hover:bg-white hover:text-[#316aa1]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {category !== 'contact' && (
            <div className="flex flex-wrap items-center gap-1 px-2">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  onClick={() => setRegionFilter(region)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    regionFilter === region
                      ? 'bg-white text-[#316aa1] shadow-xs'
                      : 'text-slate-600 hover:text-[#142333]'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          )}
        </div>

        {category !== 'contact' && (
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
            <StockStatusLegend />
            <span className="text-xs text-slate-500">
              Live counter availability shown on all SimplyGo Ticket Offices
            </span>
          </div>
        )}

        {category === 'contact' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-[#ebf2f9] rounded-2xl p-6 sm:p-8 space-y-5">
              <h2 className="text-2xl font-bold text-[#142333]">
                SimplyGo Contact Centre
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our commuter care specialists assist with card replacements, fare adjustments, Auto Top-Up enquiries, and concession card eligibility.
              </p>
              <div className="space-y-3 pt-2 text-sm text-[#142333]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#316aa1] shrink-0" />
                  <span className="font-semibold tabular-nums">
                    1800-2255-663 (Toll-free in Singapore)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#316aa1] shrink-0" />
                  <span>Daily · 8:00 AM – 6:00 PM (Except Public Holidays)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 border border-slate-200 rounded-2xl p-6 sm:p-8">
              {enquirySubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Enquiry Received</span>
                  </div>
                  <p className="text-sm text-emerald-900">
                    Thank you, {enquiryName}. A SimplyGo support officer will respond to {enquiryEmail} within 3 working days.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setEnquirySubmitted(false);
                      setEnquiryMessage('');
                    }}
                    className="px-4 py-2 bg-white border border-emerald-300 text-emerald-900 text-sm font-semibold rounded-lg cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleEnquirySubmit}
                  noValidate
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold text-[#142333]">
                    Online Enquiry Form
                  </h3>

                  {formError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#142333] mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={enquiryName}
                        onChange={(e) => {
                          setEnquiryName(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        placeholder="Chua Jia Yu"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#316aa1]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#142333] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={enquiryEmail}
                        onChange={(e) => {
                          setEnquiryEmail(e.target.value);
                          if (formError) setFormError(null);
                        }}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#316aa1]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#142333] mb-1">
                      How can we help?
                    </label>
                    <textarea
                      rows={4}
                      value={enquiryMessage}
                      onChange={(e) => {
                        setEnquiryMessage(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="Describe your card enquiry or fare question..."
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#316aa1]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#316aa1] hover:bg-[#255582] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Enquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleLocations.length === 0 ? (
              <div className="md:col-span-2 p-8 text-center border border-slate-200 rounded-2xl bg-slate-50 space-y-3">
                <p className="text-base font-semibold text-[#142333]">
                  No service locations matched "{searchQuery || regionFilter}".
                </p>
                <p className="text-xs text-slate-500">
                  We currently list counters across Central, East, West, North, and North-East MRT interchanges.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setRegionFilter('All');
                      setCategory('all');
                    }}
                    className="px-4 py-2 bg-[#316aa1] text-white text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Show All Locations
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory('contact')}
                    className="px-4 py-2 bg-white border border-slate-300 text-[#142333] text-xs font-semibold rounded-lg cursor-pointer"
                  >
                    Contact Support Instead
                  </button>
                </div>
              </div>
            ) : (
              visibleLocations.map((loc) => {
                const tileMeta = ASSISTANCE_TILES.find(
                  (t) => t.category === loc.category
                );
                const officeStock = loc.officeId
                  ? TICKET_OFFICE_STOCK[loc.officeId]
                  : undefined;

                return (
                  <div
                    key={loc.id}
                    className="border border-slate-200 rounded-2xl p-6 flex flex-col justify-between bg-white space-y-4"
                  >
                    <div>
                      <p className="text-xs font-medium text-[#3f84c5]">
                        {tileMeta?.title} · {loc.region} Region
                      </p>
                      <h2 className="text-xl font-bold text-[#142333] mt-1">
                        {loc.name}
                      </h2>

                      <div className="mt-4 space-y-2 text-sm text-slate-600">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-[#316aa1] shrink-0 mt-0.5" />
                          <span>
                            {loc.station} — {loc.address}
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-[#316aa1] shrink-0 mt-0.5" />
                          <span className="tabular-nums">{loc.hours}</span>
                        </div>
                      </div>
                    </div>

                    {/* Ticket Office Counter Stock Status */}
                    {officeStock && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <p className="text-xs font-bold text-[#142333]">
                          EZ-Link Cards & Charms Stock at This Counter
                        </p>
                        <div className="space-y-1.5">
                          {Object.entries(officeStock).map(
                            ([designId, stockEntry]) => {
                              const design = CARD_CHARM_DESIGNS.find(
                                (d) => d.id === designId
                              );
                              if (!design) return null;
                              return (
                                <div
                                  key={designId}
                                  className="flex items-center justify-between gap-2 text-xs"
                                >
                                  <span className="text-slate-700 truncate font-medium">
                                    {design.name}
                                  </span>
                                  <StockStatusIndicator
                                    status={stockEntry.status}
                                    compact
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-100 text-xs text-slate-600">
                      <span className="font-semibold text-[#142333]">
                        Available Services:{' '}
                      </span>
                      {loc.services.join(' · ')}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
}
