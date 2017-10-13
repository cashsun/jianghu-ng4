import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    if (this.userService.isLoggedIn()) {
      return true;
    }

    console.log('Not logged in. Redirecting...');
    this.router.navigate(['login'],
      { queryParams: { afterLogin: route.url[0].path } }
    );
    return false;
  }
}

