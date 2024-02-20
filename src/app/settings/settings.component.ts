import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent implements OnInit {
    userData: any;
    async ngOnInit(){
      this.userData = await this.service.getUserData();
    }
    constructor(private service: FirebaseService){}
    signOutButtonClicked(){
      this.service.signOut();
    }
}
