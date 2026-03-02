import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';

@Component({
    selector: 'app-bolts-section',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './bolts-section.component.html',
    styleUrl: './bolts-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoltsSectionComponent {
    @Input() title = '';
    @Input() description = '';
    @Input() formTitleDesktop = '';
    @Input() formTitleMobile = '';
    @Input() nameLabel = '';
    @Input() namePlaceholderDesktop = '';
    @Input() namePlaceholderMobile = '';
    @Input() promptLabelDesktop = '';
    @Input() promptLabelMobile = '';
    @Input() promptPlaceholderDesktop = '';
    @Input() promptPlaceholderMobile = '';
    @Input() submitLabel = '';
    @Input() carouselItems: string[] = [];
}
