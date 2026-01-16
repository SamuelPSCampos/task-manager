import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Task } from '../../models/task';
import { TaskCountersComponent } from '../../components/task-counters/task-counters.component';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskCountersComponent, TaskListComponent],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent {
  private taskService = inject(TaskService);

  readonly tasks = this.taskService.tasks;

  readonly total = this.taskService.total;
  readonly doneCount = this.taskService.doneCount;
  readonly pendingCount = this.taskService.pendingCount;

  editingTask = signal<Task | null>(null);

  onToggle(id: string) {
    this.taskService.toggleDone(id);
  }

  onRemove(id: string) {
    this.taskService.deleteTask(id);
  }

  onEdit(task: Task) {
    this.editingTask.set(task);
  }

  onSaved() {
    this.editingTask.set(null);
  }

  onCanceled() {
    this.editingTask.set(null);
  }
}
