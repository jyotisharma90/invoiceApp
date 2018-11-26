import { InvoiceAppPage } from './app.po';

describe('invoice-app App', () => {
  let page: InvoiceAppPage;

  beforeEach(() => {
    page = new InvoiceAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
