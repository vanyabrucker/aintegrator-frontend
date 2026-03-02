import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SanityService } from '../../../core/services/sanity.service';
import { LocaleService } from '../../../core/services/locale.service';
import { SanityQueries, getLocalizedValue } from '../../../core/services/sanity.helpers';
import { SiteSettings } from '../../models/sanity.models';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
    settings = signal<SiteSettings | null>(null);
    currentLocale = signal<string>('de');

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService
    ) {
        this.currentLocale.set(this.localeService.currentLocale());
    }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            const settings = await this.sanityService.fetch<SiteSettings>(SanityQueries.SITE_SETTINGS);
            this.settings.set(settings);
        } catch (error) {
            console.error('Error loading site settings:', error);
        }
    }

    getLocalizedText(localizedText: any): string {
        return getLocalizedValue(localizedText, this.currentLocale(), 'de') || '';
    }
}
