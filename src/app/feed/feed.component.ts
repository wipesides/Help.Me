import { Component,inject,OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{
    posts = {};
    ngOnInit(): void {
      try {
        this.posts = this.postsService.getPosts();
      } catch (error) {
        console.error('Failed to fetch posts:',error)
      }
    }
    constructor(private postsService : PostsService){
    }
}
