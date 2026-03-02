import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalizedTextPipe } from '../../pipes/localized-text.pipe';
import { LocaleService } from '../../../core/services/locale.service';
import { SiteSettingsService } from '../../../core/services/site-settings.service';

@Component({
    selector: 'app-final-cta',
    standalone: true,
    imports: [CommonModule, RouterModule, LocalizedTextPipe],
    templateUrl: './final-cta.component.html',
    styleUrl: './final-cta.component.scss'
})
export class FinalCtaComponent {
    private localeService = inject(LocaleService);
    private siteSettingsService = inject(SiteSettingsService);

    private readonly fallbackTexts = {
        de: {
            title: 'Zeit für AI-Integration mit messbarer Wirkung',
            description: 'Investieren Sie 30 Minuten in die Zukunft Ihres Unternehmens: Wir zeigen Ihnen konkrete Erfolgsbeispiele und wie Ihre AI-Transformation reibungslos gelingt.',
            primaryBtnText: 'Termin vereinbaren'
        },
        en: {
            title: 'Time for AI Integration with measurable impact',
            description: 'Invest 30 minutes in your company\'s future: We show you concrete success examples and how your AI transformation succeeds smoothly.',
            primaryBtnText: 'Book appointment'
        },
        fr: {
            title: 'Le moment de l\'intégration de l\'IA avec un impact mesurable',
            description: 'Investissez 30 minutes dans l\'avenir de votre entreprise : nous vous montrons des exemples de succès concrets et comment votre transformation IA réussit en douceur.',
            primaryBtnText: 'Prendre rendez-vous'
        },
        it: {
            title: 'È il momento per l\'integrazione dell\'IA con impatto misurabile',
            description: 'Investite 30 minuti nel futuro della vostra azienda: vi mostriamo esempi di successo concreti e come la vostra trasformazione IA riesce senza problemi.',
            primaryBtnText: 'Prenota appuntamento'
        }
    };

    @Input() title: string = '';
    @Input() description: string = '';

    @Input() primaryBtnText: string = '';
    @Input() primaryBtnLink: string = '/contact';
    @Input() primaryBtnIcon: string = 'assets/icons/Frame.svg';
    @Input() mobilePrimaryBtnText: string = '';

    @Input() secondaryBtnText: string = '';
    @Input() secondaryBtnLink: string = '';
    @Input() secondaryBtnIcon: string = '';

    @Input() showDecoration: boolean = true;
    @Input() descriptionMaxWidthClass: string = 'max-w-[323px] md:max-w-[520px] xl:max-w-none xl:w-[694px]';
    @Input() decorationPositionClass: string = 'top-[258px]';
    @Input() buttonContainerClass: string = 'flex-col sm:flex-row';

    @Input() showMobileDecoration: boolean = false;
    @Input() mobileDecoration: string = 'assets/images/bird_simulation.png';
    @Input() mobileDecorationClass: string = '';

    @Input() titleDescriptionGapClass: string = 'mb-[24px] md:mb-0';
    @Input() descriptionButtonsGapClass: string = 'mb-[33px] md:mb-0';
    @Input() buttonsGapClass: string = 'gap-[26px] md:gap-[24px]';

    getTitle(): string {
        if (this.title) return this.title;
        const locale = this.localeService.currentLocale();
        const ctaSettings = this.siteSettingsService.getFinalCTASettings();
        return ctaSettings?.title?.[locale] || this.fallbackTexts[locale as keyof typeof this.fallbackTexts]?.title || this.fallbackTexts['de'].title;
    }

    getDescription(): string {
        if (this.description) return this.description;
        const locale = this.localeService.currentLocale();
        const ctaSettings = this.siteSettingsService.getFinalCTASettings();
        return ctaSettings?.description?.[locale] || this.fallbackTexts[locale as keyof typeof this.fallbackTexts]?.description || this.fallbackTexts['de'].description;
    }

    getPrimaryBtnText(): string {
        if (this.primaryBtnText) return this.primaryBtnText;
        const locale = this.localeService.currentLocale();
        const ctaSettings = this.siteSettingsService.getFinalCTASettings();
        return ctaSettings?.primaryBtnText?.[locale] || this.fallbackTexts[locale as keyof typeof this.fallbackTexts]?.primaryBtnText || this.fallbackTexts['de'].primaryBtnText;
    }
}
