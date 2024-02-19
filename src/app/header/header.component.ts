import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FeedComponent } from '../feed/feed.component';
import { NewsComponent } from '../news/news.component';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit{
  isLoggedIn: boolean = false;
  constructor(){}
  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }
}
