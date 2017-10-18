import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, select$ } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { pipe, sortBy, prop, values, not, isEmpty } from 'ramda';
import { IUserArticle, IMatch, IArticles } from '../types/models';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { WindowService } from '../services/window.service';
import { Subscription } from 'rxjs/Subscription';

const dateDesc = (i) => -new Date(i.date);

const By = (match) =>
  i => (match.fav && i.favourite || true) && i.group === match.group;

const byText = (s) =>
  i => s ? new RegExp(`.*${s}.*`, 'i').test(i.title) : true;

export const toItemList = (items$: Observable<IArticles>) =>
  items$
    .map(({ items, match, search }) =>
      values(items).filter(By(match)).filter(byText(search))
    )
    .map(sortBy(dateDesc));


export const getMatch$ = (match$: Observable<IMatch>) => {
  return match$
    .map(({ group, fav }) => {
      if (fav) {
        return { group, favourite: fav };
      }
      return { group };
    });

};

const COLUMNS = {
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six'
};

function getNumOfColumns(windowWidth) {
  const column = Math.round(windowWidth / 280);

  if (column < 3) {
    return 'three';
  } else if (column > 6) {
    return 'six';
  } else {
    return COLUMNS[column];
  }
}

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less']
})
export class ArticlesComponent implements OnInit, OnDestroy {
  private uid: string;
  private sub: Subscription;
  @select(['user', '_id'])
  private readonly uid$: Observable<string>;
  @select$(['articles'], toItemList)
  readonly visibleArticles$: Observable<IUserArticle[]>;

  @select$(['articles', 'match'], getMatch$)
  readonly match$: Observable<IMatch>;

  @select(['articles', 'search'])
  readonly search$: Observable<string>;

  numOfColumns: string;
  loadingArticles = true;

  constructor(private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private windowService: WindowService,
    private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('江湖');
    const resize$ = this.windowService.width$
      .map(width => this.numOfColumns = getNumOfColumns(width));

    const params$ = this.route.queryParams
      .map(query => {
        const group = query.group || 'unread';
        const fav = query.fav === 'true';
        this.articlesService.setMatch({ group, fav })
      });

    const uid$ = this.uid$
      .first(v => !!v)
      .map(uid => this.uid = uid);

    const match$ = this.match$
      .map(match => this.fetchArticles(this.uid, match));

    this.sub = resize$
      .merge(params$)
      .merge(uid$.concat(match$))
      .subscribe();
  }

  fetchArticles(uid, match?) {
    if (uid) {
      this.loadingArticles = true;
      return this.articlesService.fetchArticles(uid, match)
        .subscribe()
        .add(() => this.loadingArticles = false);
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
