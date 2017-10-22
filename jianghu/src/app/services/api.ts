import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IArticle, IUserArticle } from '../types/models';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Buffer } from 'buffer';
import { toPairs } from 'ramda';
declare const localStorage;
const baseUrl = environment.baseUrl;

interface ILoginResponse {
  user: object,
  token: string
}

const KEY = 'hanabi-token';

const getQueryParams = (query: object = {}): HttpParams => {
  let params = new HttpParams();
  toPairs(query).map(param => params = params.set(param[0], param[1]));
  return params;
};

@Injectable()
export class API {
  token = '';

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(KEY);
  }

  private getToken() {
    return this.token;
  }

  private setToken(token: string) {
    this.token = token;
    localStorage.setItem(KEY, token);
  }

  defaultHeader() {
    return new HttpHeaders({ 'hanabi-token': this.getToken() });
  }

  hasToken() {
    return !!this.getToken()
  }

  logout() {
    this.setToken('');
  }

  login(email?: string, password?: string) {
    return this.http.post<ILoginResponse>(`${baseUrl}/api/login`,
      {
        encodedInput: new Buffer(`${email}:${password}`).toString('base64'),
        token: this.token,
      }
    ).map(data => {
      if (data.token) {
        this.setToken(data.token);
      }
      return data;
    });
  }

  signup({email, password, passwordValidate, firstname, lastname}) {
    return this.http.post<ILoginResponse>(`${baseUrl}/api/register`, {
      email,
      password,
      passwordValidate,
      firstname,
      lastname
    }).map(data => {
      if (data.user) {
        this.setToken(data.token);
      }
      return data;
    });
  }

  fetchArticles(uid: string, match?, options?) {
    const query = Object.assign({ userId: uid }, match);
    const body = Object.assign({
      sort: '-date',
      limit: 100,
      query
    }, options);

    return this.http.post<IUserArticle[]>(`${baseUrl}/api/userArticles`,
      body,
      {
        headers: new HttpHeaders({ 'hanabi-token': this.getToken() })
      });
  }

  fetchArticle(uaid: string) {
    return this.http.get<IArticle>(`${baseUrl}/api/article/${uaid}`, {
      headers: new HttpHeaders({ 'hanabi-token': this.getToken() })
    });
  }

  fetchUserArticle(uaid: string) {

    return this.http.get<IUserArticle>(`${baseUrl}/api/userArticles/${uaid}`, {
      headers: this.defaultHeader()
    });
  }

  fetchArticleForUser(url: string, userId: string) {
    return this.http.get<IUserArticle>(`${baseUrl}/api/fetch/article`,
      {
        headers: this.defaultHeader(),
        params: getQueryParams({ url, userId })
      })
  }

  updateUserArticle(uArticle: IUserArticle) {
    return this.http.put(`${baseUrl}/api/userArticles/${uArticle._id}`, uArticle,
      {
        headers: this.defaultHeader()
      })
  }

  removeUserArticle(uaid: string) {
    return this.http.delete(`${baseUrl}/api/userArticles/${uaid}`, {
      headers: this.defaultHeader()
    });
  }
}
