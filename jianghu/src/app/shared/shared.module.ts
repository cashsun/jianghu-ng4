import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddArticleModalComponent } from './add-article-modal.component';

@NgModule({
  declarations: [
    AddArticleModalComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    AddArticleModalComponent,
  ]
})
export class SharedModule { }
