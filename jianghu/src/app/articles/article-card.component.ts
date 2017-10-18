import {
  Component, Input, OnInit, ViewChild, ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { pipe, sortBy, prop, values } from 'ramda';
import { IUserArticle } from '../types/models';
import dateFormat from 'dateformat';
import parse from 'url-parse';
import { ArticlesService } from '../services/articles.service';

function domain(url) {
  return parse(url).hostname;
}

declare const $;


@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.less']
})
export class ArticleCardComponent implements AfterViewChecked, OnInit {
  @Input() uArticle: IUserArticle;
  @ViewChild('dimmer') dimmer: ElementRef;

  sourceText: string;
  formatteddate: string;
  loading = false;

  constructor(private articlesService: ArticlesService) {
  }

  ngOnInit() {
    if (this.uArticle.author && this.uArticle.author.length > 0) {
      this.sourceText = this.uArticle.author.join(',');
    } else {
      this.sourceText = domain(this.uArticle.url);
    }
    if (this.uArticle.image && /\.gif$/i.test(this.uArticle.image)) {
      this.uArticle.image = null;
    }

    this.formatteddate = dateFormat(this.uArticle.date, 'fullDate');
  }

  ngAfterViewChecked() {
    $(this.dimmer.nativeElement).dimmer({
      on: 'hover'
    });
  }


  onClickBookmarkButton() {
    const updated = { _id: this.uArticle._id, group: 'unread' };
    this.loading = true;
    this.articlesService.updateUserArticle(updated)
      .subscribe()
      .add(() => this.loading = false);
  }

  onClickArchiveButton() {
    const updated = { _id: this.uArticle._id, group: 'archived' };
    this.loading = true;
    this.articlesService.updateUserArticle(updated)
      .subscribe()
      .add(() => this.loading = false);
  }

  onClickFavButton() {
    const updated = { _id: this.uArticle._id, favourite: !this.uArticle.favourite };
    this.loading = true;
    this.articlesService.updateUserArticle(updated)
      .subscribe()
      .add(() => this.loading = false);
  }

  onClickRemoveButton() {
    this.loading = true;
    this.articlesService.removeUserArticle(this.uArticle._id)
      .subscribe()
      .add(() => this.loading = false);
  }

  onImageLoadError() {
    this.uArticle.image = null;
  }

}
