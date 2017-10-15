import {
  Component, Input, OnInit, ViewChild, ElementRef,
  AfterViewChecked, AfterViewInit,
} from '@angular/core';
import { pipe, sortBy, prop, values } from 'ramda';
import { IUserArticle } from '../types/models';
import dateFormat from 'dateformat';
import { ArticlesService } from '../services/articles.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select } from '@angular-redux/store';

declare const $;


@Component({
  selector: 'app-article-card-add',
  templateUrl: './article-card-add.component.html',
  styleUrls: ['./article-card.component.less']
})
export class ArticleCardAddComponent implements OnInit {
  loadingArticle = false;

  @ViewChild('addBtn')
  readonly addBtn: ElementRef;

  @select(['user', '_id'])
  readonly uid$: Observable<string>;
  uid: string;

  openAddArticleModal$: Observable<any>;
  onSubmit: (fetch$: Subscription) => {};

  constructor() {
  }

  ngOnInit() {
    this.onSubmit = this.handleSubmit.bind(this);
    this.uid$.subscribe(uid => this.uid = uid);
    this.openAddArticleModal$ = Observable.fromEvent(
      $(this.addBtn.nativeElement), 'click'
    );
  }

  handleSubmit(fetch$) {
    this.loadingArticle = true;
    fetch$.add(() => this.loadingArticle = false);
  }

}
