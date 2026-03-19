import { Component, ChangeDetectionStrategy, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareersHeroComponent } from './components/careers-hero/careers-hero.component';
import { OpenRolesComponent } from './components/open-roles/open-roles.component';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { PageMetaService } from '../../core/services/page-meta.service';
import { Career, CareersPage, LocalizedText } from '../../shared/models/sanity.models';
import { getLocalized } from '../../core/utils/localization';
import { SanityQueries } from '../../core/services/sanity.helpers';

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
        OpenRolesComponent,
    ],
    templateUrl: './careers.component.html',
    styleUrl: './careers.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent implements OnInit {
    careers = signal<Career[]>([]);
    careersPageData = signal<CareersPage | null>(null);
    currentLocale = signal<string>('de');
    roles = signal<Role[]>([]);

    constructor(
      private sanityService: SanityService,
      private localeService: LocaleService,
      private pageMeta: PageMetaService
    ) {
      this.currentLocale.set(this.localeService.currentLocale());
      effect(() => {
        this.currentLocale.set(this.localeService.currentLocale());
        this.updatePageMeta(this.careersPageData());
      });
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
          this.roles.set(careers.map(career => ({
            title: career.title,
            department: career.department,
            location: career.location,
            link: career.applyLink || '/contact'
          })));
        }
      } catch (error) {
        console.error('Error loading careers content:', error);
      }
    }

    private updatePageMeta(data: CareersPage | null) {
      if (!data) return;
      const locale = this.currentLocale();
      const title = getLocalized((data.metaTitle ?? data.heroTitle) as Record<string, string> | undefined, locale, ['en', 'de']);
      const description = getLocalized(data.metaDescription as Record<string, string> | undefined, locale, ['en', 'de']);
      if (title) this.pageMeta.setPageMeta(title, description ?? undefined);
    }
}
