import { Component, computed, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudyHeroComponent } from './components/case-study-hero/case-study-hero.component';
import { CaseStudyContentComponent } from './components/case-study-content/case-study-content.component';
import { CaseStudyStat, CaseStudyStatsComponent } from '../../shared/components/case-study-stats/case-study-stats.component';
import { FinalCtaComponent } from '../../shared/components/final-cta/final-cta.component';
import { RouterModule } from '@angular/router';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { SiteSettingsService } from '../../core/services/site-settings.service';
import { CaseStudy } from '../../shared/models/sanity.models';
import { SanityQueries, getLocalizedValue } from '../../core/services/sanity.helpers';

@Component({
    selector: 'app-case-study',
    standalone: true,
    imports: [CommonModule, RouterModule, FinalCtaComponent, CaseStudyHeroComponent, CaseStudyContentComponent, CaseStudyStatsComponent],
    templateUrl: './case-study.component.html',
    styleUrl: './case-study.component.scss'
})
export class CaseStudyComponent implements OnInit {
    readonly slug = input.required<string>();

    caseStudyData = signal<CaseStudy | undefined>(undefined);
    currentLocale = signal<string>('de');

    // Computed stats from case study results
    caseStudyStats = computed<CaseStudyStat[]>(() => {
        const data = this.caseStudyData();
        if (data?.results && data.results.length > 0) {
            return data.results.map(r => ({
                value: r.value,
                description: getLocalizedValue(r.label as Record<string, string>, this.currentLocale(), 'de') || r.value
            }));
        }
        return [];
    });

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService,
        private siteSettings: SiteSettingsService
    ) {
        this.currentLocale.set(this.localeService.currentLocale());
    }

    get finalCta() {
        return this.siteSettings.getFinalCTAForLang(this.localeService.currentLocale());
    }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            const slug = this.slug();
            if (slug) {
                const caseStudy = await this.sanityService.fetch<CaseStudy>(
                    SanityQueries.CASE_STUDY_BY_SLUG(slug)
                );
                this.caseStudyData.set(caseStudy);
            }
        } catch (error) {
            console.error('Error loading case study content:', error);
        }
    }

    getLocalizedText(localizedText: any): string {
        return getLocalizedValue(localizedText, this.currentLocale(), 'de') || '';
    }
}
