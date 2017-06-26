import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PrototypeViewerComponent } from './components/prototypeViewer.component';
import { ArticlesComponent } from './components/articles.component';
import { BonfireComponent } from './components/bonfire.component';

const appRoutes: Routes = [
  { path: '', component: ArticlesComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'bonfire', component: BonfireComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PrototypeViewerComponent,
    BonfireComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
