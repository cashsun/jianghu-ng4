import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArticlesComponent } from './articles.component';
import { ArticleCardComponent } from './article-card.component';
import { ArticleComponent } from './article.component';
import { AuthGuard } from '../services/auth-guard';
import { ArticleCardAddComponent } from './article-card-add.component';
import { AddArticleModalComponent } from '../shared/add-article-modal.component';

const articleRoutes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'article/:uaid',
    component: ArticleComponent,
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticlesRoutingModule {
}

export const routedArticlesComponents = [
  ArticlesComponent,
  ArticleCardComponent,
  ArticleCardAddComponent,
  ArticleComponent
];


