import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranscriptPanelComponent } from '../../../../shared/components/transcript-panel/transcript-panel.component';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';

@Component({
  selector: 'app-meeting-transcription',
  standalone: true,
  imports: [CommonModule, TranscriptPanelComponent, LocalizedTextPipe],
  templateUrl: './meeting-transcription.component.html',
  styleUrl: './meeting-transcription.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingTranscriptionComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() transcriptData: Array<{ initial?: string; name?: string; time?: string; text?: string }> = [];
  @Input() uploadButtonLabel = '';
  @Input() recordButtonLabel = '';
  @Input() summaryTabLabel = '';
  @Input() transcriptTabLabel = '';

  readonly monicaImage = 'assets/images/image 19.png';
  readonly stephaneImage = 'assets/images/image 20.png';
}
