import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-final-cta',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './final-cta.component.html',
    styleUrl: './final-cta.component.scss'
})
export class FinalCtaComponent {
    @Input() title: string = 'Zeit für AI-Integration mit messbarer Wirkung';
    @Input() description: string = 'Investieren Sie 30 Minuten in die Zukunft Ihres Unternehmens: Wir zeigen Ihnen konkrete Erfolgsbeispiele und wie Ihre AI-Transformation reibungslos gelingt.';

    @Input() primaryBtnText: string = 'Termin vereinbaren';
    @Input() primaryBtnLink: string = 'https://calendar.app.google/fzUMskhjkfUh2Qd47';
    @Input() primaryBtnIcon: string = 'assets/icons/Frame.svg';
    @Input() mobilePrimaryBtnText: string = '';

    @Input() secondaryBtnText: string = '';
    @Input() secondaryBtnLink: string = '';
    @Input() secondaryBtnIcon: string = '';
    @Input() buttonContainerClass: string = 'flex-col sm:flex-row';

}
