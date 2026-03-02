import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';
import { LocalizedText } from '../../../../shared/models/sanity.models';

@Component({
    selector: 'app-contact-cards',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './contact-cards.component.html',
    styleUrl: './contact-cards.component.scss'
})
export class ContactCardsComponent {
    @Input() email: LocalizedText | string | undefined = 'support@aintegrator.ch';
    @Input() phone: LocalizedText | string | undefined = '+41 44 123 45 67';
    @Input() address: LocalizedText | string | undefined = 'Aintegrator, Musterstrasse 12, Zürich';
}
