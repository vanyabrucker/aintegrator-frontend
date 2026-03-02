import { Component, ChangeDetectionStrategy, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutHeroComponent } from './components/about-hero/about-hero.component';
import { FoundersGridSectionComponent } from './components/founders-grid-section/founders-grid-section.component';
import { PrinciplesMvSectionComponent } from '../../shared/components/principles-mv-section/principles-mv-section.component';
import { FinalCtaComponent } from '../../shared/components/final-cta/final-cta.component';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { AboutPage, HomePage, TeamMember, LocalizedText } from '../../shared/models/sanity.models';
import { SanityQueries } from '../../core/services/sanity.helpers';
import { LocalizedTextPipe } from '../../shared/pipes/localized-text.pipe';
import { ProcessStepsComponent } from '../../shared/components/process-steps/process-steps.component';
import { SecurityCardComponent } from '../../shared/components/security-card/security-card.component';

@Component({
    selector: 'app-about-us',
    standalone: true,
    imports: [
        CommonModule,
        AboutHeroComponent,
        FoundersGridSectionComponent,
        PrinciplesMvSectionComponent,
        ProcessStepsComponent,
        SecurityCardComponent,
        FinalCtaComponent,
        LocalizedTextPipe
    ],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutUsComponent implements OnInit {
    aboutData = signal<AboutPage | null>(null);
    homeData = signal<HomePage | null>(null);
    teamMembers = signal<TeamMember[]>([]);
    currentLocale = signal<string>('de');

    // Fallback data for founders - now supports LocalizedText
    founders: Array<{
        name: string;
        role: LocalizedText | string;
        avatar: string;
        linkedin: string;
    }> = [
            {
                name: 'Stephane Bonnier',
                role: 'Founder & CEO',
                avatar: 'assets/images/image 17.png',
                linkedin: '#'
            },
            {
                name: 'Vanya Brucker',
                role: 'Founder & CTO',
                avatar: 'assets/images/image 18.png',
                linkedin: '#'
            }
        ];

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService
    ) {
        this.currentLocale.set(this.localeService.currentLocale());

        // Watch for locale changes and update signal
        effect(() => {
            this.currentLocale.set(this.localeService.currentLocale());
        });
    }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            const [aboutData, teamMembers, homeData] = await Promise.all([
                this.sanityService.fetch<AboutPage>(SanityQueries.ABOUT_PAGE),
                this.sanityService.fetch<TeamMember[]>(SanityQueries.ALL_TEAM_MEMBERS),
                this.sanityService.fetch<HomePage>(SanityQueries.HOME_PAGE)
            ]);

            this.aboutData.set(aboutData);
            this.teamMembers.set(teamMembers);
            this.homeData.set(homeData);

            // Update founders if team members are available
            if (teamMembers.length > 0) {
                this.founders = teamMembers.slice(0, 2).map(member => ({
                    name: member.name,
                    role: member.role || 'Team Member', // Fallback if role is undefined
                    avatar: member.photo ? this.getImageUrl(member.photo) : 'assets/images/image 17.png',
                    linkedin: member.linkedin && member.linkedin !== '#' ? member.linkedin : ''
                }));
            }
        } catch (error) {
            console.error('Error loading about page content:', error);
        }
    }

    /**
     * Convert Sanity image reference to usable URL
     */
    private getImageUrl(sanityImage: any): string {
        if (!sanityImage) return 'assets/images/image 17.png';
        if (typeof sanityImage === 'string') return sanityImage;
        if (sanityImage.asset?._ref) {
            // Convert Sanity asset reference to image URL
            const assetId = sanityImage.asset._ref.replace('image-', '').split('-')[0];
            return `https://cdn.sanity.io/images/4hvlh78z/production/${assetId}.jpg`;
        }
        return 'assets/images/image 17.png';
    }
}
