import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '../../core/services/locale.service';
import { getLocalizedValue } from '../../core/services/sanity.helpers';
import { LocalizedText } from '../models/sanity.models';

/**
 * Pipe to transform LocalizedText objects into localized strings
 * 
 * Usage in templates:
 *   {{ data.title | localizedText }}
 *   {{ data.description | localizedText:'en' }}  // Override locale
 * 
 * This pipe automatically responds to language changes from LocaleService
 * and is more performant and idiomatic than using function calls in templates.
 */
@Pipe({
    name: 'localizedText',
    standalone: true,
    pure: false // Impure to react to locale changes
})
export class LocalizedTextPipe implements PipeTransform {
    private localeService = inject(LocaleService);

    /**
     * Transform LocalizedText object or string into localized text
     * 
     * @param value - LocalizedText object or plain string
     * @param overrideLocale - Optional locale override (defaults to current locale)
     * @param fallbackLocale - Fallback locale if preferred locale not available (defaults to 'de')
     * @returns Localized string
     */
    transform(
        value: LocalizedText | string | null | undefined,
        overrideLocale?: string,
        fallbackLocale: string = 'en'
    ): string {
        if (!value) return '';

        // If it's already a string, return it
        if (typeof value === 'string') return value;

        // Get current locale from service or use override
        const locale = overrideLocale || this.localeService.currentLocale();

        // Use the getLocalizedValue helper for consistent localization logic
        return getLocalizedValue(value as Record<string, string>, locale, fallbackLocale) || '';
    }
}
