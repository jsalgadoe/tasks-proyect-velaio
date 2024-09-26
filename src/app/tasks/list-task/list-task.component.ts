import { Component, inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from '../components/card-item/card-item.component';

@Component({
  standalone: true,
  selector: 'app-list-task',
  imports: [CommonModule, CardItemComponent],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export default class ListTaskComponent {
  private __taskService = inject(TaskService);
  public tasks: any = [];

  otherArray = [1, 2, 3];
  constructor() {
    this.__taskService.allTasks2().subscribe((tasks) => {
      console.log(Array.isArray(tasks));
      console.log(tasks);
      this.tasks = tasks;
    });
  }
}
