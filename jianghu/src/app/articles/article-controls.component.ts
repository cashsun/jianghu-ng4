import { Component, OnInit, OnDestroy } from '@angular/core';
import { prop, omit } from 'ramda';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { select, select$ } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IUserArticle } from '../types/models';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs/Subscription';
declare const $: any;

@Component({
  selector: 'app-article-controls',
  templateUrl: './article-controls.component.html',
  styleUrls: ['./article-controls.component.less']
})
export class ArticleControlsComponent implements OnInit, OnDestroy {

  @select(['user', '_id'])
  readonly uid$: Observable<string>;
  @select(['articles', 'items'])
  readonly uArticles$: Observable<{ [key: string]: IUserArticle }>;

  loading = false;

  private uArticle: IUserArticle;
  private uid: string;
  private path: string;
  private sub: Subscription;

  constructor(private articlesService: ArticlesService,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.fetchUserArticle();
    const uid$ = this.uid$
      .first(uid => !this.userService.isLoggedIn() || !!uid)
      .map(uid => this.uid = uid);

    const uArticle$ = this.uArticles$
      .map(items => {
        const uaid = this.route.firstChild.snapshot.params.uaid;
        this.uArticle = items[uaid];
      });

    this.path = this.route.firstChild.snapshot.url.map(prop('path')).join('/');

    this.sub = uid$.merge(uArticle$)
      .subscribe();

  }

  fetchUserArticle() {
    const uaid = this.route.firstChild.snapshot.params.uaid;
    if (!this.articlesService.getUserArticle(uaid)) {
      this.loading = true;
      this.articlesService.fetchUserArticle(uaid)
        .subscribe()
        .add(() => this.loading = false);
    }
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

  onClickRemoveAdd() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['login'], { queryParams: { afterLogin: this.path } })
    } else {
      this.loading = true;
      if (this.hasAdded()) {
        this.articlesService.removeUserArticle(this.uArticle._id)
          .subscribe()
          .add(() => this.loading = false);
      } else {
        this.articlesService.fetchArticleForUser(this.uArticle.url, this.uid)
          .subscribe()
          .add(() => this.loading = false);
      }

    }
  }

  onClickFavButton() {
    if (this.hasAdded()) {
      this.articlesService
        .updateUserArticle({ _id: this.uArticle._id, favourite: !this.uArticle.favourite })
        .subscribe();
    }
  }

  onClickArchiveBookmark() {
    if (this.hasAdded()) {
      const group = this.uArticle.group === 'unread' ? 'archived' : 'unread';
      this.articlesService
        .updateUserArticle({ _id: this.uArticle._id, group })
        .subscribe(() => {
          if (group === 'archived') {
            this.router.navigate(['articles']);
          }
        });
    }
  }

  onClickShare() {
    alert('coming soon!');
  }

}
