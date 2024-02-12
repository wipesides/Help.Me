import { Component,ViewEncapsulation} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class OptionsComponent {

}
