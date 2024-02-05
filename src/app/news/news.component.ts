import { Component, OnInit, inject } from '@angular/core';
import { NewsService } from '../news.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit{
    news : string[] = [];
    newsService : NewsService = inject(NewsService);
    async ngOnInit(){
        this.news = await this.newsService.getNews();
    }
    constructor(){}
}
