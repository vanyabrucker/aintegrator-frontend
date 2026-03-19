import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
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
    @Input() logos: { src: string; alt: string }[] = [];
}
