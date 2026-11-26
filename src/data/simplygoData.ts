export type ScreenId =
  | 'home'
  | 'cards'
  | 'app'
  | 'services'
  | 'locations';

export type AppFeatureId =
  | 'transactions'
  | 'autotopup'
  | 'motoring'
  | 'concession'
  | 'claims'
  | 'myinfo';

export type AssistanceCategory =
  | 'all'
  | 'ticket-office'
  | 'service-centre'
  | 'kiosk'
  | 'contact';

export const SIMPLYGO_ASSETS = {
  logo: 'https://simplygo.com.sg/media/iurly10t/group-500366.png',
  favicon: 'https://simplygo.com.sg/media/u05gvdrm/favicon.png',
  playStore: 'https://simplygo.com.sg/media/sutgyfhw/playstore.png',
  appStore: 'https://simplygo.com.sg/media/kzsjcxgc/appstore.png',
  phoneMockup: 'https://simplygo.com.sg/media/pqkbp20s/homepage-phone-mockup-v3.png',
};

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  desktopImage: string;
  mobileImage: string;
  ctaLabel: string;
  targetScreen: ScreenId;
  accentNote: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'ride-to-rewards',
    title: 'Ride to Rewards with SimplyGo',
    subtitle: 'Earn points on daily bus and MRT commutes and redeem commuter perks directly inside the SimplyGo app.',
    desktopImage: 'https://simplygo.com.sg/media/yshhrj3u/ride-to-rewards_web-banner_desktop-1512-x-630px.jpg',
    mobileImage: 'https://simplygo.com.sg/media/1qjfyvmg/ride-to-rewards_web-banner_mobile-780-x-780px.jpg',
    ctaLabel: 'Explore App Screens',
    targetScreen: 'app',
    accentNote: 'Rewards Programme',
  },
  {
    id: 'ev-charging',
    title: 'EV Charging Now on SimplyGo App',
    subtitle: 'Locate public chargers, start charging sessions, and settle payments seamlessly alongside your motoring account.',
    desktopImage: 'https://simplygo.com.sg/media/suhjvff5/spl26-008r-new-app-feature_ev-charging_web-assets_dekstop_r2_00.jpg',
    mobileImage: 'https://simplygo.com.sg/media/chnp4zem/spl26-008r-new-app-feature_ev-charging_web-assets_mobile_r2_01.jpg',
    ctaLabel: 'View Motoring Screen',
    targetScreen: 'app',
    accentNote: 'New App Feature',
  },
  {
    id: 'whatsapp-channel',
    title: 'Follow SimplyGo Official WhatsApp Channel',
    subtitle: 'Receive timely travel advisories, concession card reminders, and service updates directly on WhatsApp.',
    desktopImage: 'https://simplygo.com.sg/media/ukuidvns/spl26-006f-launch-of-simplygo-whatsapp-channel-collaterals_web-banners_website-carousell-desktop_r1-fa_00.jpg',
    mobileImage: 'https://simplygo.com.sg/media/4vfhuzfi/spl26-006f-launch-of-simplygo-whatsapp-channel-collaterals_web-banners_website-carousell-mobile_r1-fa_00.jpg',
    ctaLabel: 'Check Service Locations',
    targetScreen: 'locations',
    accentNote: 'Commuter Advisories',
  },
  {
    id: 'fare-announcement',
    title: 'Updated Public Transport Fare Guide',
    subtitle: 'Calculate exact distance-based MRT, LRT, and bus fares across Adult and Concession card categories.',
    desktopImage: 'https://simplygo.com.sg/media/nu3fhqjj/web-banners_fre2026-announcement-_simplygo-website-2.png',
    mobileImage: 'https://simplygo.com.sg/media/juycdijb/web-banners_fre2026-announcement-_simplygo-website-780x780.png',
    ctaLabel: 'Open Fare Calculator',
    targetScreen: 'services',
    accentNote: 'Travel Fares',
  },
  {
    id: 'concession-cards',
    title: 'Concession & Monthly Travel Cards',
    subtitle: 'Apply online, convert to SimplyGo Concession, or renew your Monthly Concession Pass in minutes.',
    desktopImage: 'https://simplygo.com.sg/media/2b0luixi/concession-cards_banner_r3_1512x631-opt1_gif.gif',
    mobileImage: 'https://simplygo.com.sg/media/jx0jisho/concession-cards_banner_r3_780x780_gif.gif',
    ctaLabel: 'Compare Travel Cards',
    targetScreen: 'cards',
    accentNote: 'Concession Services',
  },
];

export interface PlatformCard {
  id: string;
  title: string;
  description: string;
  image: string;
  targetScreen: ScreenId;
  subTab?: string;
}

