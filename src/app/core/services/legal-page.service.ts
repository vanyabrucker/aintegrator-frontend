import { Injectable, signal } from '@angular/core';
import { SanityService } from './sanity.service';
import { SanityQueries } from './sanity.helpers';
import { getLocalized } from '../utils/localization';
import type { LegalPage } from '../../shared/models/sanity.models';
import { toHTML } from '@portabletext/to-html';

@Injectable({
    providedIn: 'root',
})
export class LegalPageService {
    private privacyPage = signal<LegalPage | null>(null);
    private termsPage = signal<LegalPage | null>(null);
    private loaded = signal<Record<string, boolean>>({ privacy: false, terms: false });

    constructor(private sanityService: SanityService) {
        this.loadPrivacy();
        this.loadTerms();
    }

    private async loadPrivacy() {
        try {
            const page = await this.sanityService.fetch<LegalPage>(
                SanityQueries.LEGAL_PAGE('privacy')
            );
            this.privacyPage.set(page);
        } catch (error) {
            console.error('Error loading privacy page:', error);
        } finally {
            this.loaded.update((v) => ({ ...v, privacy: true }));
        }
    }

    private async loadTerms() {
        try {
            const page = await this.sanityService.fetch<LegalPage>(
                SanityQueries.LEGAL_PAGE('terms')
            );
            this.termsPage.set(page);
        } catch (error) {
            console.error('Error loading terms page:', error);
        } finally {
            this.loaded.update((v) => ({ ...v, terms: true }));
        }
    }

    getPrivacyPage(): LegalPage | null {
        return this.privacyPage();
    }

    getTermsPage(): LegalPage | null {
        return this.termsPage();
    }

    getTitle(page: LegalPage | null, lang: string): string {
        if (!page?.title) return '';
        return getLocalized(page.title as Record<string, string>, lang, ['de', 'en']) ?? '';
    }

    getMetaDescription(page: LegalPage | null, lang: string): string | undefined {
        if (!page?.metaDescription) return undefined;
        return getLocalized(page.metaDescription as Record<string, string>, lang, ['de', 'en']) ?? undefined;
    }

    getContentHtml(page: LegalPage | null, lang: string): string {
        if (!page?.content) return '';
        const content = page.content as Record<string, unknown[]>;
        const blocks = content[lang] ?? content['de'] ?? content['en'] ?? [];
        if (!Array.isArray(blocks) || blocks.length === 0) return '';
        try {
            return toHTML(blocks as never);
        } catch {
            return '';
        }
    }

    getLastUpdated(page: LegalPage | null): string | null {
        return page?.lastUpdated ?? null;
    }

    isLoaded(pageType: 'privacy' | 'terms'): boolean {
        return this.loaded()[pageType] ?? false;
    }
}
