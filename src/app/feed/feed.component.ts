import { Component,ElementRef,inject,OnInit, ViewEncapsulation } from '@angular/core';
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
  userData: any;
  bookmarks: any[] = [];
  service : FirebaseService = inject(FirebaseService);
    async ngOnInit(){
      try {
        this.posts = (await this.service.getPosts()).reverse();
        this.userData = await this.service.getUserData();
        this.bookmarks = await this.service.getUserBookmarks(this.userData);
      } catch (error) {
        console.error('Failed to fetch posts:',error)
      }
    }
    constructor(private elementRef : ElementRef){}
    isBookmarked(post: any): boolean{
      return this.bookmarks.some(bookmark => bookmark.id === post.id);
    }
    helpClicked(post: any){
      this.service._helpPost(post);
    }
    questionsClicked(post: any){
      // Implementation later
    }
    bookmarkClicked(post: any,event: Event){
      const target = event.target as HTMLSpanElement;
      if (this.isBookmarked(post)){
        this.service._unbookmarkPost(post);
        target.innerText = 'bookmark_border';
      }
      else {
        this.service._bookmarkPost(post);
        target.innerText = 'bookmark';
      }
    }
    optionsClicked(post: any){
      // Implementation later
    }
}
