import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { select } from '@angular-redux/store';
import { last } from 'lodash';
import { NgForm } from '@angular/forms';

interface ExpectedParam {
  afterLogin?: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  password: string;
  email: string;

  errorMessage: string;
  loading = false;
  redirectTo: string;

  constructor(private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService.logout();
    this.route.queryParams.subscribe((params: ExpectedParam) => {
      this.redirectTo = params.afterLogin;
    });
  }

  onSignupError(err: HttpErrorResponse) {
    this.errorMessage = `${err.status}. `;
    if (err.error) {
      this.errorMessage += `Reason: ${JSON.parse(err.error).message}`;
    }
  }

  isSignupButtonDisabled() {
    return false;
  }

  onSubmit(f: NgForm) {
    if (!f.value.firstname) {
      return this.errorMessage = '请输入名字。';
    }

    if (!f.value.lastname) {
      return this.errorMessage = '请输入姓氏。';
    }

    if (!f.value.email) {
      return this.errorMessage = '请输入邮箱。';
    }

    if (!f.value.password || f.value.password.length <= 3) {
      return this.errorMessage = '请输入不少入3个字符的密码。';
    }

    if (f.value.passwordValidate !== f.value.password) {
      return this.errorMessage = '两次密码不匹配。';
    }
    this.errorMessage = '';

    this.loading = true;
    this.userService.signup(f.value)
      .subscribe(
      () => {
        this.router.navigate([this.redirectTo || 'articles']);
      },
      err => {
        this.errorMessage = `Sign up failed: ${err.status}`;
      })
      .add(() => this.loading = false)
  }

}
