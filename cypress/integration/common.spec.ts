describe('My First Test', () => {

  before(() => {
  });

  beforeEach(() => {
    cy.visit('/');
  });

  afterEach(() => {
  });

  after(() => {
  });

  describe('common example', () => {
    it('test window title', () => {
      cy.title().should('equal', 'Tour of Heroes');
    });

    it('test for a text on the website', () => {
      cy.contains('Tour of Heroes');
    });

    it('navigate to a path', () => {
      cy.visit('/detail/12');
      cy.contains('NARCO Details');
    });
  });

  describe('selector example', () => {
    it('class selector', () => {
      cy.get('.heroes-menu > a').should('have.length', 4);
    });

    it('id selector', () => {
      cy.get('#search-component').should('contain', 'Hero Search');
    });

    it('tag selector', () => {
      cy.get('button').should('contain', 'Clear message');
    });

    it('enhance selector', () => {
      cy.get('.heroes-menu > a').first().should('contain', 'Narco');
      cy.get('[ng-reflect-router-link="/detail/12"]').should('contain', 'Narco');
    });
  });

  it('Fixture Data verwenden', () => {
    cy.fixture('example').then(data => {
      cy.title().should('equal', data.title);
      cy.contains(data.title);
    });
  });

  describe('dashboard site', () => {
    it('number of links', () => {
      cy.get('.heroes-menu > a').should('have.length', 4);
    });
  });

})