export const PLATFORM_CARDS: PlatformCard[] = [
  {
    id: 'ez-link-cards',
    title: 'EZ-Link & SimplyGo EZ-Link Cards',
    description: 'Tap and ride across buses, trains, and retail points with contactless bank cards or SimplyGo EZ-Link.',
    image: 'https://simplygo.com.sg/media/rekjpvnv/ez-link-blue-card.png',
    targetScreen: 'cards',
    subTab: 'ezlink',
  },
  {
    id: 'concession-travel',
    title: 'Concession & Monthly Travel Cards',
    description: 'Dedicated concessionary fares and unlimited monthly passes for students, seniors, children, and adults.',
    image: 'https://simplygo.com.sg/media/x33lrgvq/concession-monthly_travel_cards.png',
    targetScreen: 'cards',
    subTab: 'concession',
  },
  {
    id: 'ez-link-motoring',
    title: 'EZ-Link Motoring',
    description: 'Post-paid cardless billing for ERP gantries, HDB/URA carparks, and integrated EV charging sessions.',
    image: 'https://simplygo.com.sg/media/dg3phwal/ez-link-motoring.png',
    targetScreen: 'app',
    subTab: 'motoring',
  },
  {
    id: 'online-services',
    title: 'Online Services',
    description: 'Calculate journey fares, check concession application status, submit travel claims, or convert cards.',
    image: 'https://simplygo.com.sg/media/j2xik55g/online-services.png',
    targetScreen: 'services',
  },
];

export interface AppFeatureItem {
  id: AppFeatureId;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  screenImage: string;
  highlights: string[];
}

export const APP_FEATURES: AppFeatureItem[] = [
  {
    id: 'transactions',
    title: 'View Transactions',
    shortTitle: 'Transactions',
    description: 'Check your card balance and view payment transactions across MRT, LRT, and bus journeys in real time.',
    icon: 'https://simplygo.com.sg/media/c4pfbfyi/view-transactions.png',
    screenImage: 'https://simplygo.com.sg/media/2igbdywj/view-transactions2.png',
    highlights: [
      'Real-time fare posting for SimplyGo EZ-Link & bank cards',
      'Detailed tap-in and tap-out station breakdown',
      'Monthly expenditure summary across all linked cards',
    ],
  },
  {
    id: 'autotopup',
    title: 'Auto Top-up',
    shortTitle: 'Auto Top-up',
    description: 'Top up your EZ-Link cards automatically when your balance dips below your chosen threshold.',
    icon: 'https://simplygo.com.sg/media/e12luuge/auto-top-up.png',
    screenImage: 'https://simplygo.com.sg/media/tgplkjin/auto-top-up.png',
    highlights: [
      'Zero convenience fee with supported GIRO & debit/credit cards',
      'Customisable top-up amounts ($30, $40, or $50)',
      'Instant push notifications on every automatic top-up',
    ],
  },
  {
    id: 'motoring',
    title: 'Motoring Service',
    shortTitle: 'Motoring',
    description: 'Pay for your ERP and carpark charges using our post-paid cardless service, plus EV charging support.',
    icon: 'https://simplygo.com.sg/media/4fpj0p54/motoring-service.png',
    screenImage: 'https://simplygo.com.sg/media/gmylr3uz/241105-ezlink-motoring-service-on-simplygo-app.png',
    highlights: [
      'Cardless post-paid billing linked to your IU number',
      'Unified ERP, EPS carpark, and EV charging ledger',
      'No manual CashCard top-ups needed at kiosks',
    ],
  },
  {
    id: 'concession',
    title: 'Concession Card Services',
    shortTitle: 'Concession',
    description: 'Apply or replace Concession cards and purchase Monthly Concession Pass for SimplyGo Concession cards.',
    icon: 'https://simplygo.com.sg/media/riwjlk5a/concession-card-services.png',
    screenImage: 'https://simplygo.com.sg/media/okyjn04v/concession-card-services.png',
    highlights: [
      'Instant Monthly Concession Pass renewal from your phone',
      'Immediate card blocking & balance recovery if lost',
      'Eligibility tracking for Student, Senior, Child, PWD & WTCS',
    ],
  },
  {
    id: 'claims',
    title: 'Travel Claims',
    shortTitle: 'Claims',
    description: 'Submit fare adjustment claims and view claims status directly without visiting a ticket office.',
    icon: 'https://simplygo.com.sg/media/0cdlezdu/travel-claims.png',
    screenImage: 'https://simplygo.com.sg/media/maqmwmvf/travel-claims.png',
    highlights: [
      'Report missed tap-outs or duplicate charges in under 60 seconds',
      'Track claim review progress and refund payout status',
      'Automatic payout back to your registered transit card',
    ],
  },
  {
    id: 'myinfo',
    title: 'MyInfo Verification',
    shortTitle: 'MyInfo',
    description: 'Verification process via Singpass MyInfo ensures that only the rightful owner can access and manage card details, account info, and refund requests.',
    icon: 'https://simplygo.com.sg/media/sf1filvn/keyappfeaturesicon-myinfo.png',
    screenImage: 'https://simplygo.com.sg/media/mpfllbq2/small-singpass-myinfo.png',
    highlights: [
      'One-tap Singpass authentication for concession applications',
      'Protects card replacement and balance refund requests',
      'Auto-fills verified residential and eligibility details',
    ],
  },
];

export type StockStatus = 'available' | 'low' | 'sold-out';

export interface TicketOfficeOption {
  id: string;
  name: string;
  station: string;
  updatedAt: string;
}

