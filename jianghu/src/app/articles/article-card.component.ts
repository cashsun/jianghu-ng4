import {
  Component, Input, AfterViewInit, OnInit, ViewChild, ElementRef, OnChanges,
  AfterViewChecked, AfterContentInit
} from '@angular/core';
import { pipe, sortBy, prop, values } from 'ramda';
import { IUserArticle } from '../types/models';
import { Observable } from 'rxjs/Observable';
import dateFormat from 'dateformat';
import { ArticlesService } from '../services/articles.service';
const DOMAIN_PREFIX = /http.*:\/\//;

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
  dimmerContext = this;

  constructor(private articlesService: ArticlesService) {
  }

  ngOnInit() {
    if (this.uArticle.author && this.uArticle.author.length > 0) {
      this.sourceText = this.uArticle.author.join(',');
    } else {
      this.sourceText = this.uArticle.url.replace(DOMAIN_PREFIX, '').split('/')[0];
    }
    this.formatteddate = dateFormat(this.uArticle.date, 'fullDate');
  }

  ngAfterViewChecked() {
    $(this.dimmer.nativeElement).dimmer({
      on: 'hover'
    });
  }


  onClickBookmarkButton() {
    console.log('click bookmark');
  }

  onClickArchiveButton() {
    console.log('click archive');
    const updated = { _id: this.uArticle._id, group: 'archived' };
    this.loading = true;
    this.articlesService.updateUserArticle(updated)
      .subscribe()
      .add(() => this.loading = false);
  }

  onClickFavButton() {
    console.log('click fav');
  }

  onClickRemoveButton() {
    console.log('click remove');
  }

  onImageLoadError() {
    this.uArticle.image = null;
  }

}
