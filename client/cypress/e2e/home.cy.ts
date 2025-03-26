describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the navbar with Hot Wings logo', () => {
    cy.contains('Hot Wings').should('be.visible');
  });

  it('allows navigation to menu page', () => {
    cy.contains('Menu').click();
    cy.url().should('include', '/menu');
  });

  it('shows login option for unauthenticated users', () => {
    cy.contains('Login').should('be.visible');
  });
}); 