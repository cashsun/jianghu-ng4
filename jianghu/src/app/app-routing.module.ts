import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ArticlesControlsComponent } from './articles/articles-controls.component';
import { ArticleControlsComponent } from './articles/article-controls.component';
import { AddArticleModalComponent } from './shared/add-article-modal.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'articles' },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  // { path: '**', component: notfoundcomponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

export const routedAppComponents = [
  LoginComponent,
  ArticlesControlsComponent,
  ArticleControlsComponent
];
