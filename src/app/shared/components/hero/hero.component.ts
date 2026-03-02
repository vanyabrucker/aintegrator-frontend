import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
    @Input() title: string = '';
    @Input() description: string = '';
    @Input() backgroundImage: string = 'assets/images/Group 3007.png';
    @Input() buttonLabel: string = '';
    @Input() buttonLink: string = '/contact';
    @Input() titleMaxWidthClass: string = 'md:max-w-[635px]';
    @Input() mobileMarginClass: string = 'mt-[77px]';
}
