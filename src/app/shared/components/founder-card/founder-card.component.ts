import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedText } from '../../models/sanity.models';
import { LocalizedTextPipe } from '../../pipes/localized-text.pipe';

@Component({
    selector: 'app-founder-card',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './founder-card.component.html',
    styleUrl: './founder-card.component.scss'
})
export class FounderCardComponent {
    @Input() avatar: string = '';
    @Input() name: string = '';
    @Input() role: LocalizedText | string = '';
    @Input() linkedin: string = '#';
}
