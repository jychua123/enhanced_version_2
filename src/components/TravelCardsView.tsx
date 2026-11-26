import { useState } from 'react';
import { Check, ArrowRight, Calculator, HelpCircle } from 'lucide-react';
import {
  CARD_CHARM_DESIGNS,
  CARD_PRODUCTS,
  ScreenId,
  TICKET_OFFICES,
  TICKET_OFFICE_STOCK,
} from '../data/simplygoData';
import { ResilientImage } from './ResilientImage';
import { ScreenBreadcrumb } from './ScreenBreadcrumb';
import {
  StockStatusIndicator,
  StockStatusLegend,
} from './StockStatusIndicator';

type CardTabId = 'ezlink' | 'charms' | 'concession' | 'motoring';

interface TravelCardsViewProps {
  initialTab: CardTabId;
  onNavigate: (screen: ScreenId) => void;
}

const TABS: {
  id: CardTabId;
  label: string;
  image: string;
  summary: string;
}[] = [
  {
    id: 'ezlink',
    label: 'EZ-Link & Bank Cards',
    image: 'https://simplygo.com.sg/media/rekjpvnv/ez-link-blue-card.png',
    summary:
      'Everyday stored-value cards and contactless bank cards for all commuters. Available off-the-shelf with no eligibility checks.',
  },
  {
    id: 'charms',
    label: 'EZ-Link Charms',
    image: 'https://simplygo.com.sg/media/hy0flez5/new-launches.jpg',
    summary:
      'Wearable tap-and-go accessories and limited-edition collectibles. Sold empty—remember to top up before riding.',
  },
  {
    id: 'concession',
    label: 'Concession Cards',
    image:
      'https://simplygo.com.sg/media/x33lrgvq/concession-monthly_travel_cards.png',
    summary:
      'Personalised subsidised transit cards and Monthly Travel Passes for eligible Students, Seniors, Children, Persons with Disabilities, and Adults.',
  },
  {
    id: 'motoring',
    label: 'EZ-Link Motoring & EV',
    image: 'https://simplygo.com.sg/media/dg3phwal/ez-link-motoring.png',
    summary:
      'Post-paid cardless billing for Electronic Road Pricing (ERP) gantries, HDB/URA carparks, and public EV charging sessions.',
  },
];

interface ConcessionPassTier {
  id: string;
  label: string;
  passName: string;
  monthlyCost: number;
  minFare: number;
  maxFare: number;
  defaultFare: number;
}

const CONCESSION_PASS_TIERS: ConcessionPassTier[] = [
  {
    id: 'adult',
    label: 'Adult',
    passName: 'Adult Monthly Travel Card',
    monthlyCost: 128,
    minFare: 1.19,
    maxFare: 2.38,
    defaultFare: 1.85,
  },
  {
    id: 'student-sch',
    label: 'Student (Pri / Sec)',
    passName: 'Student Hybrid Pass (Primary / Sec)',
    monthlyCost: 48,
    minFare: 0.52,
    maxFare: 0.76,
    defaultFare: 0.68,
  },
  {
    id: 'student-tertiary',
    label: 'Student (Tertiary)',
    passName: 'Student Hybrid Pass (Tertiary / Uni)',
    monthlyCost: 81,
    minFare: 0.52,
    maxFare: 0.76,
    defaultFare: 0.73,
  },
  {
    id: 'senior',
    label: 'Senior Citizen',
    passName: 'Senior Citizen Hybrid Pass',
    monthlyCost: 58,
    minFare: 0.69,
    maxFare: 1.07,
    defaultFare: 0.92,
  },
  {
    id: 'pwd',
    label: 'PWD',
    passName: 'PWD Hybrid Pass',
    monthlyCost: 58,
    minFare: 0.69,
    maxFare: 1.07,
    defaultFare: 0.92,
  },
  {
    id: 'wtcs',
    label: 'Workfare (WTCS)',
    passName: 'Workfare Transport Concession Pass',
    monthlyCost: 96,
    minFare: 0.88,
    maxFare: 1.9,
    defaultFare: 1.4,
  },
];

