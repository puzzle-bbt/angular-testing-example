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

  it('search hero and click on it', () => {
    cy.visit('/');

    cy.get('#search-box').type("Bombas");
    cy.wait(400);
    cy.get(".search-result > li").first().click();

    var heroLink = cy.get('#hero-name');
    heroLink.should('have.value', 'Bombasto');
    heroLink.clear().type('Bombasto 2');
    cy.get('button').contains('save').click();

    cy.get('#search-box').type("Bombasto 2");
    cy.wait(400);
    cy.get(".search-result > li").first().should("contain", "Bombasto 2");
  });

  it('remove messages', () => {
    cy.visit('/');

    cy.get('.heroes-menu > a').eq(2).should('contain', 'Celeritas');
    cy.get('.heroes-menu > a').eq(2).click();

    var heroLink = cy.get('#hero-name');
    heroLink.should('have.value', 'Celeritas');
    heroLink.clear().type('Test Name');
    cy.get('button').contains('save').click();

    cy.get('.clear').click();


    cy.get('.messagesDiv').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)')


  });

  it('remove hero', () => {
    cy.visit('/');

    cy.get('nav > a').eq(1).should("contain", "Heroes").click();

    cy.get('.heroes > li').eq(3).should('contain', 'Celeritas').find("button").click();

    cy.get('.heroes').find('li').should('have.length', 9);

  });

})
