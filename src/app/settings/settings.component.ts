import { Component, ViewEncapsulation} from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
    constructor(private service: FirebaseService){}
    signOutButtonClicked(){
      this.service.signOut();
    }
}
