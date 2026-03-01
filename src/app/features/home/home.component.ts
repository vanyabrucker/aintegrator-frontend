import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { LogoCarouselComponent } from './components/logo-carousel/logo-carousel.component';
import { CaseStudyComponent } from './components/case-study/case-study.component';
import { TestimonialSectionComponent } from '../../shared/components/testimonial-section/testimonial-section.component';
import { CtaCardComponent } from './components/cta-card/cta-card.component';
import { SecurityCardComponent } from '../../shared/components/security-card/security-card.component';
import { FinalCtaComponent } from '../../shared/components/final-cta/final-cta.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        HeroComponent,
        LogoCarouselComponent,
        CaseStudyComponent,
        TestimonialSectionComponent,

        CtaCardComponent,
        SecurityCardComponent,
        FinalCtaComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
}
