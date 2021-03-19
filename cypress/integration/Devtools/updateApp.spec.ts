describe("Update App button", () => {
  it("At first the color is grey", () => {
    cy.visit("/");

    cy.findByRole("button", {
      name: /open/i,
    }).click();

    cy.get(`[data-cy-ub-color="gray"]`).contains(/update app/i);
  });

  it("When an operation is applied to devEditor it the button should change color to rose", () => {
    cy.findByPlaceholderText(/javascript code/i).type(
      `Transforms.insertText(devEditor, "A unique name" , {at : [0, 0]})`,
      {
        parseSpecialCharSequences: false,
      }
    );

    cy.findByRole("button", {
      name: /run/i,
    }).click();

    cy.get(`[data-cy-ub-color="rose"]`).contains(/update app/i);
  });

  it("Clicking the button should update the app", () => {
    cy.findByPlaceholderText(/javascript code/i).type(
      Array(
        `Transforms.insertText(devEditor, "A unique name" , {at : [0, 0]})`
          .length
      )
        .fill("{backspace}")
        .join("")
    );

    cy.findByRole("button", {
      name: /update app/i,
    }).click();

    cy.contains("A unique name");
  });

  it("Updating app because of clicking Update App should not cause update devtools to change to rose color and once after clicking the update App it should color to gray", () => {
    cy.get(`[data-cy-ub-color="rose"]`).should("not.exist");
  });
});
