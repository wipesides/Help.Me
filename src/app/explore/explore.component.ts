import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.css'
})
export class ExploreComponent implements OnInit{
  userData: any;
  bookmarks: any[] = [];
  filteredPosts: any[] = [];
  allPosts: any[] = [];
  searchForm = new FormGroup({
    search: new FormControl("")
  })
  constructor(private service: FirebaseService){}
  async ngOnInit(){
    this.allPosts = (await this.service.getPosts()).reverse();
    this.userData = await this.service.getUserData();
    this.bookmarks = await this.service.getUserBookmarks(this.userData);
  }
  filterPosts(){
    this.filteredPosts = this.allPosts.filter(post => {
      post.postTitle.includes(this.searchForm.value.search) || post.postBody.includes(this.searchForm.value.search)
    });
  }
  isBookmarked(post: any): boolean{
    return this.bookmarks.includes(post.id)
  }
  helpClicked(post: any){
    this.service._helpPost(post);
  }
  questionsClicked(post: any){
    // Implementation later
  }
  bookmarkClicked(post: any){
    if (this.isBookmarked(post)){
      this.service._unbookmarkPost(post);
    }
    else {
      this.service._bookmarkPost(post);
    }
  }
  optionsClicked(post: any){
    // Implementation later
  }
}
