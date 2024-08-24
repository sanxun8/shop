describe('login', function () {
  it('should navigate to homePage', function () {
    cy.visit('http://localhost:10002/login');
    cy.get('input[name=email]').type('admin@163.com');
    cy.get('input[name=password]').type('123456');
    cy.get('input[type=submit]').click();
  });

  it('should navigate to produtsPage', function () {
    cy.visit('http://localhost:10002/login?from=%2Fproducts');
    cy.get('input[name=email]').type('admin@163.com');
    cy.get('input[name=password]').type('123456');
    cy.get('input[type=submit]').click();
  });
});
