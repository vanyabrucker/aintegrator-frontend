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
  metaTitle?: LocalizedText;
  metaDescription?: LocalizedText;
  title: LocalizedText;
  slug?: {
    current?: string;
    en?: { current: string };
    de?: { current: string };
    fr?: { current: string };
    it?: { current: string };
  };
  excerpt?: LocalizedText;
  coverImage?: SanityImage;
  client?: string;
  industry?: LocalizedText;
  results?: Array<{
    _key: string;
    value: string;
    label: LocalizedText;
  }>;
  executiveSummaryHeading?: LocalizedText;
  executiveSummary?: LocalizedText;
  situationHeading?: LocalizedText;
  situationDescription?: LocalizedText;
  situationGoals?: Array<{
    _key?: string;
    text?: LocalizedText;
    title?: LocalizedText;
    description?: LocalizedText;
  }>;
  actionHeading?: LocalizedText;
  actionDescription?: LocalizedText;
  actionItems?: Array<{
    _key?: string;
    title?: LocalizedText;
    description?: LocalizedText;
  }>;
  detailTestimonials?: Array<{
    _key?: string;
    quote?: LocalizedText;
    author?: string;
    role?: LocalizedText;
    photo?: SanityImage;
  }>;
  resultHeading?: LocalizedText;
  resultDescription?: LocalizedText;
  resultItems?: Array<{
    _key?: string;
    title?: LocalizedText;
    description?: LocalizedText;
  }>;
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
  featured?: boolean;
  order?: number;
}

// Home Page Service Card
export interface HomeServiceCard {
  title?: LocalizedText;
  description?: LocalizedText;
  link?: string;
  linkText?: LocalizedText;
}

// Home Page
export interface HomePage {
  _id: string;
  _type: 'homePage';
  metaTitle?: LocalizedText;
  metaDescription?: LocalizedText;
  heroTitle?: LocalizedText;
  heroDescription?: LocalizedText;
  heroShowButton?: boolean;
  heroButtonLabel?: LocalizedText;
  heroButtonLink?: string;
  partners?: Partner[];
  serviceCards?: HomeServiceCard[];
  testimonials?: Testimonial[];
  featuredCaseStudy?: CaseStudy;
  caseStudyLinkText?: LocalizedText;
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
  metaTitle?: LocalizedText;
  metaDescription?: LocalizedText;
  heroTitle?: LocalizedText;
  missionTitle?: LocalizedText;
  missionText?: LocalizedText;
  valuesTitle?: LocalizedText;
  valuesText?: LocalizedText;
}

// Careers Page
export interface CareersPage {
  _id: string;
  _type: 'careersPage';
  metaTitle?: LocalizedText;
  metaDescription?: LocalizedText;
  heroTitle?: LocalizedText;
  departmentFilterLabel?: LocalizedText;
  locationFilterLabel?: LocalizedText;
  applyButtonLabel?: LocalizedText;
  noRolesText?: LocalizedText;
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
  department?: LocalizedText | string;
  location?: LocalizedText | string;
  applyLink?: string;
  active?: boolean;
  publishedAt?: string;
}

// Contact Page
export interface ContactPage {
  _id: string;
  _type: 'contactPage';
  metaTitle?: LocalizedText;
  metaDescription?: LocalizedText;
  heroTitle?: LocalizedText;
  officeTitle?: LocalizedText;
  officeAddress?: LocalizedText;
  email?: string;
  phone?: string;
}

// Site Settings
export interface SiteSettings {
  _id: string;
  _type: 'siteSettings';
  headerNavLinks?: Array<{ label?: LocalizedShortText; url?: string; external?: boolean }>;
  headerCtaLabel?: LocalizedShortText;
  headerCtaLink?: string;
  footerCompanyTitle?: LocalizedShortText;
  footerCompanyLinks?: Array<{ label?: LocalizedShortText; url?: string }>;
  footerServicesTitle?: LocalizedShortText;
  footerServicesLinks?: Array<{ label?: LocalizedShortText; url?: string }>;
  footerSocialTitle?: LocalizedShortText;
  footerSocialLinks?: Array<{ label?: string; url?: string }>;
  footerMembershipLabel?: LocalizedShortText;
  footerLegalLinks?: Array<{ label?: LocalizedShortText; url?: string }>;
  footerCopyright?: LocalizedShortText;
  finalCTA?: {
    title?: LocalizedShortText;
    description?: LocalizedShortText;
    primaryBtnText?: LocalizedShortText;
    primaryBtnLink?: string;
  };
}

// Legal Page
export interface LegalPage {
  _id: string;
  _type: 'legalPage';
  pageType: 'privacy' | 'terms';
  title: LocalizedText;
  metaDescription?: LocalizedText;
  lastUpdated: string;
  content: LocalizedRichText;
}
