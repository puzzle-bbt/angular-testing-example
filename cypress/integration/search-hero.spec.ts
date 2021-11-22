describe('search a hero', () => {

  beforeEach(() => {
  });

  it('click searchbar, search', () => {
    cy.visit('/');

    var searchbar = cy.get('#search-component > input')
    searchbar.clear().type('Narco')


    cy.get('.search-result > li > a').contains('Narco').click();

    cy.get('h2').should('contain', 'NARCO Details');
  });
})
