import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-logo-carousel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './logo-carousel.component.html',
    styleUrl: './logo-carousel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class LogoCarouselComponent {
    logos = [
        { src: 'assets/images/image 11.png', alt: 'Partner 1' },
        { src: 'assets/images/image 12.png', alt: 'Partner 2' },
        { src: 'assets/images/image 13.png', alt: 'Partner 3' },
        { src: 'assets/images/image 14.png', alt: 'Partner 4' },
        { src: 'assets/images/sawi_logo.png', alt: 'SAWI' },
        { src: 'assets/images/credit_suisse_logo.png', alt: 'Credit Suisse' },
        { src: 'assets/images/hesso_logo.png', alt: 'Hesso' }
    ];
}
