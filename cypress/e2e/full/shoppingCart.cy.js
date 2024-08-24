describe('shoppingCart', function () {
  it('should full', function () {
    cy.login();
    cy.visit('http://localhost:10002');
    cy.get('.category-item:first-child').click();
    cy.get('.product-item:first-child').click();
    cy.get('.add-to-cart').click();
  });
  it('should full2', function () {
    cy.login();
    cy.visit('http://localhost:10002');
    cy.get('.product-item:first-child').click();
    cy.get('.add-to-cart').click();
  });
});
