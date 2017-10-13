import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare const $: any;

const $window = $(window);

@Injectable()
export class WindowService {

  width$: Observable<number>;
  isMobile$: Observable<boolean>;

  constructor() {
    const resizeEvent$ = Observable.fromEvent($window, 'resize')
      .debounceTime(200)
      .map(() => $window.width());

    this.width$ = Observable.from([this.getWidth()])
      .concat(resizeEvent$);

    this.isMobile$ = Observable.fromEvent($window, 'resize')
      .debounceTime(200)
      .map(() => $window.width() < 768);

  }

  getWidth() {
    return $window.width();
  }

}
