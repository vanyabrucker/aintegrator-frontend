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
    @Input() title = '';
    @Input() description = '';

    @Input() primaryBtnText = '';
    @Input() primaryBtnLink = '';
    @Input() primaryBtnIcon: string = 'assets/icons/Frame.svg';
    @Input() mobilePrimaryBtnText: string = '';

    @Input() secondaryBtnText: string = '';
    @Input() secondaryBtnLink: string = '';
    @Input() secondaryBtnIcon: string = '';
    @Input() buttonContainerClass: string = 'flex-col sm:flex-row';

}
