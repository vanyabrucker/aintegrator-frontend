import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';
import { LocalizedText } from '../../../../shared/models/sanity.models';

@Component({
    selector: 'app-initiative-cta',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './initiative-cta.component.html',
    styleUrl: './initiative-cta.component.scss'
})
export class InitiativeCtaComponent {
    @Input() initiativeCTATitle: LocalizedText | undefined;
    @Input() initiativeCTADescription: LocalizedText | undefined;
    @Input() initiativeEmail: string | undefined;
    @Input() initiativeText: LocalizedText | string | undefined;
}
