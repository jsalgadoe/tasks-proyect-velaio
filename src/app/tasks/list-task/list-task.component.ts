import { Component, inject, OnInit } from '@angular/core';
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
export default class ListTaskComponent implements OnInit {
  private __taskService = inject(TaskService);
  public tasks: any = [];

  ngOnInit(): void {
    this.getAllTasks(null);
  }

  getAllTasks(status: boolean | null) {
    this.__taskService.allTasks2(status).subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    let status = selectElement.value;

    status === 'null'
      ? this.getAllTasks(null)
      : this.getAllTasks(status === 'true');
  }
}
