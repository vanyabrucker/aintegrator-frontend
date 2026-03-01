import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudyHeroComponent } from './components/case-study-hero/case-study-hero.component';
import { CaseStudyContentComponent } from './components/case-study-content/case-study-content.component';
import { CaseStudyStatsComponent, CaseStudyStat } from '../../shared/components/case-study-stats/case-study-stats.component';
import { FinalCtaComponent } from '../../shared/components/final-cta/final-cta.component';

import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-case-study',
    standalone: true,
    imports: [CommonModule, RouterModule, CaseStudyStatsComponent, FinalCtaComponent, CaseStudyHeroComponent, CaseStudyContentComponent],
    templateUrl: './case-study.component.html',
    styleUrl: './case-study.component.scss'
})
export class CaseStudyComponent {
    readonly slug = input.required<string>();

    readonly upperStats: CaseStudyStat[] = [
        { value: "150'000.- CHF", description: 'Jährliche Kostenreduktion' },
        { value: '6 Monate', description: 'Entwicklungszeit' }
    ];

    readonly lowerStats: CaseStudyStat[] = [
        { value: "150'000.- CHF", description: 'Jährliche Kostenreduktion' },
        { value: '6 Monate', description: 'Entwicklungszeit' },
    ];
}
