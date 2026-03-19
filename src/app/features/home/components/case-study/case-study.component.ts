import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Landmark } from 'lucide-angular';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';
import { CaseStudy } from '../../../../shared/models/sanity.models';
import { LocaleService } from '../../../../core/services/locale.service';
import { getCaseStudySlug, getLocalizedValue } from '../../../../core/services/sanity.helpers';

@Component({
    selector: 'app-case-study',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule, LocalizedTextPipe],
    templateUrl: './case-study.component.html',
    styleUrl: './case-study.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CaseStudyComponent {
    @Input() featuredCaseStudy: CaseStudy | null | undefined;
    @Input() caseStudyLinkText: { en?: string; de?: string; fr?: string; it?: string } | null | undefined;
    readonly landmarkIcon = Landmark;
    private localeService = inject(LocaleService);

    get caseStudySlug(): string {
        const cs = this.featuredCaseStudy;
        if (!cs?.slug) return '';
        const locale = this.localeService.currentLocale();
        return getCaseStudySlug(cs.slug, locale, 'de');
    }

    getStatDescription(stat: { value: string; label?: { en?: string; de?: string; fr?: string; it?: string } }): string {
        if (!stat.label) return '';
        const locale = this.localeService.currentLocale();
        return getLocalizedValue(stat.label as Record<string, string>, locale, 'de') || '';
    }

    get linkText(): string {
        if (!this.caseStudyLinkText) return '';
        return getLocalizedValue(this.caseStudyLinkText as Record<string, string>, this.localeService.currentLocale(), 'de') || '';
    }
}
