import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { LegalPage } from '../../shared/models/sanity.models';
import { SanityQueries } from '../../core/services/sanity.helpers';
import { LocalizedTextPipe } from '../../shared/pipes/localized-text.pipe';

@Component({
    selector: 'app-privacy',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './privacy.component.html',
    styleUrl: './privacy.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent implements OnInit {
    privacyData = signal<LegalPage | null>(null);

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService
    ) { }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            const privacyData = await this.sanityService.fetch<LegalPage>(
                SanityQueries.LEGAL_PAGE('privacy')
            );
            this.privacyData.set(privacyData);
        } catch (error) {
            console.error('Error loading privacy page content:', error);
        }
    }

    getContentBlocks(): any[] {
        const locale = this.localeService.currentLocale();
        const content = this.privacyData()?.content;
        if (!content) return [];
        return content[locale as keyof typeof content] || [];
    }

    getBlockText(block: any): string {
        if (!block?.children || !Array.isArray(block.children)) return '';
        const text = block.children.map((child: any) => child.text || '').join('');
        // Remove numbering like "1. ", "2. ", etc. from headings
        if (block.style === 'h2') {
            return text.replace(/^\d+\.\s*/, '');
        }
        return text;
    }

    getLastUpdatedLabel(): string {
        const locale = this.localeService.currentLocale();
        const labels: Record<string, string> = {
            de: 'Zuletzt aktualisiert',
            en: 'Last updated',
            fr: 'Dernière mise à jour',
            it: 'Ultimo aggiornamento'
        };
        return labels[locale] || labels['de'];
    }
}
