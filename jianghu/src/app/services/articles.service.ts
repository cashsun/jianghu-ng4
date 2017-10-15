import { Injectable } from '@angular/core';
import { API } from './api';
import { indexBy, prop } from 'ramda';
import { ArticlesActions } from '../actions/articles';
import { Observable } from 'rxjs/Observable';
import { IUserArticle } from '../types/models';

const DOMAIN_PREFIX = /http.*:\/\//;

@Injectable()
export class ArticlesService {

  constructor(private api: API,
              private articlesActions: ArticlesActions) {
  }

  fetchArticles(uid: string, match?) {
    return this.api.fetchArticles(uid, match)
      .map(indexBy(prop('_id')))
      .map(articlesMap => this.articlesActions.setArticles(articlesMap));
  }

  updateUserArticle(uArticle) {
    return this.api.updateUserArticle(uArticle)
      .map(() => this.articlesActions.upsertArticle(uArticle));
  }

  fetchArticle(uaid: string) {
    return this.api.fetchArticle(uaid);
  }

  setMatch(match) {
    this.articlesActions.setMatch(match);
  }

  getUserArticle(uaid: string) {
    return this.articlesActions.getUserArticle(uaid);
  }

  fetchUserArticle(uaid: string): Observable<IUserArticle> {
    return this.api.fetchUserArticle(uaid)
      .map(uArticle => this.articlesActions.upsertArticle(uArticle));
  }

  fetchArticleForUser(url: string, uid: string) {
    return this.api.fetchArticleForUser(url, uid)
      .map(uArticle => this.articlesActions.upsertArticle(uArticle))

  }

  removeUserArticle(uaid: string) {
    return this.api.removeUserArticle(uaid)
      .map(() => this.articlesActions.removeArticle(uaid));
  }

  setSearch(search: string) {
    return this.articlesActions.setSearch(search);
  }

}