export const TICKET_OFFICES: TicketOfficeOption[] = [
  {
    id: 'raffles-place',
    name: 'Raffles Place Ticket Office',
    station: 'Raffles Place MRT (NS26 / EW14)',
    updatedAt: 'Updated 5 mins ago',
  },
  {
    id: 'dhoby-ghaut',
    name: 'Dhoby Ghaut Ticket Office',
    station: 'Dhoby Ghaut MRT (NS24 / NE6 / CC1)',
    updatedAt: 'Updated 8 mins ago',
  },
  {
    id: 'serangoon',
    name: 'Serangoon Ticket Office',
    station: 'Serangoon MRT (NE12 / CC13)',
    updatedAt: 'Updated 12 mins ago',
  },
  {
    id: 'ang-mo-kio',
    name: 'Ang Mo Kio Ticket Office',
    station: 'Ang Mo Kio MRT (NS16)',
    updatedAt: 'Updated 6 mins ago',
  },
  {
    id: 'woodlands',
    name: 'Woodlands Ticket Office',
    station: 'Woodlands MRT (NS9 / TE2)',
    updatedAt: 'Updated 10 mins ago',
  },
];

// Stock status per design ID across each SimplyGo Ticket Office
export const TICKET_OFFICE_STOCK: Record<
  string,
  Record<string, { status: StockStatus; note: string }>
> = {
  'raffles-place': {
    'minions-mahjong-charm': { status: 'low', note: 'Under 10 left at counter' },
    'simplygo-ezlink-series-charm': {
      status: 'sold-out',
      note: 'Restocking next week',
    },
    'simplygo-ezlink-classic': { status: 'available', note: 'In stock at counter' },
    'ezlink-standard-card': { status: 'available', note: 'In stock at counter' },
  },
  'dhoby-ghaut': {
    'minions-mahjong-charm': { status: 'available', note: 'In stock at counter' },
    'simplygo-ezlink-series-charm': {
      status: 'low',
      note: 'Limited pieces left',
    },
    'simplygo-ezlink-classic': { status: 'available', note: 'In stock at counter' },
    'ezlink-standard-card': { status: 'low', note: 'Few cards remaining' },
  },
  serangoon: {
    'minions-mahjong-charm': {
      status: 'sold-out',
      note: 'Sold out at this office',
    },
    'simplygo-ezlink-series-charm': {
      status: 'sold-out',
      note: 'Sold out islandwide',
    },
    'simplygo-ezlink-classic': { status: 'available', note: 'In stock at counter' },
    'ezlink-standard-card': { status: 'available', note: 'In stock at counter' },
  },
  'ang-mo-kio': {
    'minions-mahjong-charm': { status: 'low', note: '4 pieces remaining' },
    'simplygo-ezlink-series-charm': {
      status: 'sold-out',
      note: 'Sold out at this office',
    },
    'simplygo-ezlink-classic': { status: 'available', note: 'In stock at counter' },
    'ezlink-standard-card': { status: 'available', note: 'In stock at counter' },
  },
  woodlands: {
    'minions-mahjong-charm': { status: 'available', note: 'In stock at counter' },
    'simplygo-ezlink-series-charm': {
      status: 'sold-out',
      note: 'Sold out at this office',
    },
    'simplygo-ezlink-classic': { status: 'low', note: 'Low counter stock' },
    'ezlink-standard-card': { status: 'available', note: 'In stock at counter' },
  },
};

export interface CardCharmDesign {
  id: string;
  name: string;
  category: 'charm' | 'ezlink' | 'concession';
  badge: string;
  description: string;
  image: string;
  videoUrl?: string;
  whereToBuy: string;
  priceOrFee: string;
  isNewLaunch?: boolean;
}

