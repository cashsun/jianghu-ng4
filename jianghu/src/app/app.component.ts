import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { prop } from 'ramda';
declare const $: any;
const categories = [
  { name: '读文', path: 'articles', menuItem: true },
  { name: null, path: 'article' },
  { name: '江湖', path: 'bonfire', menuItem: true },
  { name: '账号', path: 'login', menuItem: true }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar: ElementRef;

  title = 'app';
  currentCategory$: Observable<string>;
  visibleControls: string;
  menuItems = categories.filter(prop('menuItem'));

  constructor(private router: Router) {
  }

  ngAfterViewInit() {
    this.setupSidebar();
    this.setupCurrentCategory();
  }

  setupSidebar() {
    $(this.sidebar.nativeElement)
      .sidebar({ context: $('.ui.pushable') });
  }

  setupCurrentCategory() {
    this.currentCategory$ = this.router.events
      .filter(e => e instanceof RoutesRecognized)
      .map((e: RoutesRecognized) => {
        const path = e.state.root.firstChild.url[0].path;
        return categories.find(c => c.path === path);
      })
      .filter(c => !!c)
      .map(category => {
        this.visibleControls = category.path;
        return category.name
      });
  }

  onToggleSidebar() {
    $(this.sidebar.nativeElement)
      .sidebar('toggle');
  }
}
