import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly storageKey = 'tasks-v1';
  private readonly _tasks = signal<Task[]>(this.loadFromStorage());
  readonly tasks = computed(() => this._tasks());

  readonly total = computed(() => this._tasks().length);
  readonly doneCount = computed(() => this._tasks().filter(t => t.done).length);
  readonly pendingCount = computed(() => this._tasks().filter(t => !t.done).length);

  addTask(title: string, dueDate: string) {
    const cleanTitle = title.trim();

    if (!cleanTitle) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: cleanTitle,
      dueDate,
      done: false,
      createdAt: Date.now(),
    };

    this._tasks.update(list => [newTask, ...list]);
    this.saveToStorage();
  }

  deleteTask(id: string) {
    this._tasks.update(list => list.filter(t => t.id !== id));
    this.saveToStorage();
  }

  toggleDone(id: string) {
    this._tasks.update(list =>
      list.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
    this.saveToStorage();
  }

  updateTask(updated: Task) {
    const cleanTitle = updated.title.trim();
    if (!cleanTitle) return;

    this._tasks.update(list =>
      list.map(t => (t.id === updated.id ? { ...updated, title: cleanTitle } : t))
    );
    this.saveToStorage();
  }

  private saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this._tasks()));
  }

  private loadFromStorage(): Task[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return [];
      return JSON.parse(raw) as Task[];
    } catch {
      return [];
    }
  }
}
