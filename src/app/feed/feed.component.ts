import { Component,inject,OnInit, ViewEncapsulation } from '@angular/core';
import { PostsService } from '../posts.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
  // encapsulation: ViewEncapsulation.None,
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
