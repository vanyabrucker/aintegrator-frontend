import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';
import { LocalizedText } from '../../../../shared/models/sanity.models';

@Component({
    selector: 'app-careers-hero',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './careers-hero.component.html',
    styleUrl: './careers-hero.component.scss'
})
export class CareersHeroComponent {
    @Input() heroTitle: LocalizedText | undefined;
    @Input() heroDescription: LocalizedText | undefined;
}
