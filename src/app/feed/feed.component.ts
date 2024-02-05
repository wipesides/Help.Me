import { Component,inject,OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
  posts : any[] = [];
   async ngOnInit(){
      try {
        this.posts = await this.postsService.getPosts();
      } catch (error) {
        console.error('Failed to fetch posts:',error)
      }
    }
    constructor(private postsService : PostsService){
    }
}
