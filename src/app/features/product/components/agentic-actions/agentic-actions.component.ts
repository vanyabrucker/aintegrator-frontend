import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizedTextPipe } from '../../../../shared/pipes/localized-text.pipe';
import { LucideAngularModule, Search, ListTodo, Ellipsis, Check, Calendar } from 'lucide-angular';

@Component({
  selector: 'app-agentic-actions',
  standalone: true,
  imports: [CommonModule, LocalizedTextPipe, LucideAngularModule],
  templateUrl: './agentic-actions.component.html',
  styleUrl: './agentic-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgenticActionsComponent {
  @Input() badgeLabel = '';
  @Input() title = '';
  @Input() description = '';
  @Input() mobileCards: Array<{ title?: string; description?: string }> = [];
  @Input() actionItemsTitle = '';
  @Input() actionItems: Array<{ text?: string; date?: string }> = [];

  readonly searchIcon = Search;
  readonly findIcon = ListTodo;
  readonly ellipsisIcon = Ellipsis;
  readonly checkIcon = Check;
  readonly calendarIcon = Calendar;
}
