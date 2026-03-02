import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranscriptPanelComponent } from '../../../../shared/components/transcript-panel/transcript-panel.component';
import { MEETING_TRANSCRIPT_DATA } from '../shared/meeting-transcript.data';
import { MeetingParticipantsMockComponent } from '../../../../shared/components/meeting-participants-mock/meeting-participants-mock.component';

@Component({
    selector: 'app-meeting-analysis',
    standalone: true,
    imports: [CommonModule, TranscriptPanelComponent, MeetingParticipantsMockComponent],
    templateUrl: './meeting-analysis.component.html',
    styleUrl: './meeting-analysis.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingAnalysisComponent {
    readonly transcriptData = MEETING_TRANSCRIPT_DATA;
}
