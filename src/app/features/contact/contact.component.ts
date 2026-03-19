import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContactHeroComponent } from './components/contact-hero/contact-hero.component';
import { ContactCardsComponent } from './components/contact-cards/contact-cards.component';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { PageMetaService } from '../../core/services/page-meta.service';
import { ContactPage } from '../../shared/models/sanity.models';
import { getLocalized } from '../../core/utils/localization';
import { SanityQueries } from '../../core/services/sanity.helpers';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, RouterModule, ContactHeroComponent, ContactCardsComponent],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
    contactData = signal<ContactPage | null>(null);

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService,
        private pageMeta: PageMetaService
    ) {
        effect(() => {
            this.localeService.currentLocale();
            this.updatePageMeta(this.contactData());
        });
    }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            const contactData = await this.sanityService.fetch<ContactPage>(SanityQueries.CONTACT_PAGE);
            this.contactData.set(contactData);
        } catch (error) {
            console.error('Error loading contact page content:', error);
        }
    }

    private updatePageMeta(data: ContactPage | null) {
        if (!data) return;
        const locale = this.localeService.currentLocale();
        const title = getLocalized((data.metaTitle ?? data.heroTitle) as Record<string, string> | undefined, locale, ['en', 'de']);
        const description = getLocalized(data.metaDescription as Record<string, string> | undefined, locale, ['en', 'de']);
        if (title) this.pageMeta.setPageMeta(title, description ?? undefined);
    }
}
