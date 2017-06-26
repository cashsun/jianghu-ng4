import { AfterViewInit, Component, OnInit } from '@angular/core';

declare const $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'app';
  sidebarVisible: Boolean = false;
  categories = [
    { name: 'Articles', path: 'articles' },
    { name: 'Bonfire', path: 'bonfire' }
  ];

  ngAfterViewInit() {
    $('.ui.sidebar')
      .sidebar({ context: $('.ui.pushable') })
      .sidebar('setting', 'onVisible', () => this.sidebarVisible = true)
      .sidebar('setting', 'onHide', () => this.sidebarVisible = false);
  }

  onToggleSidebar() {

    $('.ui.sidebar')
      .sidebar('toggle');
  }
}
