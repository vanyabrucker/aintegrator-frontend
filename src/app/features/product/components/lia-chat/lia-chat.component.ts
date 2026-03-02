import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';

@Component({
    selector: 'app-lia-chat',
    standalone: true,
    imports: [CommonModule, LocalizedTextPipe],
    templateUrl: './lia-chat.component.html',
    styleUrl: './lia-chat.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiaChatComponent implements OnInit, OnDestroy {
    @Input() title = '';
    @Input() subtitle = '';
    @Input() promptMobile = '';
    @Input() promptDesktop = '';
    @Input() inputPlaceholder = '';
    @Input() quickActions: string[] = [];

    displayedText = '';

    private readonly examplePrompts = [
        'Fasse dieses Meeting zusammen',
        'Extrahiere die wichtigsten Punkte aus dieser Mail',
        'Übersetze folgenden Text ins Deutsche',
        'Erstellen Sie eine kurze Zusammenfassung für Führungskräfte'
    ];

    private currentPromptIndex = 0;
    private charIndex = 0;
    private timer: ReturnType<typeof setInterval> | null = null;
    private pauseTimer: ReturnType<typeof setTimeout> | null = null;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.startTyping();
    }

    ngOnDestroy(): void {
        this.clearTimers();
    }

    private startTyping(): void {
        const prompt = this.examplePrompts[this.currentPromptIndex];
        this.charIndex = 0;
        this.displayedText = '';
        this.cdr.markForCheck();

        this.timer = setInterval(() => {
            if (this.charIndex < prompt.length) {
                this.displayedText = prompt.slice(0, this.charIndex + 1);
                this.charIndex++;
                this.cdr.markForCheck();
            } else {
                this.clearTimer();
                this.pauseTimer = setTimeout(() => {
                    this.startDeleting();
                }, 2000);
            }
        }, 80);
    }

    private startDeleting(): void {
        const prompt = this.examplePrompts[this.currentPromptIndex];
        this.charIndex = prompt.length;

        this.timer = setInterval(() => {
            if (this.charIndex > 0) {
                this.charIndex--;
                this.displayedText = prompt.slice(0, this.charIndex);
                this.cdr.markForCheck();
            } else {
                this.clearTimer();
                this.currentPromptIndex = (this.currentPromptIndex + 1) % this.examplePrompts.length;
                this.pauseTimer = setTimeout(() => {
                    this.startTyping();
                }, 300);
            }
        }, 40);
    }

    private clearTimer(): void {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    private clearTimers(): void {
        this.clearTimer();
        if (this.pauseTimer) {
            clearTimeout(this.pauseTimer);
            this.pauseTimer = null;
        }
    }
}
