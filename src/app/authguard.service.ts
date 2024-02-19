import { Injectable,inject } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  constructor(private router: Router){}
  canActivate(){
    const auth = getAuth();
    if (auth.currentUser){
      return true;
    }
    else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
