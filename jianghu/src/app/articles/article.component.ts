import { Component, OnInit } from '@angular/core';
import { pipe, sortBy, prop, values, map } from 'ramda';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IArticle } from '../types/models';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { WindowService } from '../services/window.service';
import parse from 'url-parse';
const toSourceText = (uArticle) => {
  if (uArticle.author && uArticle.author.length > 0) {
    return uArticle.author.join(',');
  } else {
    return parse(uArticle.url).hostname;
  }
};

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less'],
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

  constructor(private title: Title,
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
                this.title.setTitle(article.title);
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
