export const environment = {
    production: true,
    apiBaseUrl: 'https://your-api-domain.com/api', // Update with your production API URL
    sanity: {
        projectId: '4hvlh78z',
        dataset: 'production',
        apiVersion: '2025-01-01',
        useCdn: true, // Use CDN in production for better performance
        perspective: 'published', // Only fetch published documents
    },
    defaultLocale: 'en',
    supportedLocales: ['en', 'de', 'fr', 'it'] as const,
};
