import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../pipes/localized-text.pipe';

export interface CaseStudyStat {
    value: string;
    suffix?: string;
    description: string;
    color?: string;
}

@Component({
    selector: 'app-case-study-stats',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './case-study-stats.component.html',
    styleUrl: './case-study-stats.component.scss'
})
export class CaseStudyStatsComponent {
    readonly stats = input.required<CaseStudyStat[]>();
    readonly backgroundClass = input<string>('bg-ai-gray-100');
    readonly containerClass = input<string>('rounded-[12px] p-[32px] md:p-[80px]');
    readonly cardContentClass = input<string>('justify-end gap-0');
    readonly size = input<'default' | 'small'>('default');
}