export const CARD_CHARM_DESIGNS: CardCharmDesign[] = [
  {
    id: 'minions-mahjong-charm',
    name: 'Minions Mahjong LED SimplyGo EZ-Link Charm',
    category: 'charm',
    badge: 'New Launch · SimplyGo Charm',
    description:
      'Limited-edition LED-lit Mahjong tile wearable charm compatible with the SimplyGo app for remote top-ups and transaction tracking.',
    image: 'https://simplygo.com.sg/media/hy0flez5/new-launches.jpg',
    videoUrl:
      'https://simplygo.com.sg/media/ozspdknu/minions-mahjong-led-simplygo-ez-link-charm.mp4',
    whereToBuy:
      'Shopee, Lazada, TikTok Shop & selected SimplyGo Ticket Offices (Raffles Place, Dhoby Ghaut, Serangoon NEX)',
    priceOrFee: '$24.90 (No stored value)',
    isNewLaunch: true,
  },
  {
    id: 'simplygo-ezlink-series-charm',
    name: 'SimplyGo EZ-Link Collectible Series Card & Charm Set',
    category: 'charm',
    badge: 'Seasonal Edition · Charm',
    description:
      'Past seasonal SimplyGo EZ-Link wearable collectible set with tap-and-pay convenience across MRT, buses, and retail outlets.',
    image: 'https://simplygo.com.sg/media/okjduiwn/ez-link-simplygo-ez-link-card.jpg',
    whereToBuy: 'Selected SimplyGo Ticket Offices & official online marketplaces',
    priceOrFee: '$18.90 (No stored value)',
  },
  {
    id: 'simplygo-ezlink-classic',
    name: 'SimplyGo EZ-Link Card (Blue Wave Edition)',
    category: 'ezlink',
    badge: 'SimplyGo EZ-Link Card',
    description:
      'Signature SimplyGo EZ-Link design supporting instant mobile balance checks, Auto Top-Up, and lost-card balance protection.',
    image: 'https://simplygo.com.sg/media/jofe0acy/simplygo-ez-link-cards.png',
    whereToBuy:
      'SimplyGo Ticket Offices, Ticketing Machines, 7-Eleven & Buzz outlets',
    priceOrFee: '$10.00 ($5 card cost + $5 stored value)',
    isNewLaunch: true,
  },
  {
    id: 'ezlink-standard-card',
    name: 'EZ-Link Card & Retail Acceptance Edition',
    category: 'ezlink',
    badge: 'EZ-Link Card',
    description:
      'Classic stored-value card accepted on MRT, LRT, public buses, and participating retail merchants across Singapore.',
    image: 'https://simplygo.com.sg/media/ugrma2d1/ez-link-cards.png',
    whereToBuy: 'SimplyGo Ticket Offices, convenience stores & vending machines',
    priceOrFee: '$10.00 ($5 card cost + $5 stored value)',
  },
  {
    id: 'adult-monthly-design',
    name: 'Adult Monthly Travel Card',
    category: 'concession',
    badge: 'Adult Concession Design',
    description:
      'Personalised SimplyGo card enabling unlimited monthly bus and train travel passes for Singapore Citizens & PRs.',
    image:
      'https://simplygo.com.sg/media/lijcwpms/profile_adult-monthly-travel-card.png',
    whereToBuy: 'Online via SimplyGo Portal or SimplyGo Ticketing Service Centres',
    priceOrFee: '$128.00 / month pass',
  },
  {
    id: 'passion-silver-design',
    name: 'PAssion Silver Concession Card',
    category: 'concession',
    badge: 'Senior Citizen Design',
    description:
      'Concessionary transit card with senior citizen privileges and PAssion merchant benefits across Singapore.',
    image:
      'https://simplygo.com.sg/media/gj3gllzx/profile_senior-citizen_passion-silver-concession-card.png',
    whereToBuy: 'Community Clubs, SimplyGo Portal & Ticketing Service Centres',
    priceOrFee: 'Fares from $0.69 · $58.00 / mo pass',
  },
  {
    id: 'undergrad-student-design',
    name: 'Undergraduate Student Concession Card',
    category: 'concession',
    badge: 'Student Concession Design',
    description:
      'Dedicated student concession card design for full-time university undergraduates in Singapore.',
    image:
      'https://simplygo.com.sg/media/nfanuv5i/profile_student_undergraduate-concession-card.png',
    whereToBuy: 'Online via SimplyGo Portal with Singpass MyInfo',
    priceOrFee: 'Fares from $0.52 · Hybrid passes available',
  },
  {
    id: 'child-concession-design',
    name: 'Child Concession Card',
    category: 'concession',
    badge: 'Child Concession Design',
    description:
      'Complimentary transit travel card for children aged below 7 (above 0.9m tall) prior to Primary 1.',
    image: 'https://simplygo.com.sg/media/4iuardz5/child.png',
    whereToBuy: 'SimplyGo Ticket Offices & Ticketing Service Centres',
    priceOrFee: 'Free travel for eligible children',
  },
  {
    id: 'pwd-concession-design',
    name: 'Persons with Disabilities Concession Card',
    category: 'concession',
    badge: 'PWD Concession Design',
    description:
      'Inclusive concession card offering capped fares and discounted monthly passes for eligible commuters.',
    image:
      'https://simplygo.com.sg/media/ehzmyotg/profile_persons-with-disabilities.png',
    whereToBuy: 'Online eligibility check via SimplyGo Portal & Service Centres',
    priceOrFee: 'Fares from $0.69 · $58.00 / mo pass',
  },
];

export interface QuickSearchItem {
  id: string;
  label: string;
  category: string;
  keywords: string;
  screen: ScreenId;
  appFeature?: AppFeatureId;
  cardTab?: 'ezlink' | 'charms' | 'concession' | 'motoring';
  assistanceCategory?: AssistanceCategory;
}

export const QUICK_SEARCH_ITEMS: QuickSearchItem[] = [
  {
    id: 'q-latest-charms',
    label: 'Latest EZ-Link Charms (Minions Mahjong LED Charm)',
    category: 'EZ-Link Charms',
    keywords: 'charm minions mahjong led new launch wearable',
    screen: 'cards',
    cardTab: 'charms',
  },
  {
    id: 'q-simplygo-app',
    label: 'What is SimplyGo App & Download (iOS / Android)',
    category: 'SimplyGo App',
    keywords: 'download app ios android google play store features',
    screen: 'app',
    appFeature: 'transactions',
  },
  {
    id: 'q-view-tx',
    label: 'View Card Balance & Trip Transactions',
    category: 'App Feature',
    keywords: 'balance history trips mrt bus transactions',
    screen: 'app',
    appFeature: 'transactions',
  },
  {
    id: 'q-auto-topup',
    label: 'Set Up Auto Top-Up',
    category: 'App Feature',
    keywords: 'auto top up giro credit card threshold',
    screen: 'app',
    appFeature: 'autotopup',
  },
  {
    id: 'q-motoring',
    label: 'EZ-Link Motoring, ERP & EV Charging',
    category: 'Motoring',
    keywords: 'erp carpark ev charging iu obu motoring',
    screen: 'app',
    appFeature: 'motoring',
  },
  {
    id: 'q-travel-claims',
    label: 'Submit a Travel Claim / Missed Tap-Out',
    category: 'e-Services',
    keywords: 'claim refund missed tap out overcharge',
    screen: 'app',
    appFeature: 'claims',
  },
  {
    id: 'q-fare-calc',
    label: 'Calculate Bus & MRT Distance Fares',
    category: 'Online Services',
    keywords: 'fare calculator price distance mrt bus adult student senior',
    screen: 'services',
  },
  {
    id: 'q-concession-status',
    label: 'Check Concession Card Application Status',
    category: 'Online Services',
    keywords: 'status application concession card replacement',
    screen: 'services',
  },
  {
    id: 'q-concession-designs',
    label: 'Concession & Monthly Travel Card Designs',
    category: 'Travel Cards',
    keywords: 'adult student senior passion silver child pwd concession',
    screen: 'cards',
    cardTab: 'concession',
  },
  {
    id: 'q-locations',
    label: 'Find Ticket Offices, Service Centres & Kiosks',
    category: 'Locations',
    keywords: 'ticket office service centre kiosk mrt station contact',
    screen: 'locations',
    assistanceCategory: 'all',
  },
];

