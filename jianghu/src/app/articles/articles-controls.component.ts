import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ArticlesService } from '../services/articles.service';
declare const $: any;


@Component({
  selector: 'app-articles-controls',
  templateUrl: './articles-controls.component.html',
  styleUrls: ['./articles-controls.component.less']
})
export class ArticlesControlsComponent implements OnInit, OnDestroy {

  selectedGroup: string;
  isFavourite: boolean;
  fetchingArticle = false;
  @ViewChild('openModalButton')
  readonly openModalButton: ElementRef;
  @ViewChild('searchInput')
  readonly searchInput: ElementRef;

  @select(['user', '_id'])
  readonly uid$: Observable<string>;
  private sub: Subscription;
  uid: string;
  openAddArticleModal$: Observable<any>;
  handleSubmit: (fetch$: Subscription) => {};

  constructor(private router: Router,
              private route: ActivatedRoute,
              private articlesService: ArticlesService) {
  }

  ngOnInit() {
    this.handleSubmit = this.onSubmit.bind(this);
    this.sub = this.route.queryParams
      .map(query => {
        const { fav, group } = query;
        this.selectedGroup = group;
        this.isFavourite = !!fav;
      })
      .merge(
        this.uid$
          .first(uid => !!uid)
          .map(uid => this.uid = uid)
      )
      .merge(
        Observable.fromEvent($(this.searchInput.nativeElement), 'input')
          .debounceTime(500)
          .map(({target}) => this.articlesService.setSearch(target.value))
      )
      .subscribe();
    this.openAddArticleModal$ = Observable.fromEvent($(this.openModalButton.nativeElement), 'click');
  }

  onSubmit(fetch$) {
    this.fetchingArticle = true;
    fetch$.add(() => {
      this.fetchingArticle = false;
    });
  }

  onClickFilter(group, fav) {
    if (!fav) {
      fav = null;
    }
    this.router.navigate(['articles'], { queryParams: { group, fav } })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isActive(key) {
    let active = false;
    switch (key) {
      case 'archived':
        active = this.selectedGroup === key;
        break;
      case 'fav':
        active = this.isFavourite;
        break;
      default:
        active = this.selectedGroup !== 'archived';
    }

    return active ? 'active' : '';
  }
}
