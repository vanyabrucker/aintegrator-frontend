import { Injectable, signal } from '@angular/core';
import { SanityService } from './sanity.service';
import { SanityQueries } from './sanity.helpers';
import { getLocalized } from '../utils/localization';

export interface FinalCTASettings {
    title: Record<string, string>;
    description: Record<string, string>;
    primaryBtnText: Record<string, string>;
}

export interface SiteSettings {
    _id: string;
    _type: string;
    finalCTA?: FinalCTASettings;
}

@Injectable({
    providedIn: 'root',
})
export class SiteSettingsService {
    private siteSettings = signal<SiteSettings | null>(null);
    private isLoaded = signal(false);

    constructor(private sanityService: SanityService) {
        this.loadSettings();
    }

    getFinalCTAForLang(lang: string, fallbacks: string[] = ['en', 'de']) {
        const cta = this.getFinalCTASettings();
        if (!cta) return undefined;
        return {
            title: getLocalized(cta.title, lang, fallbacks),
            description: getLocalized(cta.description, lang, fallbacks),
            primaryBtnText: getLocalized(cta.primaryBtnText, lang, fallbacks),
        };
    }

    private async loadSettings() {
        try {
            const settings = await this.sanityService.fetch<SiteSettings>(
                SanityQueries.SITE_SETTINGS
            );
            this.siteSettings.set(settings);
            this.isLoaded.set(true);
        } catch (error) {
            console.error('Error loading site settings:', error);
            this.isLoaded.set(true);
        }
    }

    getFinalCTASettings(): FinalCTASettings | undefined {
        return this.siteSettings()?.finalCTA;
    }

    getSettings(): SiteSettings | null {
        return this.siteSettings();
    }

    isSettingsLoaded(): boolean {
        return this.isLoaded();
    }
}
