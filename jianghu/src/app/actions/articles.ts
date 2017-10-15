import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../store';

export const namespace = 'articles';
export const SET_ARTICLES = `${namespace}/SET_ARTICLES`;
export const REMOVE_ARTICLE = `${namespace}/REMOVE_ARTICLE`;
export const UPSERT_ARTICLE = `${namespace}/UPSERT_ARTICLE`;
export const SET_GROUP = `${namespace}/SET_FILTER`;
export const SET_FAV = `${namespace}/SET_FAV`;
export const SET_MATCH = `${namespace}/SET_MATCH`;
export const SET_SEARCH = `${namespace}/SET_SEARCH`;

@Injectable()
export class ArticlesActions {
  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  setArticles(articles) {
    this.ngRedux.dispatch({
      type: SET_ARTICLES,
      articles
    });
    return articles;
  }

  removeArticle(uaid: string) {
    this.ngRedux.dispatch({
      type: REMOVE_ARTICLE,
      uaid
    })
  }

  upsertArticle(article) {
    this.ngRedux.dispatch({
      type: UPSERT_ARTICLE,
      article
    });
    return article;
  }

  setGroup(filter: string) {
    this.ngRedux.dispatch({
      type: SET_GROUP,
      filter
    })
  }

  setFav(fav: boolean) {
    this.ngRedux.dispatch({
      type: SET_FAV,
      fav
    })
  }

  setMatch(match) {
    this.ngRedux.dispatch({
      type: SET_MATCH,
      match
    });

  }

  getUserArticle(uaid: string) {
    return this.ngRedux.getState().articles.items[uaid];
  }

  setSearch(search: string) {
    this.ngRedux.dispatch({
      type: SET_SEARCH,
      search
    })
  }

}

