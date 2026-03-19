import { Component, ChangeDetectionStrategy, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LegalPageService } from '../../core/services/legal-page.service';
import { LocaleService } from '../../core/services/locale.service';
import { PageMetaService } from '../../core/services/page-meta.service';
import { formatDate } from '../../core/services/sanity.helpers';

@Component({
    selector: 'app-privacy',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './privacy.component.html',
    styleUrl: './privacy.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyComponent {
    private legalPageService = inject(LegalPageService);
    private localeService = inject(LocaleService);
    private sanitizer = inject(DomSanitizer);

    readonly page = computed(() => this.legalPageService.getPrivacyPage());
    readonly title = computed(() =>
        this.legalPageService.getTitle(this.page(), this.localeService.currentLocale())
    );
    readonly contentHtml = computed(() => {
        const html = this.legalPageService.getContentHtml(
            this.page(),
            this.localeService.currentLocale()
        );
        return html ? this.sanitizer.bypassSecurityTrustHtml(html) : null;
    });
    readonly lastUpdated = computed(() => this.legalPageService.getLastUpdated(this.page()));
    readonly lastUpdatedFormatted = computed(() => {
        const date = this.lastUpdated();
        if (!date) return null;
        return formatDate(date, this.localeService.currentLocale());
    });
    readonly isLoaded = computed(() => this.legalPageService.isLoaded('privacy'));

    constructor() {
        const pageMeta = inject(PageMetaService);
        effect(() => {
            const page = this.page();
            const loaded = this.isLoaded();
            if (loaded && page) {
                const locale = this.localeService.currentLocale();
                const title = this.legalPageService.getTitle(page, locale);
                const description = this.legalPageService.getMetaDescription(page, locale);
                if (title) pageMeta.setPageMeta(title, description ?? undefined);
            }
        });
    }
}
