export const environment = {
    production: true,
    apiBaseUrl: 'https://api.yourdomain.com/api',
    sanity: {
        projectId: '4hvlh78z',
        dataset: 'production',
        apiVersion: '2024-01-01',
        useCdn: true,
    },
    defaultLocale: 'de', // German is the primary language
    supportedLocales: ['en', 'de', 'fr', 'it'] as const,
};
