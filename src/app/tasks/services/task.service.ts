import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Tasks } from '../interfaces/tasks.inteface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public allTasks() {
    return this.http
      .get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((tasks) => {});
  }

  public allTasks2() {
    return this.http.get<Tasks[]>('assets/data.json');
  }
}
