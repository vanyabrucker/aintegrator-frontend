import { Component, ChangeDetectionStrategy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { InfoSectionComponent } from './components/info-section/info-section.component';
import { MeetingAnalysisComponent } from './components/meeting-analysis/meeting-analysis.component';
import { IntegrationsSectionComponent } from './components/integrations-section/integrations-section.component';
import { MeetingTranscriptionComponent } from './components/meeting-transcription/meeting-transcription.component';
import { MeetingSummaryComponent } from './components/meeting-summary/meeting-summary.component';
import { AgenticActionsComponent } from './components/agentic-actions/agentic-actions.component';
import { LiaChatComponent } from './components/lia-chat/lia-chat.component';
import { BoltsSectionComponent } from './components/bolts-section/bolts-section.component';
import { SecurityGridComponent } from '../../shared/components/security-grid/security-grid.component';
import { PricingGridComponent } from '../../shared/components/pricing-grid/pricing-grid.component';
import { FinalCtaComponent } from '../../shared/components/final-cta/final-cta.component';
import { SanityService } from '../../core/services/sanity.service';
import { LocaleService } from '../../core/services/locale.service';
import { ProductPage } from '../../shared/models/sanity.models';
import { SanityQueries, getLocalizedValue } from '../../core/services/sanity.helpers';
import { LocalizedTextPipe } from '../../shared/pipes/localized-text.pipe';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule, HeroComponent, InfoSectionComponent, MeetingAnalysisComponent, IntegrationsSectionComponent, MeetingTranscriptionComponent, MeetingSummaryComponent, AgenticActionsComponent, LiaChatComponent, BoltsSectionComponent, SecurityGridComponent, PricingGridComponent, FinalCtaComponent, LocalizedTextPipe],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
    productData = signal<ProductPage | null>(null);
    currentLocale = signal<string>('de');

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
            const productData = await this.sanityService.fetch<ProductPage>(SanityQueries.PRODUCT_PAGE);
            this.productData.set(productData);
        } catch (error) {
            console.error('Error loading product page content:', error);
        }
    }

    // Helper methods for localization
    getLocalizedText(localizedText: any): string {
        return getLocalizedValue(localizedText, this.currentLocale(), 'de') || '';
    }

    getInfoBanner(infoBanner: any): any {
        if (!infoBanner) return null;
        return {
            ...infoBanner,
            description: this.getLocalizedText(infoBanner.description)
        };
    }

    getTranscriptEntries(entries: any[] | undefined): any[] {
        if (!entries || !Array.isArray(entries)) return [];
        return entries.map(entry => ({
            ...entry,
            name: this.getLocalizedText(entry.name),
            text: this.getLocalizedText(entry.text)
        }));
    }

    getDiscussionPoints(points: any[] | undefined): any[] {
        if (!points || !Array.isArray(points)) return [];
        return points.map(point => ({
            ...point,
            title: this.getLocalizedText(point.title),
            description: this.getLocalizedText(point.description)
        }));
    }

    getParticipantNames(participants: any[] | undefined): string[] {
        if (!participants || !Array.isArray(participants)) return [];
        return participants.map(p => this.getLocalizedText(p.name) || '');
    }

    getSecurityCards(cards: any[] | undefined): any[] {
        if (!cards || !Array.isArray(cards)) return [];
        return cards.map(card => ({
            ...card,
            title: this.getLocalizedText(card.title),
            description: this.getLocalizedText(card.description)
        }));
    }

    getBadgeLabels(labels: any[] | undefined): Array<{ text?: any }> {
        if (!labels || !Array.isArray(labels)) return [];
        return labels.map(l => ({ text: l?.text ?? l }));
    }

    getPricingPlans(plans: any[] | undefined): any[] {
        if (!plans || !Array.isArray(plans)) return [];
        return plans.map(plan => ({
            ...plan,
            namePrefix: this.getLocalizedText(plan.namePrefix),
            nameSuffix: this.getLocalizedText(plan.nameSuffix),
            description: this.getLocalizedText(plan.description),
            price: this.getLocalizedText(plan.price),
            period: this.getLocalizedText(plan.period),
            ctaLabel: this.getLocalizedText(plan.ctaLabel),
            highlightLabel: this.getLocalizedText(plan.highlightLabel),
            features: plan.features?.map((feature: any) => ({
                ...feature,
                text: this.getLocalizedText(feature.text)
            })) || []
        }));
    }

    getActionItems(items: any[] | undefined): any[] {
        if (!items || !Array.isArray(items)) return [];
        return items.map(item => ({
            ...item,
            text: this.getLocalizedText(item.text)
        }));
    }

    getMobileCards(cards: any[] | undefined): any[] {
        if (!cards || !Array.isArray(cards)) return [];
        return cards.map(card => ({
            ...card,
            title: this.getLocalizedText(card.title),
            description: this.getLocalizedText(card.description)
        }));
    }

    getBoltsCarouselItems(items: any[] | undefined): string[] {
        if (!items || !Array.isArray(items)) return [];
        return items.map(i => this.getLocalizedText(i));
    }

    getIntegrationsCards(cards: any[] | undefined): any[] {
        if (!cards || !Array.isArray(cards)) return [];
        return cards.map(card => ({
            ...card,
            title: this.getLocalizedText(card.title),
            badge: this.getLocalizedText(card.badge)
        }));
    }
}
