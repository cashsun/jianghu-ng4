import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { routedArticlesComponents, ArticlesRoutingModule } from './articles-routing.module';

@NgModule({
  declarations: [
    routedArticlesComponents,
  ],
  imports: [
    ArticlesRoutingModule,
    CommonModule
  ],
  providers: [
    NgTemplateOutlet
  ],
})
export class ArticlesModule {
}
