import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';
import { LucideAngularModule, Ellipsis } from 'lucide-angular';

@Component({
    selector: 'app-integrations-section',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe, LucideAngularModule],
    templateUrl: './integrations-section.component.html',
    styleUrl: './integrations-section.component.scss'
})
export class IntegrationsSectionComponent {
    @Input() title = '';
    @Input() description = '';
    @Input() calendarDayLabel = '';
    @Input() calendarDayNumber = '';
    @Input() meetingTitle = '';
    @Input() timeRange = '';
    @Input() durationLabel = '';
    @Input() participants: string[] = [];
    @Input() cards: Array<{ title?: string; badge?: string }> = [];
    readonly ellipsisIcon = Ellipsis;

    currentDayName: string;
    currentDayNumber: string;
    currentMonth: string;

    constructor() {
        const now = new Date();
        this.currentDayName = now.toLocaleDateString('de-DE', { weekday: 'long' });
        this.currentDayName = this.currentDayName.charAt(0).toUpperCase() + this.currentDayName.slice(1);
        this.currentDayNumber = now.getDate() + '.';
        this.currentMonth = now.toLocaleDateString('de-DE', { month: 'long' });
        this.currentMonth = this.currentMonth.charAt(0).toUpperCase() + this.currentMonth.slice(1);
    }
}
