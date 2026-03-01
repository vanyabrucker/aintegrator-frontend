import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Landmark } from 'lucide-angular';

interface HomeCaseStudyStat {
    value: string;
    description: string;
}

@Component({
    selector: 'app-case-study',
    standalone: true,
    imports: [CommonModule, RouterModule, LucideAngularModule],
    templateUrl: './case-study.component.html',
    styleUrl: './case-study.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CaseStudyComponent {
    readonly landmarkIcon = Landmark;

    readonly homeStats: HomeCaseStudyStat[] = [
        { value: "150'000.- CHF", description: 'Jährliche Kostenreduktion' },
        { value: '6 Monate', description: 'Entwicklungszeit' }
    ];
}
