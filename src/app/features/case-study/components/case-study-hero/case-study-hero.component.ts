import { Component, Input, inject, signal, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';
import { CaseStudy } from '../../../../shared/models/sanity.models';
import { LucideAngularModule, Landmark } from 'lucide-angular';
import { SanityService } from '../../../../core/services/sanity.service';
import { getImageUrl } from '../../../../core/services/sanity.helpers';

@Component({
    selector: 'app-case-study-hero',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe, LucideAngularModule],
    templateUrl: './case-study-hero.component.html',
    styleUrl: './case-study-hero.component.scss'
})
export class CaseStudyHeroComponent implements OnChanges {
    @Input() caseStudyData: CaseStudy | null | undefined;
    readonly landmarkIcon = Landmark;
    private sanityService = inject(SanityService);

    coverImageUrl = signal<string | null>(null);
    imageLoaded = signal(false);
    imageError = signal(false);

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['caseStudyData']) {
            this.imageLoaded.set(false);
            this.imageError.set(false);
            this.updateCoverImageUrl();
        }
    }

    private updateCoverImageUrl(): void {
        const data = this.caseStudyData;
        if (!data?.coverImage) {
            this.coverImageUrl.set(null);
            return;
        }
        try {
            const url = getImageUrl(this.sanityService.getClient(), data.coverImage, 1144, 400);
            this.coverImageUrl.set(url);
        } catch {
            this.coverImageUrl.set(null);
            this.imageError.set(true);
        }
    }

    onImageLoad(): void {
        this.imageLoaded.set(true);
        this.imageError.set(false);
    }

    onImageError(): void {
        this.imageError.set(true);
    }

    get showSkeleton(): boolean {
        const url = this.coverImageUrl();
        const loaded = this.imageLoaded();
        const error = this.imageError();
        return !url || !loaded || error;
    }
}
