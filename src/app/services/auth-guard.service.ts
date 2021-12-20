import {
  CanActivate,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../stores/user/auth.state';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(): boolean {
    const authenticated = this.store.selectSnapshot(AuthState.isAuthenticated);
    if (authenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }      
}
