import { NgModule } from '@angular/core';
import { AddArticleModalComponent } from './add-article-modal.component';

@NgModule({
  declarations: [
    AddArticleModalComponent
  ],
  exports: [
    AddArticleModalComponent
  ]
})
export class SharedModule {
}
