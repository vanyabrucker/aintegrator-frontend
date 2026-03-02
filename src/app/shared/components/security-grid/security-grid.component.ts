import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../pipes/localized-text.pipe';

@Component({
    selector: 'app-security-grid',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './security-grid.component.html',
    styleUrl: './security-grid.component.scss'
})
export class SecurityGridComponent {
    @Input() cards: Array<{ title?: any; description?: any }> = [];
    @Input() footerCardTitle: any = '';
    @Input() footerCardDescription: any = '';
    @Input() badgeLabels: Array<{ text?: any }> = [];
}
