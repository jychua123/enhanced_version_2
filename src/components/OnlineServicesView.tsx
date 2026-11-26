import { useState } from 'react';
import {
  Search,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import {
  AppFeatureId,
  DISTANCE_FARE_BANDS,
  ScreenId,
} from '../data/simplygoData';
import { ScreenBreadcrumb } from './ScreenBreadcrumb';

interface OnlineServicesViewProps {
  onNavigate: (screen: ScreenId, appFeature?: AppFeatureId) => void;
}

type CommuterCategory = 'adult' | 'student' | 'seniorPwd' | 'wtcs';

const ROUTE_PRESETS = [
  { label: 'Short Hop (2.5 km)', km: 2.5 },
  { label: 'Paya Lebar → Raffles Place (6.8 km)', km: 6.8 },
  { label: 'Tampines → City Hall (14.5 km)', km: 14.5 },
  { label: 'Jurong East → Changi (28.0 km)', km: 28.0 },
];

const STATUS_RECORDS: Record<
  string,
  {
    applicant: string;
    cardType: string;
    status: string;
    detail: string;
  }
> = {
  'SG-2026-88412': {
    applicant: 'Chua Jia Yu',
    cardType: 'SimplyGo Adult Monthly Travel Card',
    status: 'Approved & Mailed',
    detail:
      'Sent via SingPost registered mail · Expected delivery in 2 working days.',
  },
  'SG-2026-51209': {
    applicant: 'Tan Wei Ming',
    cardType: 'Undergraduate Student Concession Card',
    status: 'Ready for Collection',
    detail: 'Available at Somerset SimplyGo Ticketing Service Centre.',
  },
};

export function OnlineServicesView({ onNavigate }: OnlineServicesViewProps) {
  const [distanceKm, setDistanceKm] = useState<number>(6.8);
  const [commuterType, setCommuterType] = useState<CommuterCategory>('adult');
  const [pre745am, setPre745am] = useState<boolean>(false);
  const [showPrePeakHelp, setShowPrePeakHelp] = useState<boolean>(false);

  const [refInput, setRefInput] = useState<string>('SG-2026-88412');
  const [statusError, setStatusError] = useState<string | null>(null);
  const [statusResult, setStatusResult] = useState<
    (typeof STATUS_RECORDS)[string] | null
  >(STATUS_RECORDS['SG-2026-88412']);

  const matchedBand =
    DISTANCE_FARE_BANDS.find((b) => distanceKm <= b.maxKm) ??
    DISTANCE_FARE_BANDS[DISTANCE_FARE_BANDS.length - 1];

  const baseFare = matchedBand[commuterType];
  const discount = pre745am ? Math.min(0.5, baseFare - 0.1) : 0;
  const finalFare = Math.max(0.1, baseFare - discount);

  const lookupReference = (raw: string) => {
    const key = raw.trim().toUpperCase();
    if (!key) {
      setStatusError(
        'Please enter your application reference number (for example: SG-2026-88412).'
      );
      setStatusResult(null);
      return;
    }
    const found = STATUS_RECORDS[key];
    if (found) {
      setStatusError(null);
      setStatusResult(found);
    } else {
      setStatusError(
        `We couldn't find an application matching "${key}". Reference numbers use the format SG-YYYY-NNNNN.`
      );
      setStatusResult(null);
    }
  };

  const handleStatusCheck = (e: React.FormEvent) => {
    e.preventDefault();
    lookupReference(refInput);
  };

  return (
    <section className="py-10 lg:py-12 bg-slate-50 min-h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <ScreenBreadcrumb
          currentLabel="Online Services"
          subLabel="Fare Calculator & Card Status"
          onBackHome={() => onNavigate('home')}
        />

        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#3f84c5]">
            SimplyGo Digital e-Services
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142333] mt-1">
            Fare Calculator & Online Card Services
          </h1>
          <p className="mt-2 text-base text-slate-600">
            Pick a common Singapore route or adjust the distance to see exact fares, or check your concession card application progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Distance-Based Fare Calculator */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#142333]">
                Bus & MRT Distance Fare Calculator
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Covers basic bus services and MRT/LRT trains in one connected journey (up to 5 transfers).
              </p>
            </div>

            {/* Category Selector (Plain Language) */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-600 block">
                1. Who is travelling?
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'adult', label: 'Adult (Card / Bank)' },
                  { id: 'student', label: 'Student' },
                  { id: 'seniorPwd', label: 'Senior / Persons with Disabilities' },
                  { id: 'wtcs', label: 'Workfare Transport (WTCS)' },
                ].map((cat) => {
                  const isSelected = commuterType === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCommuterType(cat.id as CommuterCategory)}
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isSelected
                          ? 'bg-[#316aa1] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-[#ebf2f9] hover:text-[#316aa1]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Heuristic 6: Recognition Rather than Recall — Common Singapore Route Presets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-600 block">
                2. Pick a sample route or adjust distance
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ROUTE_PRESETS.map((preset) => {
                  const active = Math.abs(distanceKm - preset.km) < 0.05;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setDistanceKm(preset.km)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#ebf2f9] border-[#316aa1] text-[#316aa1]'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-[#316aa1]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Distance Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-semibold">
                <span className="text-[#142333]">Trip Distance</span>
                <span className="text-[#316aa1] tabular-nums">
                  {distanceKm.toFixed(1)} km ({matchedBand.label})
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                step={0.5}
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full accent-[#316aa1] cursor-pointer"
                aria-label="Total journey distance in kilometers"
              />
            </div>

            {/* Morning Pre-Peak Toggle + Contextual Help */}
            <div className="p-4 rounded-xl bg-[#ebf2f9]/60 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-[#142333]">
                      Morning Pre-Peak Rail Discount (Before 7:45 AM)
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowPrePeakHelp((prev) => !prev)}
                      className="text-slate-500 hover:text-[#316aa1] cursor-pointer"
                      aria-label="Explain morning pre-peak rail discount"
                    >
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Save up to $0.50 on weekday MRT/LRT trips when tapping in before 7:45 AM.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPre745am((prev) => !prev)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                    pre745am
                      ? 'bg-[#316aa1] text-white'
                      : 'bg-white border border-slate-300 text-slate-700'
                  }`}
                >
                  {pre745am ? 'Applied' : 'Apply'}
                </button>
              </div>
              {showPrePeakHelp && (
                <p className="text-xs text-slate-600 bg-white border border-slate-200 rounded-lg p-2.5">
                  Discount applies automatically on weekday mornings (excluding public holidays) when your first tap-in at any MRT/LRT station is at or before 7:45 AM.
                </p>
              )}
            </div>

            {/* Result Summary */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <span className="text-xs text-slate-500 block">Standard Fare</span>
                <span className="text-lg font-bold text-[#142333] tabular-nums">
                  ${baseFare.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Pre-Peak Rebate</span>
                <span className="text-lg font-bold text-emerald-700 tabular-nums">
                  -${discount.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Estimated Total</span>
                <span className="text-2xl font-bold text-[#316aa1] tabular-nums">
                  ${finalFare.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Application Status Checker + Quick Links */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4">
              <div>
                <h2 className="text-xl font-bold text-[#142333]">
                  Check Concession Application Status
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Enter your reference ID or click a sample ID below to test:
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {Object.keys(STATUS_RECORDS).map((sampleId) => (
                    <button
                      key={sampleId}
                      type="button"
                      onClick={() => {
                        setRefInput(sampleId);
                        lookupReference(sampleId);
                      }}
                      className="px-2.5 py-1 rounded-md bg-[#ebf2f9] hover:bg-[#dce8f5] font-mono text-xs font-semibold text-[#316aa1] cursor-pointer"
                    >
                      Try {sampleId}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleStatusCheck} className="flex gap-2">
                <input
                  type="text"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  placeholder="SG-2026-88412"
                  className="flex-1 px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:border-[#316aa1]"
                  aria-label="Application reference number"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#316aa1] hover:bg-[#255582] text-white text-sm font-semibold rounded-lg transition-colors inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Check</span>
                </button>
              </form>

              {statusError && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs sm:text-sm text-amber-900">
                  <div className="flex items-start gap-2 font-semibold">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{statusError}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-6">
                    <button
                      type="button"
                      onClick={() => {
                        setRefInput('SG-2026-88412');
                        lookupReference('SG-2026-88412');
                      }}
                      className="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-xs font-semibold cursor-pointer"
                    >
                      Load Sample SG-2026-88412
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('locations')}
                      className="px-2.5 py-1 bg-white border border-amber-300 rounded-md text-xs font-semibold cursor-pointer"
                    >
                      Contact Support
                    </button>
                  </div>
                </div>
              )}

              {statusResult && (
                <div className="p-4 rounded-xl bg-[#ebf2f9]/70 border border-[#316aa1]/25 space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#316aa1]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{statusResult.status}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#142333]">
                    {statusResult.cardType} · {statusResult.applicant}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {statusResult.detail}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-bold text-[#142333]">
                Self-Service e-Services
              </h3>
              {[
                {
                  label: 'Submit a Commuter Travel Claim',
                  feature: 'claims' as AppFeatureId,
                },
                {
                  label: 'Renew Monthly Concession Pass',
                  feature: 'concession' as AppFeatureId,
                },
                {
                  label: 'Verify Identity with Singpass',
                  feature: 'myinfo' as AppFeatureId,
                },
              ].map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => onNavigate('app', link.feature)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 hover:border-[#316aa1] hover:bg-[#ebf2f9]/40 text-sm font-semibold text-[#142333] transition-colors cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#316aa1]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
