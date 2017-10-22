import { RouterModule } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { IUserArticle } from '../types/models';
import { sandboxOf } from 'angular-playground';
import { ArticleCardComponent } from './article-card.component';
import { omit, clone } from 'ramda';

const fakeUArticle: IUserArticle = {
  _id: 'foo_id',
  userId: 'foo_userid',
  title: 'This is a title',
  description: 'foo_description',
  author: ['Cash', 'Ross', 'Manuel'],
  date: new Date().toString(),
  url: 'https://bbc.co.uk',
  group: 'unread',
  image: 'https://cdn-images-1.medium.com/max/1200/1*Ip2wzB5pTMI9INuDclbPhA.png'
}

const fakeUArticleNoImage = omit(['image'])(fakeUArticle);
const fakeUArticleFavourite = Object.assign({}, fakeUArticle, { favourite: true });

const context = {
  fakeUArticle,
  fakeUArticleNoImage,
  fakeUArticleFavourite
};

export default sandboxOf(ArticleCardComponent, {
  imports: [
    RouterModule.forRoot([]),
  ],
  providers: [
    ArticlesService
  ],
  declareComponent: true
})
  .add('unread with image', {
    template: `
    unread with image
    <app-article-card
      [uArticle]="fakeUArticle"
    >
    </app-article-card>
    `,
    context
  })
  .add('unread favourite', {
    template: `
    unread favourite
    <app-article-card
      [uArticle]="fakeUArticleFavourite"
    >
    </app-article-card>
    `,
    context
  })
  .add('unread with no image (show description instead)', {
    template: `
    unread with no image (show description instead)
    <app-article-card
      [uArticle]="fakeUArticleNoImage"
    >
    </app-article-card>
    `,
    context
  });
