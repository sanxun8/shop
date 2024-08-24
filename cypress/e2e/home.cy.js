describe('homePage', function () {
  it('should load the homepage', function () {
    cy.visit('http://localhost:10002');
  });

  it('should reload the homepage', function () {
    cy.visit('http://localhost:10002');

    cy.get('a.logo').click();
  });
});