export function TravelCardsView({
  initialTab,
  onNavigate,
}: TravelCardsViewProps) {
  const [activeTab, setActiveTab] = useState<CardTabId>(initialTab);
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>(
    TICKET_OFFICES[0].id
  );
  const [selectedPassTierId, setSelectedPassTierId] = useState<string>('adult');
  const [tripsPerWeek, setTripsPerWeek] = useState<number>(14);
  const [avgFare, setAvgFare] = useState<number>(1.85);
  const [showEstimatorHelp, setShowEstimatorHelp] = useState(false);

  const activePassTier =
    CONCESSION_PASS_TIERS.find((t) => t.id === selectedPassTierId) ??
    CONCESSION_PASS_TIERS[0];
  const monthlyPayAsYouGo = tripsPerWeek * 4.33 * avgFare;
  const monthlySavings = monthlyPayAsYouGo - activePassTier.monthlyCost;
  const breakEvenWeeklyTrips = Math.ceil(
    activePassTier.monthlyCost / (avgFare * 4.33)
  );

  const handleSelectPassTier = (tier: ConcessionPassTier) => {
    setSelectedPassTierId(tier.id);
    setAvgFare(tier.defaultFare);
  };

  const selectedOffice =
    TICKET_OFFICES.find((o) => o.id === selectedOfficeId) ?? TICKET_OFFICES[0];
  const officeStockMap = TICKET_OFFICE_STOCK[selectedOffice.id] ?? {};

  const filteredProducts = CARD_PRODUCTS.filter((p) => p.category === activeTab);
  const filteredDesigns = CARD_CHARM_DESIGNS.filter((d) =>
    activeTab === 'ezlink'
      ? d.category === 'ezlink'
      : activeTab === 'charms'
      ? d.category === 'charm'
      : false
  );
  const activeTabInfo = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <section className="py-10 lg:py-12 bg-white min-h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <ScreenBreadcrumb
          currentLabel="Cards & Charms"
          subLabel={activeTabInfo.label}
          onBackHome={() => onNavigate('home')}
        />

        {/* Intro + 4 Clear Category Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#ebf2f9] rounded-2xl p-6 sm:p-10">
          <div className="lg:col-span-8 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142333]">
              {activeTabInfo.label}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              {activeTabInfo.summary}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#316aa1] text-white'
                        : 'bg-white text-slate-700 hover:text-[#316aa1] border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <ResilientImage
              src={activeTabInfo.image}
              alt={activeTabInfo.label}
              className="max-h-44 w-auto object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Visual Designs + Ticket Office Stock Status */}
        {filteredDesigns.length > 0 && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-[#142333]">
              {activeTab === 'ezlink'
                ? 'EZ-Link & SimplyGo EZ-Link Card Designs'
                : 'Latest Wearable EZ-Link Charms'}
            </h2>

            {(activeTab === 'ezlink' || activeTab === 'charms') && (
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex flex-wrap items-center gap-3">
                  <label
                    htmlFor="cards-ticket-office-select"
                    className="text-xs font-bold text-[#142333] whitespace-nowrap"
                  >
                    Check Ticket Office Stock:
                  </label>
                  <select
                    id="cards-ticket-office-select"
                    value={selectedOfficeId}
                    onChange={(e) => setSelectedOfficeId(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#142333] focus:outline-none focus:border-[#316aa1] cursor-pointer"
                  >
                    {TICKET_OFFICES.map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-slate-500">
                    {selectedOffice.station} · {selectedOffice.updatedAt}
                  </span>
                </div>

                <StockStatusLegend />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDesigns.map((design) => {
                const stockInfo = officeStockMap[design.id];
                const isSoldOut = stockInfo?.status === 'sold-out';

                return (
                  <div
                    key={design.id}
                    className={`border border-slate-200 rounded-2xl p-5 bg-white flex flex-col justify-between ${
                      isSoldOut ? 'opacity-90' : ''
                    }`}
                  >
                    <div>
                      <div className="h-44 rounded-xl bg-[#ebf2f9]/55 flex items-center justify-center p-3 mb-4 overflow-hidden">
                        {design.videoUrl ? (
                          <video
                            src={design.videoUrl}
                            poster={design.image}
                            controls
                            muted
                            loop
                            playsInline
                            className={`max-h-40 rounded-lg w-auto object-contain ${
                              isSoldOut ? 'grayscale opacity-75' : ''
                            }`}
                          />
                        ) : (
                          <ResilientImage
                            src={design.image}
                            alt={design.name}
                            fallbackLabel={design.name}
                            className={`max-h-36 w-auto object-contain ${
                              isSoldOut ? 'grayscale opacity-75' : ''
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-xs font-medium text-[#3f84c5]">
                        {design.badge}
                      </p>
                      <h3 className="text-lg font-bold text-[#142333] mt-0.5">
                        {design.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {design.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5 text-xs">
                      {stockInfo && (
                        <StockStatusIndicator
                          status={stockInfo.status}
                          detail={stockInfo.note}
                        />
                      )}
                      <p className="font-bold text-[#316aa1] tabular-nums">
                        {design.priceOrFee}
                      </p>
                      <p className="text-slate-500">
                        Available at: {design.whereToBuy}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Product Details */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between bg-white"
              >
                <div>
                  <p className="text-xs font-medium text-[#3f84c5]">
                    {product.eligibility}
                  </p>
                  <h2 className="text-2xl font-bold text-[#142333] mt-1.5">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {product.tagline}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {product.keyBenefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <Check className="w-4 h-4 text-[#316aa1] shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-500 block">
                      {product.monthlyPassPrice ? 'Monthly Pass' : 'Typical Fare'}
                    </span>
                    <span className="text-sm font-bold text-[#316aa1] tabular-nums">
                      {product.monthlyPassPrice || product.fareExample}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#ebf2f9] hover:bg-[#dce8f5] text-[#316aa1] text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Calculate Your Fare</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Concession Monthly Pass Break-Even Estimator */}
        {activeTab === 'concession' && (
          <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-slate-50">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[#316aa1] font-semibold text-sm">
                    <Calculator className="w-4 h-4" />
                    <span>Monthly Pass Break-Even Estimator</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEstimatorHelp((prev) => !prev)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-[#316aa1] cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>How is this calculated?</span>
                  </button>
                </div>

                {showEstimatorHelp && (
                  <p className="text-xs text-slate-600 bg-white border border-slate-200 rounded-lg p-3">
                    We multiply your weekly trips by 4.33 weeks per month and your concession card's single-trip fare, then compare against the flat price of the {activePassTier.passName} (${activePassTier.monthlyCost.toFixed(2)}).
                  </p>
                )}

                <h2 className="text-2xl font-bold text-[#142333]">
                  Should you buy the ${activePassTier.monthlyCost.toFixed(2)} {activePassTier.passName}?
                </h2>

                {/* Concession Card Type Selector */}
                <div className="flex flex-wrap gap-1.5">
                  {CONCESSION_PASS_TIERS.map((tier) => {
                    const isSelected = tier.id === activePassTier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => handleSelectPassTier(tier)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                          isSelected
                            ? 'bg-[#316aa1] text-white'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-[#316aa1] hover:text-[#316aa1]'
                        }`}
                      >
                        {tier.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between text-sm font-semibold text-[#142333] mb-2">
                      <span>Trips per Week</span>
                      <span className="tabular-nums text-[#316aa1]">
                        {tripsPerWeek} trips
                      </span>
                    </div>
                    <input
                      type="range"
                      min={4}
                      max={35}
                      step={1}
                      value={tripsPerWeek}
                      onChange={(e) => setTripsPerWeek(Number(e.target.value))}
                      className="w-full accent-[#316aa1] cursor-pointer"
                      aria-label="Trips per week"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm font-semibold text-[#142333] mb-2">
                      <span>Average Fare per Trip</span>
                      <span className="tabular-nums text-[#316aa1]">
                        ${avgFare.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={activePassTier.minFare}
                      max={activePassTier.maxFare}
                      step={0.01}
                      value={avgFare}
                      onChange={(e) => setAvgFare(Number(e.target.value))}
                      className="w-full accent-[#316aa1] cursor-pointer"
                      aria-label="Average fare per trip"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-3.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Estimated Pay-As-You-Go</span>
                  <span className="font-bold text-[#142333] tabular-nums">
                    ${monthlyPayAsYouGo.toFixed(2)} / mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{activePassTier.passName}</span>
                  <span className="font-bold text-[#142333] tabular-nums">
                    ${activePassTier.monthlyCost.toFixed(2)} / mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Break-even point at ${avgFare.toFixed(2)}/trip</span>
                  <span className="font-semibold text-[#142333] tabular-nums">
                    {breakEvenWeeklyTrips} trips / week
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-[#142333]">
                    Recommendation
                  </span>
                  <span
                    className={`text-sm font-bold tabular-nums text-right ${
                      monthlySavings > 0 ? 'text-emerald-700' : 'text-[#316aa1]'
                    }`}
                  >
                    {monthlySavings > 0
                      ? `Monthly Pass saves $${monthlySavings.toFixed(2)}/mo`
                      : `Pay-As-You-Go saves $${Math.abs(monthlySavings).toFixed(2)}/mo`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
