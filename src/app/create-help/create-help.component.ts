import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-help',
  standalone: true,
  imports: [],
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
    
  }
}
