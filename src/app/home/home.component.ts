import { Component, ViewEncapsulation} from '@angular/core';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FeedComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {

}