export interface AssistanceTile {
  id: string;
  category: AssistanceCategory;
  title: string;
  subtitle: string;
  image: string;
}

export const ASSISTANCE_TILES: AssistanceTile[] = [
  {
    id: 'ticket-offices',
    category: 'ticket-office',
    title: 'SimplyGo Ticket Offices',
    subtitle: 'Full counter assistance for card purchases, top-ups, and enquiries across major MRT interchanges.',
    image: 'https://simplygo.com.sg/media/fjnd5rqv/group-500645.png',
  },
  {
    id: 'service-centres',
    category: 'service-centre',
    title: 'SimplyGo Ticketing Service Centres',
    subtitle: 'Walk-in support for concession card applications, replacements, and special fare verifications.',
    image: 'https://simplygo.com.sg/media/j1rguakf/group-500646.png',
  },
  {
    id: 'self-help-kiosks',
    category: 'kiosk',
    title: 'Self-Help Ticketing Machines',
    subtitle: 'Automated kiosks for instant top-ups, card conversion, and concession pass renewals.',
    image: 'https://simplygo.com.sg/media/ztvnavki/group-500647.png',
  },
  {
    id: 'contact-centre',
    category: 'contact',
    title: 'Contact Centre',
    subtitle: 'Speak with our commuter care specialists via hotline, online enquiry form, or live support.',
    image: 'https://simplygo.com.sg/media/ijcdtpy1/group-500699.png',
  },
];

export interface TransitCardAccount {
  id: string;
  nickname: string;
  cardType: 'SimplyGo EZ-Link' | 'Bank Contactless' | 'Concession Card';
  maskedNumber: string;
  balance: number;
  autoTopUpEnabled: boolean;
  autoTopUpThreshold: number;
  autoTopUpAmount: number;
  status: 'Active' | 'Pass Active';
  passExpiry?: string;
}

export const INITIAL_ACCOUNTS: TransitCardAccount[] = [
  {
    id: 'card-1',
    nickname: 'Daily Commute EZ-Link',
    cardType: 'SimplyGo EZ-Link',
    maskedNumber: '8008 4219 7731 0492',
    balance: 28.45,
    autoTopUpEnabled: true,
    autoTopUpThreshold: 15,
    autoTopUpAmount: 30,
    status: 'Active',
  },
  {
    id: 'card-2',
    nickname: 'DBS Visa PayWave',
    cardType: 'Bank Contactless',
    maskedNumber: '4532 •••• •••• 8914',
    balance: 0,
    autoTopUpEnabled: false,
    autoTopUpThreshold: 0,
    autoTopUpAmount: 0,
    status: 'Active',
  },
  {
    id: 'card-3',
    nickname: 'Adult Monthly Travel Card',
    cardType: 'Concession Card',
    maskedNumber: '1009 5510 3829 6140',
    balance: 14.20,
    autoTopUpEnabled: true,
    autoTopUpThreshold: 10,
    autoTopUpAmount: 20,
    status: 'Pass Active',
    passExpiry: '30 Nov 2026',
  },
];

export interface TripTransaction {
  id: string;
  cardId: string;
  date: string;
  time: string;
  mode: 'MRT' | 'Bus' | 'Top-Up' | 'ERP / Carpark';
  route: string;
  detail: string;
  amount: number;
  status: 'Posted' | 'Pending' | 'Credited';
}

