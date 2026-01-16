import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnChanges {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);

  @Input() taskToEdit: Task | null = null;

  @Output() saved = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();

  submitted = false;

  form = this.fb.group({
    title: ['', [Validators.required]],
    dueDate: ['', [Validators.required]],
  });

  ngOnChanges() {
    this.submitted = false;

    if (this.taskToEdit) {
      this.form.patchValue({
        title: this.taskToEdit.title,
        dueDate: this.taskToEdit.dueDate,
      });
    } else {
      this.form.reset();
    }
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const title = this.form.value.title ?? '';
    const dueDate = this.form.value.dueDate ?? '';

    if (this.taskToEdit) {
      this.taskService.updateTask({
        ...this.taskToEdit,
        title,
        dueDate,
      });
    } else {
      this.taskService.addTask(title, dueDate);
    }

    this.form.reset();
    this.submitted = false;
    this.saved.emit();
  }

  cancelEdit() {
    this.form.reset();
    this.submitted = false;
    this.canceled.emit();
  }
}
