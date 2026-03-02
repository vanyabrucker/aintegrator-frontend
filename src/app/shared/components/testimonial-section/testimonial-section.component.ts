import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-testimonial-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './testimonial-section.component.html',
    styleUrl: './testimonial-section.component.scss'
})
export class TestimonialSectionComponent {
    readonly alignment = input<'left' | 'center'>('center');
    readonly fullWidth = input<boolean>(false);
    readonly quote = input.required<string>();
    readonly author = input<string>('');
    readonly role = input<string>('');
    readonly avatarUrl = input<string>('');

    readonly mobileGap = input<string>('gap-[24px]');
    readonly mobileMaxWidth = input<string>('max-w-none');
    readonly mobilePaddingClass = input<string>('px-0');
    readonly mobileAuthorAlignment = input<string>('items-start text-left');
    readonly sectionSpacingClass = input<string>('section-spacing');

    hasMeta(): boolean {
        return Boolean(this.author() || this.role() || this.avatarUrl());
    }
}
