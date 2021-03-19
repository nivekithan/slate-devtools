/* eslint-disable no-useless-escape */
describe("DevSlate", () => {
  it("Renders Correctly Initial Value", () => {
    cy.visit("/");

    cy.findByRole("button", {
      name: /open/i,
    }).click();

    cy.findAllByRole("button", {
      name: /<paragraph \/>/i,
    }).should("have.length", 3);

    cy.findAllByRole("button", {
      name: /<block\-quote \/>/i,
    }).should("have.length", 1);

    cy.findAllByRole("button", {
      name: /\+/i,
    })
      .eq(0)
      .click();

    cy.findAllByRole("button", {
      name: /<text \/>/i,
    }).should("have.length", 7);
  });
});
