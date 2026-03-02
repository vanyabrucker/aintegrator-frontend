import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getLocalizedValue } from '../../../../core/services/sanity.helpers';
import { LocalizedText } from '../../../../shared/models/sanity.models';

@Component({
    selector: 'app-cta-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cta-card.component.html',
    styleUrl: './cta-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class CtaCardComponent {
    @Input() title: LocalizedText | string = 'AI-Tools, entstanden aus der Praxis';
    @Input() description: LocalizedText | string = 'In unseren Projekten haben wir gelernt, was Unternehmen wirklich brauchen. Daraus ist die LiaSuite entstanden, AI-Tools, die Sie sofort einsetzen können.';
    @Input() linkText: LocalizedText | string = 'Mehr erfahren';
    @Input() linkUrl: string = '#';
    @Input() currentLocale: string = 'de';

    getTitle(): string {
        return this.getLocalizedText(this.title);
    }

    getDescription(): string {
        return this.getLocalizedText(this.description);
    }

    getLinkText(): string {
        return this.getLocalizedText(this.linkText);
    }

    private getLocalizedText(text: LocalizedText | string): string {
        if (!text) return '';
        if (typeof text === 'string') return text;
        return getLocalizedValue(text as Record<string, string>, this.currentLocale, 'de') || '';
    }
}
