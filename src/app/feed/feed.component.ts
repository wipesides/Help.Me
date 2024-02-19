import { Component,inject,OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../firebase.service';
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
  service : FirebaseService = inject(FirebaseService);
   async ngOnInit(){
      try {
        this.posts = await this.service.getPosts();
      } catch (error) {
        console.error('Failed to fetch posts:',error)
      }
    }
    constructor(){}
}
