import { Component,inject,OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
  posts : any[] = [];
  postsService : PostsService = inject(PostsService);
   async ngOnInit(){
      try {
        this.posts = await this.postsService.getPosts();
      } catch (error) {
        console.error('Failed to fetch posts:',error)
      }
    }
    constructor(){}
}
