describe('change a hero', () => {

  beforeEach(() => {
  });

  it('click top hero, change, save', () => {
    cy.visit('/');

    cy.get('.heroes-menu > a').first().should('contain', 'Narco');
    cy.get('.heroes-menu > a').first().click();

    var heroLink = cy.get('#hero-name');
    heroLink.should('have.value', 'Narco');
    heroLink.clear().type('Narco New');
    cy.get('button').contains('save').click();

    cy.get('.heroes-menu > a').first().should('contain', 'Narco New');
  });

  it('click top hero, change, go back', () => {
    cy.visit('/');

    // this is a custom command from commands.ts
    cy.clickTopHero('Narco');

    cy.get('#hero-name').should('have.value', 'Narco').clear().type('Narco New');
    cy.get('button').contains('go back').click();

    cy.get('.heroes-menu > a').first().should('contain', 'Narco');
  });

})