export const SAMPLE_TRANSACTIONS: TripTransaction[] = [
  {
    id: 'tx-101',
    cardId: 'card-1',
    date: '25 Nov 2026',
    time: '08:42',
    mode: 'MRT',
    route: 'Paya Lebar → Raffles Place',
    detail: 'East-West Line · 6.8 km',
    amount: -1.49,
    status: 'Posted',
  },
  {
    id: 'tx-102',
    cardId: 'card-1',
    date: '25 Nov 2026',
    time: '08:19',
    mode: 'Bus',
    route: 'Bus 154 · Bedok North → Paya Lebar',
    detail: 'Transfer Rebate Applied',
    amount: -0.99,
    status: 'Posted',
  },
  {
    id: 'tx-103',
    cardId: 'card-1',
    date: '24 Nov 2026',
    time: '18:31',
    mode: 'MRT',
    route: 'Raffles Place → Bedok',
    detail: 'East-West Line · 11.4 km',
    amount: -1.89,
    status: 'Posted',
  },
  {
    id: 'tx-104',
    cardId: 'card-1',
    date: '23 Nov 2026',
    time: '12:04',
    mode: 'Top-Up',
    route: 'Auto Top-Up (GIRO)',
    detail: 'Triggered below $15.00',
    amount: 30.0,
    status: 'Credited',
  },
  {
    id: 'tx-105',
    cardId: 'card-2',
    date: '25 Nov 2026',
    time: '09:15',
    mode: 'MRT',
    route: 'Orchard → City Hall',
    detail: 'North-South Line · 3.1 km',
    amount: -1.19,
    status: 'Posted',
  },
  {
    id: 'tx-106',
    cardId: 'card-2',
    date: '24 Nov 2026',
    time: '19:45',
    mode: 'Bus',
    route: 'Bus 190 · Dhoby Ghaut → Bukit Panjang',
    detail: 'Trunk Service · 14.2 km',
    amount: -2.04,
    status: 'Posted',
  },
  {
    id: 'tx-107',
    cardId: 'card-3',
    date: '25 Nov 2026',
    time: '07:38',
    mode: 'MRT',
    route: 'Tampines → Bugis',
    detail: 'Covered by Monthly Travel Pass',
    amount: 0.0,
    status: 'Posted',
  },
];

export interface MotoringCharge {
  id: string;
  date: string;
  time: string;
  type: 'ERP' | 'Carpark' | 'EV Charging';
  location: string;
  durationOrGantry: string;
  amount: number;
}

export const MOTORING_CHARGES: MotoringCharge[] = [
  {
    id: 'm-1',
    date: '25 Nov 2026',
    time: '08:55',
    type: 'ERP',
    location: 'ECP (Eastbound) after Fort Rd',
    durationOrGantry: 'Gantry #32',
    amount: 2.0,
  },
  {
    id: 'm-2',
    date: '24 Nov 2026',
    time: '19:12',
    type: 'Carpark',
    location: 'URA Central — Marina One West',
    durationOrGantry: '2h 18m stay',
    amount: 4.8,
  },
  {
    id: 'm-3',
    date: '23 Nov 2026',
    time: '14:40',
    type: 'EV Charging',
    location: 'HDB Hub Toa Payoh · Lot 14B (50kW DC)',
    durationOrGantry: '28.4 kWh delivered',
    amount: 16.47,
  },
];

export interface CardProduct {
  id: string;
  category: 'ezlink' | 'concession' | 'motoring';
  name: string;
  tagline: string;
  eligibility: string;
  keyBenefits: string[];
  monthlyPassPrice?: string;
  fareExample: string;
}

