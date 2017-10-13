import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ArticlesControlsComponent } from './articles/articles-controls.component';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgReduxModule } from '@angular-redux/store';
import { ArticlesService } from './services/articles.service';
import { API } from './services/api';
import { ArticlesActions } from './actions/articles';

@Component({
  selector: 'app-dummy',
  template: '',
  styleUrls: ['./app.component.less']
})
class DummyComponent {
}

const appRoutes: Routes = [
  { path: '', component: DummyComponent },
  { path: 'articles', component: DummyComponent },
  { path: 'bonfire', component: DummyComponent }
];
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        NgReduxModule
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        ArticlesService,
        ArticlesActions,
        API
      ],
      declarations: [
        AppComponent,
        DummyComponent,
        ArticlesControlsComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it(`should have as onToggleSidebar set`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.onToggleSidebar instanceof Function).toEqual(true);
  }));

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const routeOutlet = fixture.debugElement.nativeElement
      .querySelectorAll('router-outlet');
    expect(routeOutlet.length).toEqual(1);
  });

  describe('child: sidebar', () => {
    it('should render sidebar', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('.ui.sidebar').length).toEqual(1);
    }));

    it('should render sidebar and attach toggle callback', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.onToggleSidebar = () => {
      };
      spyOn(app, 'onToggleSidebar');
      fixture.detectChanges();

      const items = fixture.nativeElement
        .querySelectorAll('.ui.sidebar > a.item');

      items[0].click();

      expect(app.onToggleSidebar).toHaveBeenCalledTimes(1);
      return app.currentCategory$
        .subscribe(current => expect(current).toEqual('读文'));
    }));

    it('click other item on the sidebar should work as expected.', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      app.onToggleSidebar = () => {
      };
      spyOn(app, 'onToggleSidebar');
      fixture.detectChanges();

      const items = fixture.nativeElement
        .querySelectorAll('.ui.sidebar > a.item');

      items[1].click();

      expect(app.onToggleSidebar).toHaveBeenCalledTimes(1);
      return app.currentCategory$
        .subscribe(current => expect(current).toEqual('江湖'));
    }));

  });


});
