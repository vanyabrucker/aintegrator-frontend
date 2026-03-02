import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../pipes/localized-text.pipe';
import { LocalizedText } from '../../../shared/models/sanity.models';

@Component({
    selector: 'app-principles-mv-section',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './principles-mv-section.component.html',
    styleUrl: './principles-mv-section.component.scss'
})
export class PrinciplesMvSectionComponent {
    @Input() showMv: boolean = true;
    @Input() isPrinciplesDesktop: boolean = false;
    @Input() values: Array<{ title: LocalizedText; description: LocalizedText }> | undefined;

    getValueIndex(index: number): string {
        const num = (index + 1).toString().padStart(3, '0');
        return `${num} ·`;
    }

    principles = [
        {
            index: '001 ·',
            title: 'Fokussiert arbeiten',
            description: [
                'Außergewöhnliche Produkte entstehen durch harte Arbeit – oft an unsichtbaren, wenig glamourösen Themen.<br>Wir handeln mit Klarheit und Dringlichkeit und konzentrieren uns auf das, was wirklich zählt.',
                'Wir bleiben bodenständig und tun, was funktioniert. Gute Ideen zählen – unabhängig davon, woher sie kommen.'
            ]
        },
        {
            index: '002 ·',
            title: 'Produkte schaffen, die Menschen lieben',
            description: [
                'Unsere Technologie soll einen echten, positiven Unterschied im Alltag der Menschen machen.<br>Nicht durch Versprechen, sondern durch Wirkung.'
            ]
        },
        {
            index: '003 ·',
            title: 'Teamgeist',
            description: [
                'Unsere größten Fortschritte entstehen durch enge, effektive Zusammenarbeit – innerhalb von Teams und darüber hinaus.',
                'Verantwortung wird nicht weitergereicht.<br>Probleme gehören uns allen.'
            ]
        }
    ];
}

