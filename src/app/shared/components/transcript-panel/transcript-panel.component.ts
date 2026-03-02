import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-transcript-panel',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transcript-panel.component.html',
    styleUrl: './transcript-panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranscriptPanelComponent {
    @Input() transcriptData: any[] = [];
    @Input() uploadButtonLabel = '';
    @Input() recordButtonLabel = '';
    @Input() summaryTabLabel = '';
    @Input() transcriptTabLabel = '';
}
