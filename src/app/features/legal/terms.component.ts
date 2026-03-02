import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { LegalPage } from '../../shared/models/sanity.models';
import { SanityQueries } from '../../core/services/sanity.helpers';
import { LocalizedTextPipe } from '../../shared/pipes/localized-text.pipe';

@Component({
    selector: 'app-terms',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './terms.component.html',
    styleUrl: './terms.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit {
    termsData = signal<LegalPage | null>(null);

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService
    ) { }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            const termsData = await this.sanityService.fetch<LegalPage>(
                SanityQueries.LEGAL_PAGE('terms')
            );
            this.termsData.set(termsData);
        } catch (error) {
            console.error('Error loading terms page content:', error);
        }
    }

    getContentBlocks(): any[] {
        const locale = this.localeService.currentLocale();
        const content = this.termsData()?.content;
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
