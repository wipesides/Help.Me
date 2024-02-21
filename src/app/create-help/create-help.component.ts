import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { Post } from '../post';
import { FirebaseService } from '../firebase.service';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';
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
  loadedFileName= 'No files have been uploaded';
  createHelpForm = new FormGroup({
    postTitle: new FormControl(""),
    postBody: new FormControl(""),
    attachments: new FormControl(""),
  })
  constructor(private service: FirebaseService, private router: Router){}
  async submitCreateHelpForm() {
    const user = getAuth();
    const nameSurname = user.currentUser!.displayName!;
    let newPost: Post | null = null;
    let attachments: any;
    if (this.createHelpForm.value.postTitle && this.createHelpForm.value.postBody){
      const date = new Date();
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      newPost = {
        id: "",
        user: nameSurname,
        date: formattedDate,
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
    else if (newPost){
      await this.service._createPost(newPost);
    }
    else {
      console.error("Post cannot be sent!");
    }
    this.router.navigate(['/home']);
    }
    onFileUpload(event: Event){
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0){
        this.loadedFileName = target.files[0].name;
      }
    }
  }
