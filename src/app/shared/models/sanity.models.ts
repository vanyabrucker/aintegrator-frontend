// Sanity Base Types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface LocalizedText {
  en?: string;
  de?: string;
  fr?: string;
  it?: string;
}

export interface LocalizedRichText {
  en?: any[];
  de?: any[];
  fr?: any[];
  it?: any[];
}

export interface LocalizedShortText {
  en?: string;
  de?: string;
  fr?: string;
  it?: string;
}

export interface TranscriptEntry {
  initial?: string;
  name?: LocalizedShortText;
  time?: string;
  text?: LocalizedText;
}

export interface ProductInfoBanner {
  highlightText?: LocalizedShortText;
  bodyText?: LocalizedShortText;
}

export interface MeetingAnalysisSection {
  title?: LocalizedShortText;
  subtitle?: LocalizedShortText;
  participants?: Array<{ name?: string }>;
  transcriptEntries?: TranscriptEntry[];
}

export interface MeetingTranscriptionSection {
  title?: LocalizedShortText;
  description?: LocalizedText;
  transcriptEntries?: TranscriptEntry[];
}

export interface MeetingSummarySection {
  title?: LocalizedShortText;
  description?: LocalizedText;
  descriptionHighlight?: LocalizedText;
  uploadButtonLabel?: string;
  recordButtonLabel?: string;
  summaryTabLabel?: string;
  transcriptTabLabel?: string;
  summaryTitle?: string;
  summaryText?: LocalizedText;
  discussionTitle?: string;
  discussionPoints?: Array<{
    title?: LocalizedShortText;
    description?: LocalizedText;
  }>;
}

export interface IntegrationsSection {
  title?: LocalizedShortText;
  description?: LocalizedText;
  calendarDayLabel?: string;
  calendarDayNumber?: string;
  meetingTitle?: string;
  timeRange?: string;
  durationLabel?: string;
  participants?: string[];
  cards?: Array<{ title?: string; badge?: string }>
}

export interface AgenticActionsSection {
  badgeLabel?: string;
  title?: LocalizedShortText;
  description?: LocalizedText;
  mobileCards?: Array<{ title?: string; description?: string }>;
  actionItemsTitle?: string;
  actionItems?: Array<{ text?: string; date?: string }>;
}

export interface LiaChatSection {
  title?: string;
  subtitle?: LocalizedShortText;
  promptMobile?: string;
  promptDesktop?: string;
  inputPlaceholder?: string;
  quickActions?: string[];
}

export interface BoltsSection {
  title?: LocalizedShortText;
  description?: LocalizedText;
  formTitleDesktop?: string;
  formTitleMobile?: string;
  nameLabel?: string;
  namePlaceholderDesktop?: string;
  namePlaceholderMobile?: string;
  promptLabelDesktop?: string;
  promptLabelMobile?: string;
  promptPlaceholderDesktop?: string;
  promptPlaceholderMobile?: string;
  submitLabel?: string;
  carouselItems?: string[];
}

export interface SecurityGridSection {
  cards?: Array<{
    title?: string;
    description?: LocalizedText;
  }>;
  footerCardTitle?: string;
  footerCardDescription?: LocalizedText;
  badgeLabels?: string[];
}

export interface PricingGridSection {
  title?: LocalizedShortText;
  plans?: Array<{
    namePrefix?: string;
    nameSuffix?: string;
    description?: LocalizedShortText;
    price?: string;
    period?: string;
    ctaLabel?: string;
    highlightLabel?: string;
    features?: Array<{ text?: LocalizedShortText }>;
  }>;
}

export interface FinalCtaSection {
  title?: LocalizedShortText;
  description?: LocalizedText;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  mobilePrimaryBtnText?: string;
}

// Partner/Brand
export interface Partner {
  _id: string;
  _type: 'partner';
  name: string;
  logo?: SanityImage;
  website?: string;
  description?: LocalizedText;
  order?: number;
}

// Case Study
export interface CaseStudy {
  _id: string;
  _type: 'caseStudy';
  title: LocalizedText;
  slug: { current: string };
  excerpt?: LocalizedText;
  coverImage?: SanityImage;
  client?: string;
  industry?: LocalizedText;
  challenge?: LocalizedText;
  solution?: LocalizedText;
  results?: Array<{
    _key: string;
    value: string;
    label: LocalizedText;
  }>;
  content?: LocalizedRichText;
  publishedAt?: string;
  featured?: boolean;
}

// Testimonial
export interface Testimonial {
  _id: string;
  _type: 'testimonial';
  clientName: string;
  clientRole?: LocalizedText;
  company?: string;
  quote: LocalizedText;
  photo?: SanityImage;
  rating?: number;
  featured?: boolean;
  order?: number;
}

