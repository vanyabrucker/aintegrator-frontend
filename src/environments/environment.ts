export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:3000/api',
    sanity: {
        projectId: '4hvlh78z',
        dataset: 'production',
        apiVersion: '2025-01-01', // Updated to latest version
        useCdn: false, // Always fetch fresh data in development
        perspective: 'published', // Only fetch published documents (not drafts)
    },
    defaultLocale: 'de', // German is the primary language
    supportedLocales: ['en', 'de', 'fr', 'it'] as const,
};
