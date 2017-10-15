import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { routedArticlesComponents, ArticlesRoutingModule } from './articles-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    routedArticlesComponents,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ArticlesRoutingModule
  ],
  providers: [
    NgTemplateOutlet
  ],
})
export class ArticlesModule {
}
