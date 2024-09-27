import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tag-skill',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./tagskill.component.css'],
  templateUrl: './tagskill.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagskillComponent {
  @Input('skills') skills: string[] = [];
}
