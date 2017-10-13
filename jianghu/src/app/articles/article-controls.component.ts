import { Component, OnInit, OnDestroy } from '@angular/core';
import { pipe, sortBy, prop, values, map } from 'ramda';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IUserArticle } from '../types/models';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';
declare const $: any;

interface IParams {
  uaid: string
}

@Component({
  selector: 'app-article-controls',
  templateUrl: './article-controls.component.html',
  styleUrls: ['./article-controls.component.less']
})
export class ArticleControlsComponent implements OnInit, OnDestroy {

  @select(['user', '_id'])
  readonly uid$: Observable<string>;
  loading = false;

  private uArticle: IUserArticle;
  private uid: string;
  private sub: Subscription;

  constructor(private articlesService: ArticlesService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    const uid$ = this.uid$
      .first(uid => !this.userService.isLoggedIn() || !!uid)
      .map(uid => this.uid = uid);

    const uArticle$ = this.route.firstChild
      .params
      .filter(prop('uaid'))
      .map((params: IParams) => {
        const { uaid } = params;
        this.uArticle = this.articlesService.getUserArticle(uaid);
        if (!this.uArticle) {
          this.loading = true;
          this.articlesService.fetchUserArticle(params.uaid)
            .subscribe(uArticle => this.uArticle = uArticle)
            .add(() => this.loading = false);
        }
      });

    this.sub = uid$.merge(uArticle$)
      .subscribe();

  }

  hasAdded() {
    return this.uid && this.uArticle && this.uArticle.userId === this.uid;
  }

  isFav() {
    return this.hasAdded() && this.uArticle.favourite;
  }

  isUnread() {
    return this.hasAdded() && this.uArticle.group === 'unread'
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
