import { MetadatadictionaryPage } from './app.po';

describe('metadatadictionary App', function() {
  let page: MetadatadictionaryPage;

  beforeEach(() => {
    page = new MetadatadictionaryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
