import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareersHeroComponent } from './components/careers-hero/careers-hero.component';
import { OpenRolesComponent } from './components/open-roles/open-roles.component';
import { InitiativeCtaComponent } from './components/initiative-cta/initiative-cta.component';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { Career, CareersPage, LocalizedText } from '../../shared/models/sanity.models';
import { SanityQueries } from '../../core/services/sanity.helpers';
import { PrinciplesMvSectionComponent } from '../../shared/components/principles-mv-section/principles-mv-section.component';

interface Role {
    title: string | LocalizedText;
    department: string | LocalizedText | undefined;
    location: string | LocalizedText | undefined;
    link: string;
}

@Component({
    selector: 'app-careers',
    standalone: true,
    imports: [
        CommonModule,
        CareersHeroComponent,
        PrinciplesMvSectionComponent,
        OpenRolesComponent,
        InitiativeCtaComponent
    ],
    templateUrl: './careers.component.html',
    styleUrl: './careers.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent implements OnInit {
    careers = signal<Career[]>([]);
    careersPageData = signal<CareersPage | null>(null);
    currentLocale = signal<string>('de');

    // Fallback roles data
    roles: Role[] = [
        {
            title: 'Software Engineer – Intern',
            department: 'Engineering',
            location: 'Remote',
            link: 'https://aintegrator.notion.site/Software-Engineer-Intern-315a7ccd21c380c095f7dfadeac4e6e4?source=copy_link'
        },

    ];

    constructor(
        private sanityService: SanityService,
        private localeService: LocaleService
    ) {
        this.currentLocale.set(this.localeService.currentLocale());
    }

    async ngOnInit() {
        await this.loadContent();
    }

    private async loadContent() {
        try {
            // Fetch careers page data
            const careersPageData = await this.sanityService.fetch<CareersPage>(SanityQueries.CAREERS_PAGE);
            this.careersPageData.set(careersPageData);

            // Fetch individual career listings
            const careers = await this.sanityService.fetch<Career[]>(SanityQueries.ACTIVE_CAREERS);
            this.careers.set(careers);

            // Update roles if careers are available
            if (careers.length > 0) {
                this.roles = careers.map(career => ({
                    title: career.title,
                    department: career.department,
                    location: career.location,
                    link: `/careers/${career.slug.current}`
                }));
            }
        } catch (error) {
            console.error('Error loading careers content:', error);
        }
    }
}

