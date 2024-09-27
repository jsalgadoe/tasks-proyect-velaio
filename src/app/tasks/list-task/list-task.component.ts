import { Component, effect, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CardItemComponent } from '../components/card-item/card-item.component';
import { Task } from '../interfaces/tasks.inteface';

@Component({
  standalone: true,
  selector: 'app-list-task',
  imports: [CommonModule, CardItemComponent],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export default class ListTaskComponent {
  private __taskService = inject(TaskService);
  public tasks_component: Task[] = [];

  constructor() {
    effect(() => {
      this.getAllTasks(null);
    });
  }

  getAllTasks(status: boolean | null) {
    this.tasks_component = this.__taskService.allTasks2(status)();
  }

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;
    this.getAllTasks(status === 'null' ? null : status === 'true');
  }

  onTaskStatusChanged(updatedTask: Task) {
    this.__taskService.updateTaskStatus(updatedTask);
  }
}
