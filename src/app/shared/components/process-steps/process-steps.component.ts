import { Component, Input, ChangeDetectionStrategy, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getLocalizedValue } from '../../../core/services/sanity.helpers';
import { LocalizedText } from '../../../shared/models/sanity.models';
import { LocaleService } from '../../../core/services/locale.service';

interface ProcessStep {
    number: string;
    title?: LocalizedText | string;
    description?: LocalizedText | string;
    desc?: string; // Fallback for legacy format
    active?: boolean;
}

@Component({
    selector: 'app-process-steps',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './process-steps.component.html',
    styleUrls: ['./process-steps.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProcessStepsComponent {
    @Input() title: LocalizedText | string = 'Our Approach';
    @Input() steps: ProcessStep[] = [];
    @Input() set currentLocale(val: string) {
        this._currentLocale.set(val);
    }
    get currentLocale(): string {
        return this._currentLocale();
    }

    private _currentLocale = signal<string>('de');

    constructor(private localeService: LocaleService) {
        // Watch LocaleService for changes
        effect(() => {
            this._currentLocale.set(this.localeService.currentLocale());
        });
    }

    /**
     * Get localized text from either localized object or string
     */
    getLocalizedText(text: any): string {
        if (!text) return '';
        if (typeof text === 'string') return text;
        return getLocalizedValue(text as Record<string, string>, this.currentLocale, 'de') || '';
    }

    /**
     * Get display title - handles both localized objects and strings
     */
    getTitle(): string {
        if (!this.title) return '';
        if (typeof this.title === 'string') return this.title;
        return this.getLocalizedText(this.title);
    }

    /**
     * Get step description - tries both 'description' and 'desc' fields
     */
    getStepDescription(step: ProcessStep): string {
        if (!step) return '';

        // Try newer 'description' field first
        if (step.description) {
            return this.getLocalizedText(step.description);
        }

        // Fallback to legacy 'desc' field
        if (step.desc) {
            return this.getLocalizedText(step.desc);
        }

        return '';
    }
}
