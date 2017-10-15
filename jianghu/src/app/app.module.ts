import './rxjs-extensions';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedAppComponents } from './app-routing.module';
import { ArticlesModule } from './articles/articles.module';
import { HttpClientModule } from '@angular/common/http';
import { API } from './services/api';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { store, IAppState } from './store';
import { AuthGuard } from './services/auth-guard';

import { UserService } from './services/user.service';
import { ArticlesService } from './services/articles.service';

import { UserActions } from './actions/user';
import { ArticlesActions } from './actions/articles';
import { WindowService } from './services/window.service';
import { AddArticleModalComponent } from './shared/add-article-modal.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    routedAppComponents
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgReduxModule,
    SharedModule,
    AppRoutingModule,
    ArticlesModule,
  ],
  providers: [
    API,
    UserService,
    AuthGuard,
    WindowService,
    ArticlesService,

    ArticlesActions,
    UserActions
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>, private userService: UserService) {
    ngRedux.provideStore(store);
    if (this.userService.isLoggedIn()) {
      this.userService.login().subscribe();
    }
  }
}
