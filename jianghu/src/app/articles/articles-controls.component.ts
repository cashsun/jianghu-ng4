import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
declare const $: any;

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

@Component({
  selector: 'app-articles-controls',
  templateUrl: './articles-controls.component.html',
  styleUrls: ['./articles-controls.component.less']
})
export class ArticlesControlsComponent implements OnInit, OnDestroy {

  selectedGroup: string;
  url: string;
  urlInputError = 'disabled';
  isFavourite: boolean;
  fetchingArticle = false;
  @ViewChild('addArticleModal')
  private readonly addArticleModal: ElementRef;

  @select(['user', '_id'])
  readonly uid$: Observable<string>;
  private uid: string;
  private sub: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private articlesService: ArticlesService) {
  }

  ngOnInit() {
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
      .subscribe();
  }

  onClickFilter(group, fav) {
    if (!fav) {
      fav = null;
    }
    this.router.navigate(['articles'], { queryParams: { group, fav } })
  }

  isUrlValid() {
    console.log('url valid?', URL_REGEX.test(this.url), this.url);
    return URL_REGEX.test(this.url);
  }

  onInputUrl(url) {
    this.url = url;
    this.urlInputError = this.isUrlValid() ? '' : 'disabled';
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onOpenAddArticleModal() {
    $(this.addArticleModal.nativeElement)
      .modal('show');
  }

  onAddArticleSubmit(hideModal) {
    if (this.uid && this.isUrlValid()) {
      this.fetchingArticle = true;
      if (hideModal) {
        $(this.addArticleModal.nativeElement).modal('hide');
      }
      this.articlesService.fetchArticleForUser(this.url, this.uid)
        .subscribe()
        .add(() => this.fetchingArticle = false);
    }
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
