import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-counters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-counters.component.html',
  styleUrl: './task-counters.component.css',
})
export class TaskCountersComponent {
  @Input() total = 0;
  @Input() done = 0;
  @Input() pending = 0;
}
