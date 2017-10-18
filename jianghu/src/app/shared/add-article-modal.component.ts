import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
declare const $: any;

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

@Component({
  selector: 'app-add-article-modal',
  templateUrl: './add-article-modal.component.html',
  styleUrls: ['./add-article-modal.component.less']
})
export class AddArticleModalComponent implements OnInit, OnDestroy {
  @Input() open$: Observable<any>;
  @Input() submit: (fetch: Subscription) => {};
  @Input() uid: string;

  url: string;
  urlInputError = 'disabled';
  @ViewChild('addArticleModal')
  private readonly addArticleModal: ElementRef;

  @ViewChild('urlInput')
  private readonly urlInput: ElementRef;

  private sub: Subscription;

  constructor(private articlesService: ArticlesService) {
  }

  ngOnInit() {
    if (this.open$) {
      this.sub = this.open$
        .subscribe(() => this.onOpenAddArticleModal());
    }
  }

  isUrlValid() {
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
    $(this.urlInput.nativeElement).val('');
  }

  onAddArticleSubmit(hideModal) {
    if (this.uid && this.isUrlValid()) {
      if (hideModal) {
        $(this.addArticleModal.nativeElement).modal('hide');
      }
      const fetch$ = this.articlesService
        .fetchArticleForUser(this.url, this.uid)
        .subscribe();

      if (this.submit) {
        this.submit(fetch$);
      }
    } else {
      if (this.submit) {
        this.submit(Observable.empty().subscribe());
      }
    }

  }
}
