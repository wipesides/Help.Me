import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private service: FirebaseService){
    console.log(service);
  }
  async submitSignInForm(){
    console.log("Hello");
    if (this.signInForm.value.email && this.signInForm.value.password){
      await this.service._signIn(this.signInForm.value.email,this.signInForm.value.password);
    }
    else{
      alert("Enter both the mail and the password!");
    }
  }
}
