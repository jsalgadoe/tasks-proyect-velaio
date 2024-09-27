import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../interfaces/tasks.inteface';

import { signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = signal<Task[]>([]);

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  public loadTasks() {
    this.http.get<Task[]>('assets/data.json').subscribe((tasks) => {
      this.tasks.set(tasks);
    });
  }

  public allTasks2(status: boolean | null = null) {
    return computed(() => {
      const allTasks = this.tasks();
      return allTasks.filter((task) => {
        if (status === null) return true;
        return task.status === status;
      });
    });
  }

  public updateTaskStatus(updatedTask: Task): void {
    const taskIndex = this.tasks().findIndex(
      (task) => task.id === updatedTask.id
    );
    if (taskIndex !== -1) {
      const updatedTasks = [...this.tasks()];
      updatedTasks[taskIndex] = updatedTask;
      this.tasks.set(updatedTasks);
    }
  }
}
