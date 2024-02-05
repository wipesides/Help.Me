import { Component, OnInit, inject } from '@angular/core';
import { NewsService } from '../news.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
    news : any[] = [];
    newsService : NewsService = inject(NewsService);
    async ngOnInit(){
      try {
        this.news = await this.newsService.getNews();
      } catch (error) {
        console.error('Failed to fetch posts:',error)
      }
    }
    constructor(){}
}
