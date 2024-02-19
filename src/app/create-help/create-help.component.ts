import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { Post } from '../post';
import { FirebaseService } from '../firebase.service';
@Component({
  selector: 'app-create-help',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-help.component.html',
  styleUrl: './create-help.component.css'
})
export class CreateHelpComponent {
  createHelpForm = new FormGroup({
    postTitle: new FormControl(""),
    postBody: new FormControl(""),
    attachments: new FormControl(""),
  })
  constructor(private service: FirebaseService){}
  async submitCreateHelpForm(){
    let newPost: Post | null = null;
    let attachments: any;
    if (this.createHelpForm.value.postTitle && this.createHelpForm.value.postBody){
      newPost = {
        id: "",
        user: "",
        date: "",
        postTitle: this.createHelpForm.value.postTitle,
        postBody: this.createHelpForm.value.postBody,
      }
    }
    else {
      alert("Please do not leave title and the body empty!")
    }
    if (this.createHelpForm.value.attachments){
      attachments = this.createHelpForm.value.attachments;
    }
    if (newPost && attachments) {
      await this.service._createPost(newPost,attachments);
    }
    else {
      console.error("Post cannot be sent!");
    }
    }
  }
