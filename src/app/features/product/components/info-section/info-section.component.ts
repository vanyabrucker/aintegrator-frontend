import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';

@Component({
    selector: 'app-info-section',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './info-section.component.html',
    styleUrl: './info-section.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfoSectionComponent {
    @Input() highlightText = '';
    @Input() bodyText = '';
}
