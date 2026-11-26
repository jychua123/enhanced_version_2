import { useEffect, useState } from 'react';
import { X, ArrowRight, MessageCircle, Search, Phone } from 'lucide-react';
import { AppFeatureId, ScreenId } from '../data/simplygoData';

interface ChatbotWidgetProps {
  onNavigate: (
    screen: ScreenId,
    options?: {
      appFeature?: AppFeatureId;
      cardTab?: 'ezlink' | 'charms' | 'concession' | 'motoring';
    }
  ) => void;
}

interface QuickTopic {
  id: string;
  question: string;
  keywords: string;
  answer: string;
  actionLabel: string;
  targetScreen: ScreenId;
  cardTab?: 'ezlink' | 'charms' | 'concession' | 'motoring';
  appFeature?: AppFeatureId;
}

const QUICK_TOPICS: QuickTopic[] = [
  {
    id: 'difference',
    question: 'Difference between EZ-Link Cards, Charms & Concession Cards',
    keywords: 'difference ez-link charm concession compare type',
    answer:
      'EZ-Link cards are standard stored-value cards anyone can buy off the shelf. EZ-Link Charms are wearable tap-and-go accessories (sold empty—top up before riding). Concession Cards are personalised photo cards for eligible students, seniors, children, PWD, and monthly pass holders to enjoy subsidised fares.',
    actionLabel: 'Compare Cards & Charms',
    targetScreen: 'cards',
    cardTab: 'ezlink',
  },
  {
    id: 'latest-charms',
    question: 'Where to buy the latest EZ-Link Charms',
    keywords: 'buy charm minions mahjong led shopee lazada ticket office',
    answer:
      'The Minions Mahjong LED SimplyGo EZ-Link Charm ($24.90) is available on Shopee, Lazada, TikTok Shop, and selected SimplyGo Ticket Offices (Raffles Place, Dhoby Ghaut, Serangoon NEX).',
    actionLabel: 'View Latest Charms',
    targetScreen: 'cards',
    cardTab: 'charms',
  },
  {
    id: 'fares',
    question: 'How to check MRT & bus distance fares',
    keywords: 'fare price cost mrt bus calculator discount pre-peak',
    answer:
      'Use our Distance-Based Fare Calculator with real MRT route presets to estimate fares by commuter category (Adult, Student, Senior, PWD, or Workfare), including pre-7:45 AM rail discounts.',
    actionLabel: 'Open Fare Calculator',
    targetScreen: 'services',
  },
  {
    id: 'claims',
    question: 'Report a missed tap-out or check card balance',
    keywords: 'missed tap out claim refund balance overcharge history',
    answer:
      'Link your SimplyGo EZ-Link or contactless bank card in the SimplyGo App to view real-time trip history, top up remotely, or submit travel claims.',
    actionLabel: 'Open Travel Claims',
    targetScreen: 'app',
    appFeature: 'claims',
  },
  {
    id: 'lost-card',
    question: 'What to do if I lose my SimplyGo or Concession card',
    keywords: 'lost stolen block card replace balance recovery',
    answer:
      'Block your registered SimplyGo EZ-Link or Concession card immediately in the SimplyGo App to protect your remaining balance, then request a replacement card online or at a Ticketing Service Centre.',
    actionLabel: 'Check Concession Services',
    targetScreen: 'app',
    appFeature: 'concession',
  },
];

export function ChatbotWidget({ onNavigate }: ChatbotWidgetProps) {
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<QuickTopic>(QUICK_TOPICS[0]);
  const [filterText, setFilterText] = useState('');
  const [iconFailed, setIconFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const query = filterText.trim().toLowerCase();
  const matchingTopics = query
    ? QUICK_TOPICS.filter(
        (t) =>
          t.question.toLowerCase().includes(query) ||
          t.keywords.toLowerCase().includes(query) ||
          t.answer.toLowerCase().includes(query)
      )
    : QUICK_TOPICS;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          className="w-[340px] sm:w-[380px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
          role="dialog"
          aria-label="Ask Addy Commuter Help"
        >
          <div className="bg-[#3f84c5] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {!iconFailed ? (
                <img
                  src="https://simplygo.com.sg/images/chatbot-circle%20icon%20v3.png"
                  alt="Ask Addy"
                  referrerPolicy="no-referrer"
                  onError={() => setIconFailed(true)}
                  className="w-8 h-8 rounded-full bg-white object-contain"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              )}
              <div>
                <h3 className="text-sm font-bold leading-tight">Ask Addy</h3>
                <p className="text-xs text-white/90">SimplyGo Commuter Help</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
              aria-label="Close Ask Addy help (Escape)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 max-h-[450px] overflow-y-auto">
            {/* Search filter inside Help */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Filter help topics (e.g. lost, charm, fare)..."
                className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#316aa1]"
                aria-label="Filter help topics"
              />
            </div>

            {matchingTopics.length === 0 ? (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <p className="font-semibold">
                  No help topic matched "{filterText}".
                </p>
                <p>
                  Try clearing your filter or call our Contact Centre at{' '}
                  <span className="font-bold tabular-nums">1800-2255-663</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setFilterText('')}
                  className="px-2.5 py-1 bg-white border border-amber-300 rounded-md font-semibold cursor-pointer"
                >
                  Show All Topics
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                {matchingTopics.map((topic) => {
                  const active = selectedTopic.id === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => setSelectedTopic(topic)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        active
                          ? 'bg-[#ebf2f9] border-[#316aa1] text-[#316aa1]'
                          : 'bg-slate-50 border-slate-200 text-[#142333] hover:bg-slate-100'
                      }`}
                    >
                      {topic.question}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="p-3.5 rounded-xl bg-[#ebf2f9]/65 border border-slate-200 space-y-2.5">
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedTopic.answer}
              </p>
              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onNavigate(selectedTopic.targetScreen, {
                      cardTab: selectedTopic.cardTab,
                      appFeature: selectedTopic.appFeature,
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#316aa1] hover:bg-[#255582] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  <span>{selectedTopic.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onNavigate('locations');
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-[#316aa1] cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  <span>Contact Us</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Icon Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#316aa1] bg-[#3f84c5] flex items-center justify-center overflow-hidden cursor-pointer border-2 border-white"
        aria-label={open ? 'Close Ask Addy chatbot' : 'Open Ask Addy chatbot'}
        aria-expanded={open}
      >
        {!iconFailed ? (
          <img
            src="https://simplygo.com.sg/images/chatbot-circle%20icon%20v3.png"
            alt="Ask Addy Chatbot"
            referrerPolicy="no-referrer"
            onError={() => setIconFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </button>
    </div>
  );
}
