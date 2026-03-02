import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Partner } from '../../../../shared/models/sanity.models';
import { getImageUrl } from '../../../../core/services/sanity.helpers';
import { environment } from '../../../../../environments/environment';
import { createClient } from '@sanity/client';

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
    @Input() partners: Partner[] | undefined = undefined;

    private fallbackLogos = [
        { src: 'assets/images/image 11.png', alt: 'Partner 1' },
        { src: 'assets/images/image 12.png', alt: 'Partner 2' },
        { src: 'assets/images/image 13.png', alt: 'Partner 3' },
        { src: 'assets/images/image 14.png', alt: 'Partner 4' },
        { src: 'assets/images/image 15.png', alt: 'Partner 5' },
    ];

    get logos() {
        if (this.partners && this.partners.length > 0) {
            // Convert Sanity partners to logo format and duplicate for carousel
            const client = createClient({
                projectId: environment.sanity.projectId,
                dataset: environment.sanity.dataset,
                apiVersion: environment.sanity.apiVersion,
                useCdn: environment.sanity.useCdn,
                perspective: (environment.sanity as any).perspective || 'published',
            });
            const convertedLogos = this.partners.map(partner => ({
                src: partner.logo ? getImageUrl(client, partner.logo, 200, 80) : 'assets/images/image 11.png',
                alt: partner.name,
                link: partner.website
            }));
            return [...convertedLogos, ...convertedLogos];
        }
        // Fallback to hardcoded logos, duplicated for carousel
        return [...this.fallbackLogos, ...this.fallbackLogos];
    }
    // Removed getLogoUrl, now using getImageUrl from helpers
}
