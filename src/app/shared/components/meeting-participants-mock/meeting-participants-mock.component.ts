import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Phone, Video } from 'lucide-angular';

@Component({
    selector: 'app-meeting-participants-mock',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './meeting-participants-mock.component.html',
    styleUrl: './meeting-participants-mock.component.scss'
})
export class MeetingParticipantsMockComponent {
    readonly monicaImage = 'assets/images/image 19.png';
    readonly stephaneImage = 'assets/images/image 20.png';
    readonly liaUnionLogo = 'assets/icons/Union.png';
    readonly videoIcon = Video;
    readonly phoneIcon = Phone;
}
