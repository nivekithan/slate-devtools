describe("Render History", () => {
  it("No operation should be displayed at first render", () => {
    cy.visit("/");
    cy.findByRole("button", {
      name: /open/i,
    }).click();
    cy.get(`[data-cy-component="RenderHistory"]`)
      .find("[data-cy-he-batch]")
      .should("not.exist");
  });

  it("Operations to the devEditor should be reflected on RenderHistory", () => {
    cy.findAllByRole("button", {
      name: /<paragraph \/>/i,
    })
      .eq(0)
      .click();

    cy.get(`[data-cy-sp-key="type"][data-cy-sp-value='"paragraph"']`)
      .type("{end}{leftarrow}")
      .type(Array("paragraph".length).fill("{backspace}").join(""))
      .type("normal");

    cy.get(`[data-cy-sp-key="type"]`).eq(0).click();

    cy.findAllByRole("button", {
      name: /Devtools Operation/i,
    })
      .should("have.length", 1)
      .click();

    cy.findAllByRole("button", {
      name: /current state/i,
    }).should("have.length", 1);

    cy.findAllByRole("button", {
      name: /here/i,
    }).should("not.exist");
  });

  it("Ability to change the state", () => {
    cy.get(`[data-cy-sp-key="type"][data-cy-sp-cancel="true"]`).click();

    cy.findAllByRole("button", {
      name: /Devtools Operation/i,
    })
      .should("have.length", 2)
      .eq(1)
      .click()
      .next()
      .contains(/current state/i);

    cy.findByRole("button", {
      name: /here/i,
    }).click();

    cy.get(`[data-cy-sp-key="type"]`);
  });

  it("Applying operation from state which is not last should override following operations with new operations", () => {
    cy.get(`[data-cy-sp-key="type"][data-cy-sp-value='"normal"']`)
      .type("{end}{leftarrow}")
      .type(Array("normal".length).fill("{backspace}").join(""))
      .type("default");
    cy.get(`[data-cy-sp-key="type"]`).eq(0).click();

    cy.get(`[data-cy-he-batch="Devtools Operation"]`).should("have.length", 2);
    cy.get(`[data-cy-sp-key="type"][data-cy-sp-value='"default"']`);
  });
});
