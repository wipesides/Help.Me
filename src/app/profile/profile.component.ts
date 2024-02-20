import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit{
  isHiddenBookmark: boolean = true;
  isHiddenCreated: boolean = true;
  isHiddenDone: boolean = true;
  userData: any;
  bookmarkedHelps: any = [];
  createdHelps: any[] = [];
  doneHelps: any[] = [];
  constructor(private service: FirebaseService){}
  async ngOnInit(){
    this.userData = await this.service.getUserData()
    this.bookmarkedHelps = await this.service.getUserBookmarks(this.userData);
    this.createdHelps = await this.service.getUserPosts(this.userData);
    this.doneHelps = await this.service.getUserHelps(this.userData);
  }
  onBookmarkCheckBoxChange(event: Event){
    const target = event.target as HTMLInputElement;
    if (target.checked){
      this.isHiddenBookmark = !target.checked;
    }
    else {
      this.isHiddenBookmark = !target.checked;
    }
  }
  onCreatedHelpsCheckBoxChange(event: Event){
    const target = event.target as HTMLInputElement;
    if (target.checked){
      this.isHiddenCreated = !target.checked;
    }
    else {
      this.isHiddenCreated = !target.checked;
    }
  }
  onDoneHelpsCheckBoxChange(event: Event){
    const target = event.target as HTMLInputElement;
    if (target.checked){
      this.isHiddenDone = !target.checked;
    }
    else {
      this.isHiddenDone = !target.checked;
    }
  }
}
