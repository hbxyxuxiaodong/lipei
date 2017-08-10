import { LipeiPage } from './app.po';

describe('lipei App', () => {
  let page: LipeiPage;

  beforeEach(() => {
    page = new LipeiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
