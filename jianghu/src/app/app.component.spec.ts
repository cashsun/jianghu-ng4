import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { BonfireComponent } from './components/bonfire.component';
import { By } from '@angular/platform-browser';
import { ArticlesComponent } from './components/articles.component';
const appRoutes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'articles', component: ArticlesComponent }
];
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot(appRoutes)],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
      declarations: [
        AppComponent,
        ArticlesComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it(`should have as sidebarVisible false`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.sidebarVisible).toEqual(false);
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
      const app = fixture.debugElement.componentInstance;
      app.onToggleSidebar = () => {};
      spyOn(app, 'onToggleSidebar');
      fixture.detectChanges();

      fixture.nativeElement
        .querySelector('.ui.sidebar > a.item').click();

      expect(app.onToggleSidebar).toHaveBeenCalled();

    }));
  });


});
