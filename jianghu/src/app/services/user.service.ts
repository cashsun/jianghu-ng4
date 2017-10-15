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
    return !!this.api.getToken();
  }

  logout() {
    this.api.logout();
    this.userActions.removeUser();
  }

  login(email?, password?) {
    return this.api.login(email, password)
      .map(data => {
          if (data.user) {
            this.userActions.setUser(data.user);
          }
          return data
        }
      );
  }
}
