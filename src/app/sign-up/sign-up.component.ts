import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormControl} from '@angular/forms';
import { IUser } from '../i-user';
import { FirebaseService } from '../firebase.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(private service: FirebaseService){}
  submitSignUpForm(){
    if (this.signUpForm.value.name && this.signUpForm.value.surname && this.signUpForm.value.email && this.signUpForm.value.phoneNumber && this.signUpForm.value.password){
      const user: IUser = {
        id: "",
        name: this.signUpForm.value.name,
        surname: this.signUpForm.value.surname,
        email: this.signUpForm.value.email,
        phoneNumber: this.signUpForm.value.phoneNumber,
        password: this.signUpForm.value.phoneNumber,
      }
      this.service._signUp(user);
    }
  }
}
