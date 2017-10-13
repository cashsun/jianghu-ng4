import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { pipe, sortBy, prop, values, map } from 'ramda';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IArticle } from '../types/models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WindowService } from '../services/window.service';
const DOMAIN_PREFIX = /http.*:\/\//;
declare const $: any;
const toSourceText = (uArticle) => {
  if (uArticle.author && uArticle.author.length > 0) {
    return uArticle.author.join(',');
  } else {
    return uArticle.url.replace(DOMAIN_PREFIX, '').split('/')[0];
  }
};

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {
  loading = false;
  loadingError: string;
  sourceText: string;
  safeContent: SafeHtml;
  article: IArticle;
  pageMargin: number;

  @select(['user', '_id'])
  private readonly uid$: Observable<string>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private articleService: ArticlesService,
              private sanitizer: DomSanitizer,
              private windowService: WindowService) {
  }


  ngOnInit() {
    this.route.params
      .map(prop('uaid'))
      .filter(uaid => !!uaid)
      .subscribe(
        (uaid: string) => {
          this.loading = true;
          this.loadingError = null;
          this.articleService.fetchArticle(uaid)
            .subscribe(
              article => {
                $('head > title').val(article.title);
                this.article = article;
                this.sourceText = toSourceText(article);
                this.safeContent = this.sanitizer.bypassSecurityTrustHtml(article.content);
              },
              err => this.loadingError = `${err.status}:${err.statusText}`
            )
            .add(() => this.loading = false);

        }
      );

    this.windowService.width$
      .subscribe(width => {
        if (width > 700) {
          this.pageMargin = (width - 700) / 2;
        } else {
          this.pageMargin = 20;
        }
      });

  }

}
