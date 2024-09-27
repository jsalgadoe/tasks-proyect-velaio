import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, map } from 'rxjs';
import { Task } from '../interfaces/tasks.inteface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public allTasks2(status: boolean | null = null) {
    return this.http.get<Task[]>('assets/data.json').pipe(
      map((tasks) =>
        tasks.filter((task) => {
          if (status === null) return task;
          return task.status === status;
        })
      )
    );
  }
}
