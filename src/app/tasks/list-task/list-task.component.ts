import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from '../components/card-item/card-item.component';
import { Task } from '../interfaces/tasks.inteface';
import { take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-list-task',
  imports: [CommonModule, CardItemComponent],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'],
})
export default class ListTaskComponent implements OnInit {
  private __taskService = inject(TaskService);
  public tasks_component: Task[] = [];
  public tasks_original: Task[] = [];

  ngOnInit(): void {
    this.getAllTasks(null);
  }

  getAllTasks(status: boolean | null) {
    this.__taskService.allTasks2(status).subscribe((tasks) => {
      this.tasks_component = tasks;
      this.tasks_original = tasks;
    });
  }

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const status = selectElement.value;

    this.tasks_component = [...this.tasks_original];

    if (status !== 'null') {
      const isCompleted = status === 'true';
      console.log({ status: isCompleted });

      this.tasks_component = this.tasks_original.filter((task) => {
        console.log('Entrando al filtro:', isCompleted);
        console.log('Estado de la tarea:', task.status);
        return task.status === isCompleted;
      });
    }
  }

  onTaskStatusChanged(updatedTask: Task) {
    const taskIndex = this.tasks_component.findIndex(
      (task: Task) => task.id === updatedTask.id
    );
    if (taskIndex !== -1) {
      this.tasks_component[taskIndex] = updatedTask;
    }
  }
}
