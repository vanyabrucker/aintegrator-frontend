import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';
import { LocalizedText } from '../../../../shared/models/sanity.models';

@Component({
    selector: 'app-contact-hero',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './contact-hero.component.html',
    styleUrl: './contact-hero.component.scss'
})
export class ContactHeroComponent {
    @Input() title: LocalizedText | string | undefined = 'Kontakt';
}
