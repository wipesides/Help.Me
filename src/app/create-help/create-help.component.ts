import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { Post } from '../post';
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
  constructor(){}
  submitCreateHelpForm(){
    if (this.createHelpForm.value.postTitle && this.createHelpForm.value.postBody){
      const post: Post = {
        id: "",
        user: "",
        date: "",
        postTitle: this.createHelpForm.value.postTitle,
        postBody: this.createHelpForm.value.postBody,
      }
    }
  }
}
