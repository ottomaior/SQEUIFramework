import { Selector } from 'testcafe';

fixture('EPAM Website')
  .page('https://www.epam.com/')
  .beforeEach(async (t) => {
    await t.maximizeWindow();
  });

test('Check homepage title', async (t) => {
  await t
    .expect(Selector('title').innerText).contains('EPAM | Software Engineering & Product Development Services');
});

test('Check existence of header logo', async (t) => {
  const logo = Selector('.header__logo');

  await t
    .expect(logo.exists).ok();
});

test('Check search results for keyword "automation"', async (t) => {
    const searchInput = Selector('.header-search__input');
    const searchIcon = Selector('.search-icon');
    const searchResults = Selector('.search-results__counter');
    const searchButton = Selector('.header-search__submit');
  
    await t
      .skipJsErrors() // Temporary solution. Will look into the possible solution as I'm aware this is not the perfect solution
      .click(searchIcon)
      .typeText(searchInput, 'automation')
      .click(searchButton)
      .expect(searchResults.exists).ok()
      .expect(searchResults.innerText).match(/(\d+) RESULTS FOR "AUTOMATION"/);
  });

test('Check "What are you looking for" field after clicking the search icon', async (t) => {
    const searchIcon = Selector('.search-icon');
    const searchFieldPlaceholder = Selector('.header-search__input');
    
    await t
      .click(searchIcon)
      .expect(searchFieldPlaceholder.exists).ok()
      .expect(searchFieldPlaceholder.getAttribute('placeholder')).eql('What are you looking for?');
  });
