import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { NewsComponent } from '../news/news.component';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

}
