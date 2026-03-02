import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutHeroComponent } from './components/about-hero/about-hero.component';
import { FoundersGridSectionComponent } from './components/founders-grid-section/founders-grid-section.component';
import { FinalCtaComponent } from '../../shared/components/final-cta/final-cta.component';

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [
        CommonModule,
        AboutHeroComponent,
        FoundersGridSectionComponent,
        FinalCtaComponent
    ],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent {
    founders = [
        {
            name: 'Stephane Bonnier',
            role: 'Founder & CEO',
            avatar: 'assets/images/stephane_portrait.png',
            linkedin: 'https://www.linkedin.com/in/stephane-bonnier/'
        },
        {
            name: 'Vanya Brucker',
            role: 'Founder & CTO',
            avatar: 'assets/images/vanya_portrait.png',
            linkedin: 'https://www.linkedin.com/in/vanyabrucker/'
        }
    ];
}
