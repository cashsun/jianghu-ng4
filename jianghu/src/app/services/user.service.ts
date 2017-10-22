import { Injectable } from '@angular/core';
import { API } from './api';
import { UserActions } from '../actions/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private api: API,
    private userActions: UserActions) {
  }

  isLoggedIn() {
    return this.api.hasToken();
  }

  logout() {
    this.api.logout();
    this.userActions.removeUser();
  }

  login(email?, password?) {
    return this.api.login(email, password)
      .map(data => {
        if (data.user) {
          return this.userActions.setUser(data.user);
        }
        return Observable.throw('no such user');
      }
      );
  }

  signup(form) {
    return this.api.signup(form)
      .map(data => {
        if (data.user) {
          return this.userActions.setUser(data.user);
        }
      });
  }

}
