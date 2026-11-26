import { useState } from 'react';
import {
  AppFeatureId,
  AssistanceCategory,
  INITIAL_ACCOUNTS,
  ScreenId,
  TransitCardAccount,
} from './data/simplygoData';
import { Header } from './components/Header';
import { HomeScreen } from './components/HomeScreen';
import { AppScreensView } from './components/AppScreensView';
import { TravelCardsView } from './components/TravelCardsView';
import { OnlineServicesView } from './components/OnlineServicesView';
import { LocationsView } from './components/LocationsView';
import { ChatbotWidget } from './components/ChatbotWidget';
import { Footer } from './components/Footer';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [selectedAppFeature, setSelectedAppFeature] =
    useState<AppFeatureId>('transactions');
  const [selectedCardTab, setSelectedCardTab] = useState<
    'ezlink' | 'charms' | 'concession' | 'motoring'
  >('ezlink');
  const [selectedAssistance, setSelectedAssistance] =
    useState<AssistanceCategory>('all');
  const [accounts, setAccounts] =
    useState<TransitCardAccount[]>(INITIAL_ACCOUNTS);

  const navigate = (
    screen: ScreenId,
    options?: {
      appFeature?: AppFeatureId;
      cardTab?: 'ezlink' | 'charms' | 'concession' | 'motoring';
      assistanceCategory?: AssistanceCategory;
    }
  ) => {
    if (options?.appFeature) setSelectedAppFeature(options.appFeature);
    if (options?.cardTab) setSelectedCardTab(options.cardTab);
    if (options?.assistanceCategory) {
      setSelectedAssistance(options.assistanceCategory);
    } else if (screen === 'locations') {
      setSelectedAssistance('all');
    }
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTopUpCard = (cardId: string, amount: number) => {
    setAccounts((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, balance: Number((card.balance + amount).toFixed(2)) }
          : card
      )
    );
  };

  const handleUpdateAutoTopUp = (
    cardId: string,
    enabled: boolean,
    threshold: number,
    amount: number
  ) => {
    setAccounts((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              autoTopUpEnabled: enabled,
              autoTopUpThreshold: threshold,
              autoTopUpAmount: amount,
            }
          : card
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#142333]">
      <Header
        activeScreen={activeScreen}
        onNavigate={(screen) => navigate(screen)}
      />

      <main className="flex-1">
        {activeScreen === 'home' && <HomeScreen onNavigate={navigate} />}

        {activeScreen === 'cards' && (
          <TravelCardsView
            key={selectedCardTab}
            initialTab={selectedCardTab}
            onNavigate={(screen) => navigate(screen)}
          />
        )}

        {activeScreen === 'app' && (
          <AppScreensView
            selectedFeature={selectedAppFeature}
            onSelectFeature={setSelectedAppFeature}
            accounts={accounts}
            onUpdateAutoTopUp={handleUpdateAutoTopUp}
            onTopUpCard={handleTopUpCard}
            onNavigate={(screen) => navigate(screen)}
          />
        )}

        {activeScreen === 'services' && (
          <OnlineServicesView
            onNavigate={(screen, feature) =>
              navigate(screen, feature ? { appFeature: feature } : undefined)
            }
          />
        )}

        {activeScreen === 'locations' && (
          <LocationsView
            key={selectedAssistance}
            initialCategory={selectedAssistance}
            onNavigate={(screen) => navigate(screen)}
          />
        )}
      </main>

      <Footer onNavigate={(screen) => navigate(screen)} />

      <ChatbotWidget onNavigate={navigate} />
    </div>
  );
}
