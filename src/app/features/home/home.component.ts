import { Component, ChangeDetectionStrategy, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { LogoCarouselComponent } from './components/logo-carousel/logo-carousel.component';
import { CaseStudyComponent } from './components/case-study/case-study.component';
import { TestimonialSectionComponent } from '../../shared/components/testimonial-section/testimonial-section.component';
import { CtaCardComponent } from './components/cta-card/cta-card.component';
import { SecurityCardComponent } from '../../shared/components/security-card/security-card.component';
import { FinalCtaComponent } from '../../shared/components/final-cta/final-cta.component';
import { ProcessStepsComponent } from '../../shared/components/process-steps/process-steps.component';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { HomePage, Testimonial } from '../../shared/models/sanity.models';
import { SanityQueries } from '../../core/services/sanity.helpers';
import { LocalizedTextPipe } from '../../shared/pipes/localized-text.pipe';

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
        CtaCardComponent,
        SecurityCardComponent,
        FinalCtaComponent,
        ProcessStepsComponent,
        LocalizedTextPipe
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    homeData = signal<HomePage | null>(null);
    testimonials = signal<Testimonial[]>([]);
    currentLocale = signal<string>('de');

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService
    ) {
        this.currentLocale.set(this.localeService.currentLocale());
        // Watch LocaleService for changes
        effect(() => {
            this.currentLocale.set(this.localeService.currentLocale());
        });
    }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            console.log('🔄 Fetching home page data from Sanity...');
            console.log('Query:', SanityQueries.HOME_PAGE);

            const [homeData, testimonials] = await Promise.all([
                this.sanityService.fetch<HomePage>(SanityQueries.HOME_PAGE),
                this.sanityService.fetch<Testimonial[]>(SanityQueries.FEATURED_TESTIMONIALS)
            ]);

            console.log('✅ Home data received:', homeData);
            console.log('✅ Testimonials received:', testimonials);

            this.homeData.set(homeData);
            this.testimonials.set(testimonials);
        } catch (error) {
            console.error('❌ Error loading home page content:', error);
            console.error('Error details:', JSON.stringify(error, null, 2));
        }
    }
}