export const CARD_PRODUCTS: CardProduct[] = [
  {
    id: 'simplygo-ezlink',
    category: 'ezlink',
    name: 'SimplyGo EZ-Link Card',
    tagline: 'Upgraded stored-value card with instant mobile balance checks and remote top-ups.',
    eligibility: 'All commuters · Available at Ticket Offices, 7-Eleven, and Buzz outlets',
    keyBenefits: [
      'Check balance & detailed fare history directly on the SimplyGo app',
      'Remote top-up for yourself or family members anytime',
      'Block lost card instantly and recover remaining stored value',
    ],
    fareExample: 'Adult card fares from $1.19 (up to 3.2 km)',
  },
  {
    id: 'bank-contactless',
    category: 'ezlink',
    name: 'Contactless Bank Cards & Mobile Wallets',
    tagline: 'Tap your Mastercard, Visa, Amex, NETS, Apple Pay, or Google Pay straight at the faregate.',
    eligibility: 'Any locally or overseas-issued contactless bank card',
    keyBenefits: [
      'Zero top-ups or minimum stored value required',
      'Track consolidated daily transit charges in the SimplyGo app',
      'Eligible for Adult card-based distance fares and transfer rebates',
    ],
    fareExample: 'Same distance-based Adult card fares as EZ-Link',
  },
  {
    id: 'adult-monthly',
    category: 'concession',
    name: 'Adult Monthly Travel Card',
    tagline: 'Unlimited travel on basic bus services and MRT/LRT trains for heavy daily commuters.',
    eligibility: 'Singapore Citizens & Permanent Residents aged 18 and above',
    keyBenefits: [
      'Unlimited rides across basic bus services and MRT/LRT lines',
      'Instant 30-day pass renewal inside the SimplyGo app',
      'Switch seamlessly between stored-value rides and monthly pass validity',
    ],
    monthlyPassPrice: '$128.00 / month',
    fareExample: 'Break-even from ~38 longer-distance trips per month',
  },
  {
    id: 'student-concession',
    category: 'concession',
    name: 'Student Concession Card',
    tagline: 'Subsidised fares for Primary, Secondary, JC, ITE, Polytechnic, and University students.',
    eligibility: 'Full-time students in MOE schools, ITE, Polytechnics, and Autonomous Universities',
    keyBenefits: [
      'Capped maximum distance fares from $0.52 to $0.76 per trip',
      'Optional Hybrid Monthly Concession Passes (Bus, Train, or Hybrid)',
      'Instant Singpass MyInfo verification for online replacement',
    ],
    monthlyPassPrice: 'From $48.00 / month (Hybrid)',
    fareExample: 'From $0.52 per trip (up to 3.2 km)',
  },
  {
    id: 'senior-concession',
    category: 'concession',
    name: 'Senior Citizen Concession Card',
    tagline: 'Concessionary fares all day across Singapore’s bus and rail network.',
    eligibility: 'Singapore Citizens & Permanent Residents aged 60 years and above',
    keyBenefits: [
      'Reduced fares starting from $0.69 across all hours',
      'Discounted Senior Hybrid Monthly Concession Pass at $58.00/month',
      'Manageable by family caregivers via SimplyGo app card linking',
    ],
    monthlyPassPrice: '$58.00 / month',
    fareExample: 'From $0.69 per trip (capped at $1.07 over 7.2 km)',
  },
  {
    id: 'pwd-wtcs',
    category: 'concession',
    name: 'Persons with Disabilities & Workfare Concession',
    tagline: 'Targeted transport concessions supporting inclusive daily mobility.',
    eligibility: 'Eligible Singapore Citizens certified under PWD or Workfare Transport Concession Scheme',
    keyBenefits: [
      'PWD Concession: capped fares and $58.00/month unlimited Hybrid Pass',
      'WTCS Concession: 15% discount off Adult card fares (from $0.88)',
      'Online eligibility check and Singpass MyInfo card application',
    ],
    monthlyPassPrice: '$58.00 / month (PWD) · $96.00 / month (WTCS)',
    fareExample: 'PWD from $0.69 · WTCS from $0.88',
  },
  {
    id: 'ezlink-motoring',
    category: 'motoring',
    name: 'EZ-Link Motoring Service',
    tagline: 'Post-paid cardless ERP & EPS carpark billing linked directly to your vehicle IU.',
    eligibility: 'Vehicle owners with On-Board Unit (OBU) or In-Vehicle Unit (IU)',
    keyBenefits: [
      'Automatic deduction with zero CashCard top-up queues',
      'Real-time ERP gantry and carpark fee alerts in the SimplyGo app',
      'Downloadable monthly motoring receipts for corporate claims',
    ],
    fareExample: 'Zero monthly subscription fee · Pay per gantry/carpark exit',
  },
  {
    id: 'ev-charging-motoring',
    category: 'motoring',
    name: 'SimplyGo EV Charging Integration',
    tagline: 'Discover available AC & DC public chargers across heartland carparks and pay in-app.',
    eligibility: 'Registered SimplyGo App users with a linked payment method',
    keyBenefits: [
      'Live bay availability across participating EV charging operators',
      'Start and stop charging sessions directly from the SimplyGo Motoring tab',
      'Consolidated motoring + EV charging statements',
    ],
    fareExample: 'From $0.48/kWh (AC) · $0.58/kWh (DC)',
  },
];

export interface ServiceLocation {
  id: string;
  officeId?: string;
  name: string;
  category: Exclude<AssistanceCategory, 'all' | 'contact'>;
  region: 'Central' | 'East' | 'West' | 'North' | 'North-East';
  station: string;
  address: string;
  hours: string;
  services: string[];
}

