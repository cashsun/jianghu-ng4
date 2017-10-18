import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';

const namespace = 'USER';
export const SET_USER = `${namespace}/SET_USER`;
export const REMOVE_USER = `${namespace}/REMOVE_USER`;

@Injectable()
export class UserActions {
  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  setUser(user) {
    this.ngRedux.dispatch({
      type: SET_USER,
      user
    });
    return user;
  }

  removeUser() {
    this.ngRedux.dispatch({
      type: REMOVE_USER
    })
  }

}

