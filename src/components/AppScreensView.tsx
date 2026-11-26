import { useState } from 'react';
import {
  CheckCircle2,
  ShieldCheck,
  Car,
  CreditCard,
  RefreshCw,
  FileText,
  Undo2,
  AlertCircle,
} from 'lucide-react';
import {
  APP_FEATURES,
  AppFeatureId,
  MOTORING_CHARGES,
  SAMPLE_TRANSACTIONS,
  ScreenId,
  TransitCardAccount,
} from '../data/simplygoData';
import { ResilientImage } from './ResilientImage';
import { ScreenBreadcrumb } from './ScreenBreadcrumb';

interface AppScreensViewProps {
  selectedFeature: AppFeatureId;
  onSelectFeature: (id: AppFeatureId) => void;
  accounts: TransitCardAccount[];
  onUpdateAutoTopUp: (
    cardId: string,
    enabled: boolean,
    threshold: number,
    amount: number
  ) => void;
  onTopUpCard: (cardId: string, amount: number) => void;
  onNavigate: (screen: ScreenId) => void;
}

export function AppScreensView({
  selectedFeature,
  onSelectFeature,
  accounts,
  onUpdateAutoTopUp,
  onTopUpCard,
  onNavigate,
}: AppScreensViewProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>(
    accounts[0]?.id ?? 'card-1'
  );
  const [lastTopUp, setLastTopUp] = useState<{
    cardId: string;
    cardName: string;
    amount: number;
  } | null>(null);
  const [autoTopUpSavedMsg, setAutoTopUpSavedMsg] = useState<string | null>(
    null
  );

  const [claimRoute, setClaimRoute] = useState('Paya Lebar → Raffles Place');
  const [claimReason, setClaimReason] = useState('Missed Tap-Out');
  const [claimError, setClaimError] = useState<string | null>(null);
  const [claimSubmittedId, setClaimSubmittedId] = useState<string | null>(null);

  const [myInfoVerified, setMyInfoVerified] = useState(false);
  const [confirmingRenewal, setConfirmingRenewal] = useState(false);
  const [passRenewed, setPassRenewed] = useState(false);

  const activeFeature =
    APP_FEATURES.find((f) => f.id === selectedFeature) ?? APP_FEATURES[0];
  const activeCard =
    accounts.find((c) => c.id === selectedCardId) ?? accounts[0];
  const filteredTransactions = SAMPLE_TRANSACTIONS.filter(
    (tx) => tx.cardId === activeCard.id
  );

  const handleQuickTopUp = (card: TransitCardAccount, amount: number) => {
    onTopUpCard(card.id, amount);
    setLastTopUp({ cardId: card.id, cardName: card.nickname, amount });
  };

  const handleUndoTopUp = () => {
    if (!lastTopUp) return;
    onTopUpCard(lastTopUp.cardId, -lastTopUp.amount);
    setLastTopUp(null);
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = claimRoute.trim();
    if (cleaned.length < 4) {
      setClaimError(
        'Please describe your journey (for example: "Paya Lebar → Raffles Place" or "Bus 154").'
      );
      return;
    }
    setClaimError(null);
    setClaimSubmittedId('CLM-2026-49182');
  };

  return (
    <section className="py-10 lg:py-12 bg-slate-50 min-h-[calc(100vh-8rem)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScreenBreadcrumb
          currentLabel="SimplyGo App"
          subLabel={activeFeature.title}
          onBackHome={() => onNavigate('home')}
        />

        {/* Header */}
        <div className="max-w-3xl mb-7">
          <p className="text-sm font-semibold text-[#3f84c5]">
            SimplyGo Mobile Experience
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#142333] mt-1">
            Interactive SimplyGo App Screens
          </h1>
          <p className="mt-2 text-base text-slate-600">
            Select any screen below to inspect the mobile layout and try everyday commuter actions.
          </p>
        </div>

        {/* Segmented Screen Switcher */}
        <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 p-2 rounded-xl mb-8">
          {APP_FEATURES.map((feature) => {
            const isActive = feature.id === selectedFeature;
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => onSelectFeature(feature.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#316aa1] text-white'
                    : 'text-slate-700 hover:bg-[#ebf2f9] hover:text-[#316aa1]'
                }`}
              >
                <ResilientImage
                  src={feature.icon}
                  alt={feature.shortTitle}
                  className="w-5 h-5 object-contain rounded"
                />
                <span>{feature.title}</span>
              </button>
            );
          })}
        </div>

        {/* Main Screen Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Official SimplyGo App Screen */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Mobile Screen Preview
                </p>
                <h2 className="text-xl font-bold text-[#142333]">
                  {activeFeature.title}
                </h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-[#ebf2f9] p-1.5 flex items-center justify-center">
                <ResilientImage
                  src={activeFeature.icon}
                  alt={activeFeature.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="bg-[#ebf2f9]/65 border border-slate-200/70 rounded-2xl p-6 flex items-center justify-center">
              <ResilientImage
                src={activeFeature.screenImage}
                alt={`${activeFeature.title} official screen`}
                fallbackLabel={activeFeature.title}
                className="w-full max-w-[280px] h-auto max-h-[440px] object-contain"
              />
            </div>

            <p className="mt-5 text-sm text-slate-600 leading-relaxed">
              {activeFeature.description}
            </p>
          </div>

          {/* Right: Interactive Screen Workspace */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
            {selectedFeature === 'transactions' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#142333]">
                      Card Balance & Trip History
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Choose a linked card to view its recent trips or add stored value.
                    </p>
                  </div>
                  {activeCard.cardType !== 'Bank Contactless' && (
                    <button
                      type="button"
                      onClick={() => handleQuickTopUp(activeCard, 10)}
                      className="px-4 py-2 bg-[#316aa1] hover:bg-[#255582] text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Quick Top-Up +$10.00
                    </button>
                  )}
                </div>

                {/* Heuristic 1 & 3: Visible System Status + Undoable Action */}
                {lastTopUp && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-wrap items-center justify-between gap-3 text-sm text-emerald-900">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="tabular-nums">
                        Added ${lastTopUp.amount.toFixed(2)} to{' '}
                        <strong>{lastTopUp.cardName}</strong>.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleUndoTopUp}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-emerald-300 hover:bg-emerald-100 text-xs font-semibold text-emerald-900 cursor-pointer"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span>Undo Top-Up</span>
                    </button>
                  </div>
                )}

                {/* Card Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {accounts.map((card) => {
                    const isSelected = card.id === activeCard.id;
                    return (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => setSelectedCardId(card.id)}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#ebf2f9] border-[#316aa1]'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{card.cardType}</span>
                          <CreditCard className="w-4 h-4 text-[#316aa1]" />
                        </div>
                        <p className="font-bold text-sm text-[#142333] mt-1 truncate">
                          {card.nickname}
                        </p>
                        <p className="font-mono text-xs text-slate-500 mt-1 tabular-nums">
                          {card.maskedNumber}
                        </p>
                        <p className="mt-3 text-lg font-bold text-[#316aa1] tabular-nums">
                          {card.cardType === 'Bank Contactless'
                            ? 'Billed to Bank'
                            : `$${card.balance.toFixed(2)}`}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Trip / Activity</th>
                        <th className="py-3 px-4">Transport</th>
                        <th className="py-3 px-4 text-right">Fare / Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {filteredTransactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50/70">
                          <td className="py-3 px-4 whitespace-nowrap text-slate-600 tabular-nums">
                            <div>{tx.date}</div>
                            <div className="text-xs text-slate-400">{tx.time}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-[#142333]">
                              {tx.route}
                            </div>
                            <div className="text-xs text-slate-500">{tx.detail}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                            {tx.mode}
                          </td>
                          <td
                            className={`py-3 px-4 text-right font-semibold whitespace-nowrap tabular-nums ${
                              tx.amount > 0
                                ? 'text-emerald-700'
                                : 'text-[#142333]'
                            }`}
                          >
                            {tx.amount > 0
                              ? `+$${tx.amount.toFixed(2)}`
                              : tx.amount === 0
                              ? '$0.00 (Pass)'
                              : `-$${Math.abs(tx.amount).toFixed(2)}`}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {selectedFeature === 'autotopup' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-5">
                  <h3 className="text-xl font-bold text-[#142333]">
                    Auto Top-Up Settings
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Choose when your card automatically tops up so you never get stuck at a faregate.
                  </p>
                </div>

                {autoTopUpSavedMsg && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{autoTopUpSavedMsg}</span>
                  </div>
                )}

                {accounts
                  .filter((a) => a.cardType !== 'Bank Contactless')
                  .map((card) => (
                    <div
                      key={card.id}
                      className="p-5 border border-slate-200 rounded-xl space-y-4 bg-slate-50/50"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <h4 className="font-bold text-[#142333]">
                            {card.nickname}
                          </h4>
                          <p className="text-xs text-slate-500 font-mono tabular-nums mt-0.5">
                            {card.cardType} · {card.maskedNumber} · Balance: $
                            {card.balance.toFixed(2)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const nextState = !card.autoTopUpEnabled;
                            onUpdateAutoTopUp(
                              card.id,
                              nextState,
                              card.autoTopUpThreshold || 15,
                              card.autoTopUpAmount || 30
                            );
                            setAutoTopUpSavedMsg(
                              `${card.nickname}: Auto Top-Up ${
                                nextState ? 'enabled' : 'paused'
                              }.`
                            );
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                            card.autoTopUpEnabled
                              ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {card.autoTopUpEnabled
                            ? 'Auto Top-Up On (Click to Pause)'
                            : 'Turn On Auto Top-Up'}
                        </button>
                      </div>

                      {card.autoTopUpEnabled && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                              Top up automatically when balance drops below
                            </label>
                            <div className="flex gap-2">
                              {[10, 15, 20].map((val) => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => {
                                    onUpdateAutoTopUp(
                                      card.id,
                                      true,
                                      val,
                                      card.autoTopUpAmount || 30
                                    );
                                    setAutoTopUpSavedMsg(
                                      `Updated trigger for ${card.nickname} to below $${val}.`
                                    );
                                  }}
                                  className={`flex-1 py-2 rounded-lg text-sm font-semibold tabular-nums border cursor-pointer ${
                                    card.autoTopUpThreshold === val
                                      ? 'bg-[#316aa1] text-white border-[#316aa1]'
                                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#316aa1]'
                                  }`}
                                >
                                  ${val}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                              Amount to add each time
                            </label>
                            <div className="flex gap-2">
                              {[20, 30, 50].map((amt) => (
                                <button
                                  key={amt}
                                  type="button"
                                  onClick={() => {
                                    onUpdateAutoTopUp(
                                      card.id,
                                      true,
                                      card.autoTopUpThreshold || 15,
                                      amt
                                    );
                                    setAutoTopUpSavedMsg(
                                      `Updated top-up amount for ${card.nickname} to $${amt}.`
                                    );
                                  }}
                                  className={`flex-1 py-2 rounded-lg text-sm font-semibold tabular-nums border cursor-pointer ${
                                    card.autoTopUpAmount === amt
                                      ? 'bg-[#316aa1] text-white border-[#316aa1]'
                                      : 'bg-white text-slate-700 border-slate-200 hover:border-[#316aa1]'
                                  }`}
                                >
                                  ${amt}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}

            {selectedFeature === 'motoring' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#142333]">
                      EZ-Link Motoring & EV Charging
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Vehicle SNG 4812 K · In-Vehicle Unit (IU) 1094827103 · Cardless billing active
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#316aa1]">
                    <Car className="w-4 h-4" />
                    <span className="tabular-nums">Month-to-date: $23.27</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {MOTORING_CHARGES.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border border-slate-200 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-xs text-slate-500 tabular-nums">
                          {item.type} · {item.date} at {item.time}
                        </div>
                        <div className="font-semibold text-[#142333] mt-0.5">
                          {item.location}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.durationOrGantry}
                        </div>
                      </div>
                      <div className="text-base font-bold text-[#142333] tabular-nums shrink-0">
                        ${item.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedFeature === 'concession' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-5">
                  <h3 className="text-xl font-bold text-[#142333]">
                    Concession Pass Management
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Renew Monthly Concession Passes or request a replacement if your card is lost.
                  </p>
                </div>

                <div className="p-5 bg-[#ebf2f9]/65 border border-[#316aa1]/25 rounded-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-[#316aa1]">
                        Adult Monthly Travel Card · 1009 5510 3829 6140
                      </p>
                      <h4 className="text-lg font-bold text-[#142333] mt-1">
                        Unlimited Bus + MRT/LRT Monthly Pass
                      </h4>
                      <p className="text-sm text-slate-600 mt-1 tabular-nums">
                        {passRenewed
                          ? 'Active until 30 Dec 2026 (Renewed)'
                          : 'Current pass valid until 30 Nov 2026'}
                      </p>
                    </div>

                    {!passRenewed && !confirmingRenewal && (
                      <button
                        type="button"
                        onClick={() => setConfirmingRenewal(true)}
                        className="px-4 py-2.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer bg-[#316aa1] hover:bg-[#255582] text-white"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Renew Pass ($128.00)</span>
                      </button>
                    )}

                    {passRenewed && (
                      <button
                        type="button"
                        onClick={() => setPassRenewed(false)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                        <span>Undo Renewal</span>
                      </button>
                    )}
                  </div>

                  {/* Heuristic 5 (Error Prevention): Inline confirmation step before charging $128 */}
                  {confirmingRenewal && !passRenewed && (
                    <div className="p-4 bg-white border border-[#316aa1]/30 rounded-xl flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs sm:text-sm font-medium text-[#142333]">
                        Confirm renewal for <strong>$128.00</strong> (extends pass to 30 Dec 2026)?
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setConfirmingRenewal(false)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setPassRenewed(true);
                            setConfirmingRenewal(false);
                          }}
                          className="px-3.5 py-1.5 rounded-lg bg-[#316aa1] hover:bg-[#255582] text-white text-xs font-semibold cursor-pointer"
                        >
                          Confirm $128.00 Renewal
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-slate-200 rounded-xl">
                    <h5 className="font-bold text-sm text-[#142333]">
                      Lost Card Replacement
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Immediately block a misplaced concession card and transfer remaining stored value and pass days to your replacement card.
                    </p>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-xl">
                    <h5 className="font-bold text-sm text-[#142333]">
                      Upgrade Older Concession Cards
                    </h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Convert older stored-value concession cards to SimplyGo at any Self-Help Ticketing Machine to view trips on your phone.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedFeature === 'claims' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-5">
                  <h3 className="text-xl font-bold text-[#142333]">
                    Submit a Commuter Travel Claim
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Request a fare refund if a gate failed to register your tap-out or charged you twice.
                  </p>
                </div>

                {claimSubmittedId ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
                    <div className="flex items-center gap-2.5 text-emerald-800 font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Claim Submitted Successfully</span>
                    </div>
                    <p className="text-sm text-emerald-900">
                      Reference ID:{' '}
                      <span className="font-mono font-semibold">
                        {claimSubmittedId}
                      </span>{' '}
                      · Trip: {claimRoute} ({claimReason}). Approved refunds are credited directly to your card within 3 working days.
                    </p>
                    <button
                      type="button"
                      onClick={() => setClaimSubmittedId(null)}
                      className="px-4 py-2 bg-white border border-emerald-300 text-emerald-900 text-sm font-semibold rounded-lg hover:bg-emerald-100 cursor-pointer"
                    >
                      Submit Another Claim
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitClaim} noValidate className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#142333] mb-1.5">
                        Which MRT or Bus trip was affected?
                      </label>
                      <input
                        type="text"
                        value={claimRoute}
                        onChange={(e) => {
                          setClaimRoute(e.target.value);
                          if (claimError) setClaimError(null);
                        }}
                        className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none ${
                          claimError
                            ? 'border-red-400 focus:border-red-500 bg-red-50/30'
                            : 'border-slate-300 focus:border-[#316aa1]'
                        }`}
                        placeholder="e.g. Tampines → Raffles Place or Bus 154"
                      />
                      {claimError && (
                        <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{claimError}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#142333] mb-1.5">
                        What happened?
                      </label>
                      <select
                        value={claimReason}
                        onChange={(e) => setClaimReason(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#316aa1] bg-white"
                      >
                        <option>Missed Tap-Out</option>
                        <option>Charged Twice for Same Trip</option>
                        <option>Failed Auto Top-Up Deduction</option>
                        <option>Incorrect Concession Fare Charged</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#316aa1] hover:bg-[#255582] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Submit Travel Claim</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {selectedFeature === 'myinfo' && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-5">
                  <h3 className="text-xl font-bold text-[#142333]">
                    Verify Ownership with Singpass
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Protects concession applications, balance refunds, and lost card replacements so only you can manage them.
                  </p>
                </div>

                <div className="p-6 border border-slate-200 rounded-xl bg-slate-50/70 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#316aa1] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#142333]">
                        {myInfoVerified
                          ? 'Identity Verified via Singpass'
                          : 'Confirm Your Identity via Singpass'}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">
                        {myInfoVerified
                          ? 'Verified commuter: Chua Jia Yu · NRIC ending •••• 482J · Ready for concession applications and refunds.'
                          : 'Authorise SimplyGo to retrieve your verified name, NRIC/FIN, and mailing address securely from Singpass.'}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setMyInfoVerified((prev) => !prev)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      myInfoVerified
                        ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                        : 'bg-[#cf0b15] hover:bg-[#b00912] text-white'
                    }`}
                  >
                    {myInfoVerified
                      ? 'Verified · Reset Demo'
                      : 'Verify with Singpass'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
