import { HttpClientModule } from '@angular/common/http';
import './rxjs-extensions';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule, routedAppComponents } from './app-routing.module';
import { ArticlesModule } from './articles/articles.module';
import { API } from './services/api';
import { NgReduxModule, NgRedux } from '@angular-redux/store';
import { store, IAppState } from './store';
import { AuthGuard } from './services/auth-guard';

import { UserService } from './services/user.service';
import { ArticlesService } from './services/articles.service';

import { UserActions } from './actions/user';
import { ArticlesActions } from './actions/articles';
import { WindowService } from './services/window.service';
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
  constructor(ngRedux: NgRedux<IAppState>, private userService: UserService, private router: Router) {
    ngRedux.provideStore(store);

    if (this.userService.isLoggedIn()) {
      this.userService.login().subscribe(
        () => { },
        err => {
          userService.logout();
          router.navigate(['login']);
        }
      )
    }
  }
}
