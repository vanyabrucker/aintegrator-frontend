import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranscriptPanelComponent } from '../../../../shared/components/transcript-panel/transcript-panel.component';
import { MEETING_TRANSCRIPT_DATA } from '../shared/meeting-transcript.data';

@Component({
  selector: 'app-meeting-transcription',
  standalone: true,
  imports: [CommonModule, TranscriptPanelComponent],
  templateUrl: './meeting-transcription.component.html',
  styleUrl: './meeting-transcription.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingTranscriptionComponent {
  readonly transcriptData = MEETING_TRANSCRIPT_DATA;
}
