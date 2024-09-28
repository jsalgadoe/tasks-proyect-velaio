import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TagskillComponent } from '../tagskill/tagskill.component';
import { Task } from '../../interfaces/tasks.inteface';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'card-item',
  imports: [TagskillComponent, CommonModule],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent {
  @Input('task') task: Task = {
    id: 100,
    task_name: '',
    deadline: new Date(),
    assigned_people: [],
    status: false,
  };

  @Output() statusChanged = new EventEmitter<Task>();

  toggleStatus() {
    this.task.status = !this.task.status;
    this.statusChanged.emit(this.task);
  }
}
