import { TodoTaqweemPage } from './app.po';

describe('todo-taqweem App', () => {
  let page: TodoTaqweemPage;

  beforeEach(() => {
    page = new TodoTaqweemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
