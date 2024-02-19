import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class NewsComponent implements OnInit{
    news : any[] = [];
    service : FirebaseService = inject(FirebaseService);
    async ngOnInit(){
      try {
        this.news = await this.service.getNews();
      } catch (error) {
        console.error('Failed to fetch posts:',error)
      }
    }
    constructor(){}
}
