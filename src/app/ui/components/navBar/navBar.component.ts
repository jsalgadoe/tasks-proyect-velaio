import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./navBar.component.html`,
  styleUrls: ['./navBar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {}
