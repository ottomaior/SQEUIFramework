import { Selector } from 'testcafe';

fixture('EPAM Website')
  .page('https://www.epam.com/')
  .beforeEach(async (t) => {
    await t.maximizeWindow();
    const pageTitle = await t.eval(() => document.title);
    console.log('Page Title:', pageTitle);
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
      .skipJsErrors()
      .click(searchIcon)
      .typeText(searchInput, 'automation')
      .click(searchButton)
      .expect(searchResults.exists).ok()
      .expect(searchResults.innerText).match(/(\d+) RESULTS FOR "AUTOMATION"/);
  });

test('Check "What are you looking for" field after clicking search icon', async (t) => {
    const searchInput = Selector('.header-search__input');
    const searchIcon = Selector('.search-icon');
    const whatAreYouLookingForField = Selector('.header-search__input[placeholder="What are you looking for?"]');
    
    await t
      .click(searchIcon)
      .expect(whatAreYouLookingForField.exists).ok()
      .expect(whatAreYouLookingForField.getAttribute('placeholder')).eql('What are you looking for?');
  });
  

  
