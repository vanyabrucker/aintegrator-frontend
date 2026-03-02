import { Component, Input, ChangeDetectionStrategy, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getLocalizedValue } from '../../../core/services/sanity.helpers';
import { LocalizedText } from '../../../shared/models/sanity.models';
import { LocaleService } from '../../../core/services/locale.service';

@Component({
    selector: 'app-security-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './security-card.component.html',
    styleUrl: './security-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityCardComponent {
    @Input() title: LocalizedText | string = 'Hosted in Switzerland';
    @Input() description: LocalizedText | string = 'Your data remains under your control. Data sovereignty and data security are our highest priority.';
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
     * Get display title
     */
    getTitle(): string {
        return this.getLocalizedText(this.title);
    }

    /**
     * Get display description
     */
    getDescription(): string {
        return this.getLocalizedText(this.description);
    }
}
