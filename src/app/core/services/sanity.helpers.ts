import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

/**
 * Helper to build image URLs from Sanity image references
 * Note: Requires @sanity/image-url package. Install with: npm install @sanity/image-url
 * 
 * After installation, uncomment the following:
 * import imageUrlBuilder from '@sanity/image-url';
 * return imageUrlBuilder(client);
 */
export function getImageBuilder(client: SanityClient) {
    return imageUrlBuilder(client);
}

/**
 * Get optimized image URL from Sanity image reference
 * Note: Requires @sanity/image-url package. Install with: npm install @sanity/image-url
 * 
 * After installation, uncomment the implementation below
 */
export function getImageUrl(
    client: SanityClient,
    source: any,
    width?: number,
    height?: number
): string {
    const builder = getImageBuilder(client).image(source);
    if (width) builder.width(width);
    if (height) builder.height(height);
    return builder.auto('format').quality(80).url();
}

/**
 * Get case study slug for the given locale (localized slug format only)
 */
export function getCaseStudySlug(
    slug: { en?: { current: string }; de?: { current: string }; fr?: { current: string }; it?: { current: string } } | undefined,
    locale: string,
    fallbackLocale = 'de'
): string {
    if (!slug) return '';
    const localized = (slug as Record<string, { current?: string } | undefined>)[locale]?.current
        ?? (slug as Record<string, { current?: string } | undefined>)[fallbackLocale]?.current;
    return localized ?? '';
}

/**
 * Get localized text value based on current locale with fallback
 */
export function getLocalizedValue<T>(
    localizedObj: Record<string, T> | undefined,
    locale: string,
    fallbackLocale = 'en'
): T | undefined {
    if (!localizedObj) return undefined;
    // If the stored value is a plain string (not a localized object), return it as-is
    if (typeof localizedObj === 'string') return localizedObj as unknown as T;
    // If the stored value is an object with language keys, pick the requested locale or fallback
    try {
        return (localizedObj as Record<string, T>)[locale] ?? (localizedObj as Record<string, T>)[fallbackLocale] ?? undefined;
    } catch (err) {
        return undefined;
    }
}

/**
 * Common GROQ queries for fetching content
 */
export const SanityQueries = {
    // Singleton pages
    HOME_PAGE: `*[_type == "homePage"][0] {
        ...,
        partners[]-> {
            _id,
            name,
            logo {
                ...,
                asset->
            },
            website
        },
        serviceCards[] {
            title,
            description,
            link,
            linkText
        },
        featuredCaseStudy-> {
            _id,
            _type,
            title,
            slug,
            client,
            industry,
            excerpt,
            results[]
        },
        testimonials[]-> {
            _id,
            clientName,
            clientRole,
            quote,
            photo {
                ...,
                asset->
            }
        }
    }`,
    ABOUT_PAGE: `*[_type == "aboutPage"][0]`,
    PRODUCT_PAGE: `*[_type == "productPage"][0] {
        ...,
        meetingAnalysis {
            ...,
            participants[] {
                name,
                avatar {
                    ...,
                    asset->
                }
            },
            liaIcon {
                ...,
                asset->
            },
            hangUpIcon {
                ...,
                asset->
            },
            videoIcon {
                ...,
                asset->
            }
        }
    }`,
    CONTACT_PAGE: `*[_type == "contactPage"][0]`,
    CAREERS_PAGE: `*[_type == "careersPage"][0]`,
    SITE_SETTINGS: `*[_type == "siteSettings"][0]`,

    // Collections
    ALL_CASE_STUDIES: `*[_type == "caseStudy"] | order(publishedAt desc)`,
    FEATURED_CASE_STUDIES: `*[_type == "caseStudy" && featured == true] | order(publishedAt desc)`,
    CASE_STUDY_BY_SLUG: (slug: string) => `*[_type == "caseStudy" && (
        slug.en.current == "${slug}" ||
        slug.de.current == "${slug}" ||
        slug.fr.current == "${slug}" ||
        slug.it.current == "${slug}"
    )][0] {
        ...,
        coverImage {
            ...,
            asset->
        },
        situationGoals[] {
            ...
        },
        actionItems[] {
            ...
        },
        detailTestimonials[] {
            ...,
            photo {
                ...,
                asset->
            }
        },
        resultItems[] {
            ...
        }
    }`,

    ALL_TESTIMONIALS: `*[_type == "testimonial"] | order(order asc) {
        ...,
        photo {
            ...,
            asset->
        }
    }`,
    FEATURED_TESTIMONIALS: `*[_type == "testimonial" && featured == true] | order(order asc) {
        ...,
        photo {
            ...,
            asset->
        }
    }`,

    ALL_TEAM_MEMBERS: `*[_type == "teamMember"] | order(order asc)`,

    ACTIVE_CAREERS: `*[_type == "career" && active == true] | order(publishedAt desc)`,
    LEGAL_PAGE: (pageType: 'privacy' | 'terms') => `*[_type == "legalPage" && pageType == "${pageType}"][0]`,
};

/**
 * Type guard to check if a value exists
 */
export function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
}

/**
 * Format date string to locale-specific format
 */
export function formatDate(dateString: string, locale: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
