import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatSelectModule} from '@angular/material/select'
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormField,
    MatInputModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(){}
}
