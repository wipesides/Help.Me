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
  filteredPosts: any[] = [];
  allPosts: any[] = [];
  searchForm = new FormGroup({
    search: new FormControl("")
  })
  constructor(private service: FirebaseService){}
  async ngOnInit(){
    this.allPosts = await this.service.getPosts();
  }
  filterPosts(){
    this.filteredPosts = this.allPosts.filter(post => {
      post.postTitle.includes(this.searchForm.value.search) || post.postBody.includes(this.searchForm.value.search)
    });
  }
}
