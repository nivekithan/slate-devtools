describe("Properties Editor", () => {
  it("At first render it should render just `children : []`", () => {
    cy.visit("/");

    cy.findByRole("button", {
      name: /open/i,
    }).click();

    cy.get("[data-cy-component=PropertiesEditor]")
      .find("[data-cy-SP-key]")
      .should("have.length", 4)
      .find("[data-cy-SP-key=children]")
      .get("[data-cy-SP-value=\\[\\]]")
      .get("[data-cy-SP-edit=false");
  });

  it("Selecting a node in DevSlate should Update the properties in PropertiesEditor", () => {
    cy.findAllByRole("button", {
      name: /<paragraph \/>/i,
    })
      .eq(0)
      .click();

    cy.get("[data-cy-component=PropertiesEditor]")
      .find("[data-cy-sp-key]")
      .should("have.length", 8);

    cy.get(`[data-cy-sp-value='"paragraph"'][data-cy-sp-key="type"]`);

    cy.get(`[data-cy-sp-key=type][data-cy-sp-edit=true]`);

    cy.get(`[data-cy-sp-key="type"][data-cy-sp-cancel="true"]`);

    cy.get(`[data-cy-sp-key="children"]`).should("have.length", 4);

    cy.get(`[data-cy-sp-key="children"][data-cy-sp-edit=false]`);

    cy.get(`[data-cy-sp-key="children"][data-cy-sp-cancel="false"]`);
  });

  it("Updating the value should also update in RenderSlate", () => {
    cy.get(`[data-cy-sp-key="type"][data-cy-sp-value='"paragraph"']`)
      .type("{end}{leftarrow}")
      .type(Array("backspace".length).fill("{backspace}").join(""))
      .type("normal")
      .get(`[data-cy-sp-key="type"]`)
      .eq(0)
      .click();

    cy.findByRole("button", {
      name: /<normal \/>/i,
    });
  });

  it("Adding properties to Value", () => {
    cy.get(`[data-cy-component="AddProperties"]`).click();

    cy.findByPlaceholderText(/key/i).type("{end}{leftarrow}").type("depth");

    cy.findByPlaceholderText(/value/i)
      .type("{end}")
      .type("{backspace}{backspace}")
      .type("5");

    cy.findByRole("button", {
      name: /add/i,
    }).click();

    cy.get("[data-cy-component=PropertiesEditor]")
      .find("[data-cy-sp-key]")
      .should("have.length", 12);

    cy.get(`[data-cy-sp-value='"normal"'][data-cy-sp-key="type"]`);

    cy.get(`[data-cy-sp-key=type][data-cy-sp-edit=true]`);

    cy.get(`[data-cy-sp-key="type"][data-cy-sp-cancel="true"]`);

    cy.get(`[data-cy-sp-key="children"]`).should("have.length", 4);

    cy.get(`[data-cy-sp-key="children"][data-cy-sp-edit=false]`);

    cy.get(`[data-cy-sp-key="children"][data-cy-sp-cancel="false"]`);

    cy.get(`[data-cy-sp-key=depth][data-cy-sp-value="5"]`);

    cy.get(`[data-cy-sp-key=depth][data-cy-sp-edit=true]`);

    cy.get(`[data-cy-sp-key="type"][data-cy-sp-cancel=true]`);
  });

  it("If the Node gets updated because of some operation outside of PropertiesEditor, then PropertiesEditor should stay updated", () => {
    cy.findByPlaceholderText(/javascript Code/i).type(
      "Transforms.setNodes(devEditor, {indent : 2}, {at : [0]})",
      {
        parseSpecialCharSequences: false,
      }
    );
    cy.findByRole("button", {
      name: /run/i,
    }).click();

    cy.get("[data-cy-component=PropertiesEditor]")
      .find("[data-cy-sp-key]")
      .should("have.length", 16);

    cy.get(`[data-cy-sp-value='"normal"'][data-cy-sp-key="type"]`);

    cy.get(`[data-cy-sp-key=type][data-cy-sp-edit=true]`);

    cy.get(`[data-cy-sp-key="type"][data-cy-sp-cancel="true"]`);

    cy.get(`[data-cy-sp-key="children"]`).should("have.length", 4);

    cy.get(`[data-cy-sp-key="children"][data-cy-sp-edit=false]`);

    cy.get(`[data-cy-sp-key="children"][data-cy-sp-cancel="false"]`);

    cy.get(`[data-cy-sp-key=depth][data-cy-sp-value="5"]`);

    cy.get(`[data-cy-sp-key=depth][data-cy-sp-edit=true]`);

    cy.get(`[data-cy-sp-key="type"][data-cy-sp-cancel=true]`);

    cy.get(`[data-cy-sp-key=indent][data-cy-sp-value="2"]`);

    cy.get(`[data-cy-sp-key=indent][data-cy-sp-edit=true]`);

    cy.get(`[data-cy-sp-key=indent][data-cy-sp-cancel=true]`);

    cy.findByPlaceholderText(/javascript Code/i).type(
      Array("Transforms.setNodes(devEditor, {indent : 2}, {at : [0]})".length)
        .fill("{backspace}")
        .join("")
    );
  });

  it("Clicking cancel should remove that property from Node", () => {
    cy.findAllByRole("button", {
      name: /x/i,
    })
      .eq(2)
      .click();

    cy.get("[data-cy-component=PropertiesEditor]")
      .find("[data-cy-sp-key]")
      .should("have.length", 12);

    cy.get(`[data-cy-sp-value='"normal"'][data-cy-sp-key="type"]`);

    cy.get(`[data-cy-sp-key=type][data-cy-sp-edit=true]`);

    cy.get(`[data-cy-sp-key="type"][data-cy-sp-cancel="true"]`);

    cy.get(`[data-cy-sp-key="children"]`).should("have.length", 4);

    cy.get(`[data-cy-sp-key="children"][data-cy-sp-edit=false]`);

    cy.get(`[data-cy-sp-key="children"][data-cy-sp-cancel="false"]`);

    cy.get(`[data-cy-sp-key=depth][data-cy-sp-value="5"]`);

    cy.get(`[data-cy-sp-key=depth][data-cy-sp-edit=true]`);

    cy.get(`[data-cy-sp-key="type"][data-cy-sp-cancel=true]`);
  });
});
