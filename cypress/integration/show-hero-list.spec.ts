describe('show hero list', () => {

  beforeEach(() => {
  });

  it('navigate to heroes page', () => {
    cy.visit('/');

    cy.get('nav > a').contains('Heroes').click();

    cy.get('h2').should('contain', 'My Heroes');
  });

  it('show hero list', () => {
    cy.get('.heroes > a').contains('Bombasto').should('contain', '13');
  });
})
