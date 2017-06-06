import { JianghuPage } from './app.po';

describe('jianghu App', () => {
  let page: JianghuPage;

  beforeEach(() => {
    page = new JianghuPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
