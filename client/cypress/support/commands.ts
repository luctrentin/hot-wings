/// <reference types="cypress" />

// Add custom commands here
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.request({
    method: 'POST',
    url: '/api/auth/login',
    body: { email, password }
  }).then((response) => {
    localStorage.setItem('authToken', response.body.token);
    localStorage.setItem('user', JSON.stringify(response.body.user));
  });
  
  // Reload page to apply auth state
  cy.visit('/');
}); 