export const SERVICE_LOCATIONS: ServiceLocation[] = [
  {
    id: 'loc-1',
    officeId: 'raffles-place',
    name: 'Raffles Place SimplyGo Ticket Office',
    category: 'ticket-office',
    region: 'Central',
    station: 'Raffles Place MRT (NS26 / EW14)',
    address: 'Concourse Level, near Exit A, Singapore 048619',
    hours: 'Daily · 10:00 AM – 9:00 PM',
    services: ['Card Purchase', 'Top-Up', 'Concession Renewal', 'Card Conversion'],
  },
  {
    id: 'loc-9',
    officeId: 'dhoby-ghaut',
    name: 'Dhoby Ghaut SimplyGo Ticket Office',
    category: 'ticket-office',
    region: 'Central',
    station: 'Dhoby Ghaut MRT (NS24 / NE6 / CC1)',
    address: '60A Orchard Rd, #B2-06 NEL Concourse, Singapore 238890',
    hours: 'Daily · 10:00 AM – 9:00 PM',
    services: ['Card & Charm Purchase', 'Top-Up', 'Concession Renewal'],
  },
  {
    id: 'loc-10',
    officeId: 'serangoon',
    name: 'Serangoon SimplyGo Ticket Office',
    category: 'ticket-office',
    region: 'North-East',
    station: 'Serangoon MRT (NE12 / CC13)',
    address: '23 Serangoon Central #B2-16 NEX Link, Singapore 556083',
    hours: 'Daily · 10:00 AM – 9:00 PM',
    services: ['Card & Charm Purchase', 'Top-Up', 'Concession Renewal'],
  },
  {
    id: 'loc-2',
    name: 'Somerset SimplyGo Ticketing Service Centre',
    category: 'service-centre',
    region: 'Central',
    station: 'Somerset MRT (NS23)',
    address: 'Concourse Level, 1 Somerset Rd, Singapore 238162',
    hours: 'Daily · 10:00 AM – 6:00 PM (Closed Public Holidays)',
    services: ['Concession Card Replacement', 'On-the-Spot Photo Capture', 'Refunds & Claims', 'PWD / WTCS Verification'],
  },
  {
    id: 'loc-3',
    name: 'Tampines SimplyGo Ticketing Service Centre',
    category: 'service-centre',
    region: 'East',
    station: 'Tampines MRT (EW2 / DT32)',
    address: 'Tampines Bus Interchange Concourse, Singapore 529508',
    hours: 'Daily · 10:00 AM – 6:00 PM',
    services: ['New Concession Application', 'Lost Card Replacement', 'Senior / Student Card Support'],
  },
  {
    id: 'loc-4',
    name: 'Jurong East SimplyGo Ticketing Service Centre',
    category: 'service-centre',
    region: 'West',
    station: 'Jurong East MRT (NS1 / EW24)',
    address: '10 Jurong East St 12, Concourse Level, Singapore 609690',
    hours: 'Daily · 10:00 AM – 6:00 PM',
    services: ['Concession Card Replacement', 'Penalty Fee Settlement', 'Card Conversion'],
  },
  {
    id: 'loc-5',
    officeId: 'ang-mo-kio',
    name: 'Ang Mo Kio SimplyGo Ticket Office',
    category: 'ticket-office',
    region: 'North',
    station: 'Ang Mo Kio MRT (NS16)',
    address: '2450 Ang Mo Kio Ave 8, Concourse Level, Singapore 569811',
    hours: 'Daily · 10:00 AM – 9:00 PM',
    services: ['Card Purchase', 'Top-Up', 'Concession Pass Purchase'],
  },
  {
    id: 'loc-6',
    name: 'Serangoon Self-Help Ticketing Kiosk Bank',
    category: 'kiosk',
    region: 'North-East',
    station: 'Serangoon MRT (NE12 / CC13)',
    address: 'North-East Line Concourse, near Exit C, Singapore 556082',
    hours: 'Daily · 5:30 AM – 12:30 AM',
    services: ['Cash & Cashless Top-Up', 'SimplyGo Card Conversion', 'Monthly Pass Renewal', 'Balance Receipt'],
  },
  {
    id: 'loc-7',
    name: 'HarbourFront Self-Help Ticketing Machine',
    category: 'kiosk',
    region: 'Central',
    station: 'HarbourFront MRT (NE1 / CC29)',
    address: 'Concourse Level, near VivoCity Exit E, Singapore 098585',
    hours: 'Daily · 5:30 AM – 12:30 AM',
    services: ['Top-Up', 'SimplyGo Card Conversion', 'Singapore Tourist Pass Purchase'],
  },
  {
    id: 'loc-8',
    officeId: 'woodlands',
    name: 'Woodlands SimplyGo Ticket Office',
    category: 'ticket-office',
    region: 'North',
    station: 'Woodlands MRT (NS9 / TE2)',
    address: '30 Woodlands Ave 2, Concourse Level, Singapore 738343',
    hours: 'Daily · 10:00 AM – 9:00 PM',
    services: ['Card Purchase', 'Top-Up', 'Concession Renewal'],
  },
];

export const DISTANCE_FARE_BANDS: {
  maxKm: number;
  label: string;
  adult: number;
  seniorPwd: number;
  student: number;
  wtcs: number;
}[] = [
  { maxKm: 3.2, label: 'Up to 3.2 km', adult: 1.19, seniorPwd: 0.69, student: 0.52, wtcs: 0.88 },
  { maxKm: 4.2, label: '3.3 – 4.2 km', adult: 1.29, seniorPwd: 0.76, student: 0.57, wtcs: 0.96 },
  { maxKm: 5.2, label: '4.3 – 5.2 km', adult: 1.39, seniorPwd: 0.84, student: 0.63, wtcs: 1.05 },
  { maxKm: 6.2, label: '5.3 – 6.2 km', adult: 1.49, seniorPwd: 0.92, student: 0.68, wtcs: 1.13 },
  { maxKm: 7.2, label: '6.3 – 7.2 km', adult: 1.58, seniorPwd: 0.99, student: 0.73, wtcs: 1.21 },
  { maxKm: 8.2, label: '7.3 – 8.2 km', adult: 1.65, seniorPwd: 1.07, student: 0.76, wtcs: 1.27 },
  { maxKm: 9.2, label: '8.3 – 9.2 km', adult: 1.72, seniorPwd: 1.07, student: 0.76, wtcs: 1.33 },
  { maxKm: 11.2, label: '9.3 – 11.2 km', adult: 1.80, seniorPwd: 1.07, student: 0.76, wtcs: 1.40 },
  { maxKm: 14.2, label: '11.3 – 14.2 km', adult: 1.94, seniorPwd: 1.07, student: 0.76, wtcs: 1.52 },
  { maxKm: 18.2, label: '14.3 – 18.2 km', adult: 2.08, seniorPwd: 1.07, student: 0.76, wtcs: 1.64 },
  { maxKm: 24.2, label: '18.3 – 24.2 km', adult: 2.22, seniorPwd: 1.07, student: 0.76, wtcs: 1.76 },
  { maxKm: 45, label: 'Over 24.2 km', adult: 2.38, seniorPwd: 1.07, student: 0.76, wtcs: 1.90 },
];