// Home Page
export interface HomePage {
  _id: string;
  _type: 'homePage';
  heroTitle?: LocalizedText;
  heroDescription?: LocalizedText;
  heroShowButton?: boolean;
  heroButtonLabel?: LocalizedText;
  ctaCardTitle?: LocalizedText;
  ctaCardDescription?: LocalizedText;
  ctaCardLinkText?: LocalizedText;
  ctaCardLinkUrl?: string;
  partners?: Partner[];
  testimonials?: Testimonial[];
  featuredCaseStudy?: CaseStudy;
  fallbackTestimonialQuote?: LocalizedText;
  fallbackTestimonialAuthor?: string;
  fallbackTestimonialRole?: LocalizedText;
  processStepsTitle?: LocalizedText;
  processSteps?: Array<{
    number: string;
    title: LocalizedText;
    description: LocalizedText;
    active?: boolean;
  }>;
  securityCardTitle?: LocalizedText;
  securityCardDescription?: LocalizedText;
  finalCtaTitle?: LocalizedText;
  finalCtaDescription?: LocalizedText;
  finalCtaPrimaryBtnText?: LocalizedText;
  finalCtaPrimaryBtnLink?: string;
  finalCtaSecondaryBtnText?: LocalizedText;
  finalCtaSecondaryBtnLink?: string;
}

// About Page
export interface AboutPage {
  _id: string;
  _type: 'aboutPage';
  heroTitle?: LocalizedText;
  heroDescription?: LocalizedText;
  heroShowButton?: boolean;
  heroButtonLabel?: LocalizedText;
  missionTitle?: LocalizedText;
  missionText?: LocalizedText;
  visionTitle?: LocalizedText;
  visionText?: LocalizedText;
  values?: Array<{
    title: LocalizedText;
    description: LocalizedText;
    icon?: string;
  }>;
  teamSectionTitle?: LocalizedText;
  finalCtaTitle?: LocalizedText;
  finalCtaDescription?: LocalizedText;
  finalCtaPrimaryBtnText?: LocalizedText;
  finalCtaPrimaryBtnLink?: string;
  finalCtaSecondaryBtnText?: LocalizedText;
  finalCtaSecondaryBtnLink?: string;
}

// Careers Page
export interface CareersPage {
  _id: string;
  _type: 'careersPage';
  heroTitle?: LocalizedText;
  heroDescription?: LocalizedText;
  values?: Array<{
    title: LocalizedText;
    description: LocalizedText;
  }>;
  openRolesTitle?: LocalizedText;
  departmentFilterLabel?: LocalizedText;
  locationFilterLabel?: LocalizedText;
  applyButtonLabel?: LocalizedText;
  initiativeCTATitle?: LocalizedText;
  initiativeCTADescription?: LocalizedText;
  initiativeEmail?: string;
  initiativeText?: LocalizedText;
  noRolesText?: LocalizedText;
}

// Product Page
export interface ProductPage {
  _id: string;
  _type: 'productPage';
  heroTitle?: LocalizedText;
  heroDescription?: LocalizedText;
  heroShowButton?: boolean;
  heroButtonLabel?: LocalizedText;
  infoBanner?: ProductInfoBanner;
  meetingAnalysis?: MeetingAnalysisSection;
  meetingTranscription?: MeetingTranscriptionSection;
  meetingSummary?: MeetingSummarySection;
  integrations?: IntegrationsSection;
  agenticActions?: AgenticActionsSection;
  liaChat?: LiaChatSection;
  bolts?: BoltsSection;
  securityGrid?: SecurityGridSection;
  pricingGrid?: PricingGridSection;
  finalCta?: FinalCtaSection;
  features?: Array<{
    title: LocalizedText;
    description: LocalizedText;
    icon?: string;
    image?: SanityImage;
  }>;
  pricing?: {
    title: LocalizedText;
    description: LocalizedText;
  };
  benefits?: Array<{
    title: LocalizedText;
    description: LocalizedText;
  }>;
}

// Team Member
export interface TeamMember {
  _id: string;
  _type: 'teamMember';
  name: string;
  role?: LocalizedText;
  bio?: LocalizedText;
  photo?: SanityImage;
  linkedin?: string;
  twitter?: string;
  order?: number;
}

// Career
export interface Career {
  _id: string;
  _type: 'career';
  title: LocalizedText;
  slug: { current: string };
  department?: LocalizedText;
  location?: LocalizedText;
  type?: string;
  description?: LocalizedRichText;
  requirements?: LocalizedText;
  responsibilities?: LocalizedText;
  benefits?: LocalizedText;
  active?: boolean;
  publishedAt?: string;
}

// Contact Page
export interface ContactPage {
  _id: string;
  _type: 'contactPage';
  heroTitle?: LocalizedText;
  heroDescription?: LocalizedText;
  officeTitle?: LocalizedText;
  officeAddress?: LocalizedText;
  email?: string;
  phone?: string;
  formTitle?: LocalizedText;
  formDescription?: LocalizedText;
}

// Site Settings
export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  footerCompanyTitle?: LocalizedShortText;
  footerCompanyLinks?: Array<{ label?: LocalizedShortText; url?: string }>;
  footerProductsTitle?: LocalizedShortText;
  footerProductsLinks?: Array<{ label?: LocalizedShortText; url?: string }>;
  footerSocialTitle?: LocalizedShortText;
  footerSocialLinks?: Array<{ label?: string; url?: string }>;
  footerMembershipLabel?: LocalizedShortText;
  footerLegalLinks?: Array<{ label?: LocalizedShortText; url?: string }>;
  footerCopyright?: LocalizedShortText;
}

// Legal Page
export interface LegalPage {
  _id: string;
  _type: 'legalPage';
  pageType: 'privacy' | 'terms';
  title: LocalizedText;
  lastUpdated: string;
  content: LocalizedRichText;
}
