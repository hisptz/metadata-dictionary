import { MetadataDictionaryPage } from './app.po';

describe('metadata-dictionary App', function() {
  let page: MetadataDictionaryPage;

  beforeEach(() => {
    page = new MetadataDictionaryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
