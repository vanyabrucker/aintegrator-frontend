import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocaleService, SupportedLocale } from '../../../core/services/locale.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterLinkActive],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    readonly logoSrc = 'assets/images/logo.png';
    readonly arrowIconSrc = 'assets/icons/Frame.svg';
    mobileMenuOpen = false;
    languageDropdownOpen = signal(false);

    readonly localeService = inject(LocaleService);

    get currentLocale(): string {
        return this.localeService.currentLocale();
    }

    get supportedLocales(): readonly SupportedLocale[] {
        return this.localeService.supportedLocales;
    }

    get localeLabels() {
        return this.localeService.localeLabels();
    }

    get navLabels() {
        const locale = this.currentLocale;
        const labels: Record<string, { product: string; about: string; careers: string; contact: string; cta: string }> = {
            en: {
                product: 'Product',
                about: 'About us',
                careers: 'Careers',
                contact: 'Contact',
                cta: 'Book appointment'
            },
            de: {
                product: 'Produkt',
                about: 'Über uns',
                careers: 'Karriere',
                contact: 'Kontakt',
                cta: 'Termin vereinbaren'
            },
            fr: {
                product: 'Produit',
                about: 'À propos',
                careers: 'Carrières',
                contact: 'Contact',
                cta: 'Prendre rendez-vous'
            },
            it: {
                product: 'Prodotto',
                about: 'Chi siamo',
                careers: 'Carriere',
                contact: 'Contatto',
                cta: 'Fissare un appuntamento'
            }
        };
        return labels[locale] || labels['de'];
    }

    toggleMobileMenu(): void {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    }

    closeMobileMenu(): void {
        this.mobileMenuOpen = false;
        document.body.style.overflow = '';
    }

    toggleLanguageDropdown(): void {
        this.languageDropdownOpen.set(!this.languageDropdownOpen());
    }

    closeLanguageDropdown(): void {
        this.languageDropdownOpen.set(false);
    }

    changeLocale(locale: SupportedLocale): void {
        this.localeService.setLocale(locale);
        this.closeLanguageDropdown();
        window.location.reload(); // Reload to fetch content in new language
    }

    getLocaleShortCode(locale: string): string {
        return locale.toUpperCase();
    }
}
