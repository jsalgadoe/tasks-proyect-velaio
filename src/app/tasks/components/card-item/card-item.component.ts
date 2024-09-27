import { Component, Input } from '@angular/core';
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
    task_name: '',
    deadline: new Date(),
    assigned_people: [],
    status: false,
  };

  toggleStatus() {
    this.task.status = !this.task.status;
  }
}
