import { Component, ChangeDetectionStrategy, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { LogoCarouselComponent } from './components/logo-carousel/logo-carousel.component';
import { CaseStudyComponent } from './components/case-study/case-study.component';
import { TestimonialSectionComponent } from '../../shared/components/testimonial-section/testimonial-section.component';
import { FinalCtaComponent } from '../../shared/components/final-cta/final-cta.component';
import { LocalizedTextPipe } from '../../shared/pipes/localized-text.pipe';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { PageMetaService } from '../../core/services/page-meta.service';
import { HomePage, Partner } from '../../shared/models/sanity.models';
import { getLocalized } from '../../core/utils/localization';
import { SanityQueries } from '../../core/services/sanity.helpers';
import { getImageUrl } from '../../core/services/sanity.helpers';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HeroComponent,
        LogoCarouselComponent,
        CaseStudyComponent,
        TestimonialSectionComponent,
        FinalCtaComponent,
        LocalizedTextPipe
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    homeData = signal<HomePage | null>(null);
    currentLocale = signal<string>('de');
    partnerLogos = signal<{ src: string; alt: string }[]>([]);

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService,
        private pageMeta: PageMetaService
    ) {
        this.currentLocale.set(this.localeService.currentLocale());
        effect(() => {
            this.currentLocale.set(this.localeService.currentLocale());
            this.updatePageMeta(this.homeData());
        });
    }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            const data = await this.sanityService.fetch<HomePage>(SanityQueries.HOME_PAGE);
            this.homeData.set(data);
            this.partnerLogos.set(this.resolvePartnerLogos(data?.partners ?? []));
        } catch (error) {
            console.error('Error loading home page:', error);
        }
    }

    private updatePageMeta(data: HomePage | null) {
        if (!data) return;
        const locale = this.currentLocale();
        const title = getLocalized((data.metaTitle ?? data.heroTitle) as Record<string, string> | undefined, locale, ['en', 'de']);
        const description = getLocalized((data.metaDescription ?? data.heroDescription) as Record<string, string> | undefined, locale, ['en', 'de']);
        if (title) this.pageMeta.setPageMeta(title, description ?? undefined);
    }

    private resolvePartnerLogos(partners: Partner[]): { src: string; alt: string }[] {
        const client = this.sanityService.getClient();
        return partners
            .filter((p) => p.logo)
            .map((p) => ({
                src: getImageUrl(client, p.logo, 160, 80),
                alt: p.name || 'Partner logo',
            }));
    }

    getTestimonialPhotoUrl(photo: unknown): string {
        if (!photo) return '';
        try {
            return getImageUrl(this.sanityService.getClient(), photo, 140, 140);
        } catch {
            return '';
        }
    }
}
