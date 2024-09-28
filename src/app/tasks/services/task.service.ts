import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  public allTasks(status: boolean | null = null) {
    return computed(() => {
      const allTasks = this.tasks();
      return allTasks.filter((task) => {
        if (status === null) return true;
        return task.status === status;
      });
    });
  }

  public addTask(task: Task) {
    const genRandHex = (size: any) =>
      [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join('');
    let temporal_task = { ...task };
    temporal_task.id = genRandHex(6);
    temporal_task.status = false;

    this.tasks().push(temporal_task);
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
