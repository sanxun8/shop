const { getFullName, getEmail } = require('../../utils/mock');

describe('register', function () {
  it('should navigate to home', function () {
    cy.visit('http://localhost:10002/register');
    cy.get('input[name=username]').type(getFullName());
    cy.get('input[name=email]').type(getEmail());
    cy.get('input[name=password]').type('123456');
    cy.get('input[type=submit]').click();
  });

  it('should show modal', function () {
    cy.visit('http://localhost:10002/register');
    cy.get('input[name=username]').type('admin');
    cy.get('input[name=email]').type('admin@163.com');
    cy.get('input[name=password]').type('123456');
    cy.get('input[type=submit]').click();
  });
});
