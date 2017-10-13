import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { last } from 'lodash';

interface ExpectedParam {
  afterLogin?: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @select(['user'])
  readonly user$;

  password: string;
  email: string;

  loginErrorMessage: string;
  loading = false;
  redirectTo: string;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
    route.queryParams.subscribe((params: ExpectedParam) => {
      this.redirectTo = params.afterLogin;
    });
  }

  onLoginError(err: HttpErrorResponse) {
    this.loginErrorMessage = `${err.status}. `;
    if (err.error) {
      this.loginErrorMessage += `Reason: ${JSON.parse(err.error).message}`;
    }
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  isLoginButtonDisabled() {
    return !this.email || !this.password || this.loading;
  }

  onClickLogin() {
    if (!this.isLoginButtonDisabled()) {
      this.loading = true;
      this.loginErrorMessage = null;
      this.userService.logout();
      this.userService.login(this.email, this.password)
        .subscribe(
          () => {
            this.router.navigateByUrl(this.redirectTo || 'articles');
          },
          err => this.onLoginError(err)
        )
        .add(() => this.loading = false);
    }

  }

  onClickLogout() {
    this.userService.logout();
  }

}
