import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from './users.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private usersService: UsersService, public router: Router) {}
  canActivate(): boolean {
    if (!this.usersService.isAuthenticated()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
