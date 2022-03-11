/// <reference types="cypress" />

context("Download Link", () => {
  const url = "/index_200.html";
  Cypress.config().baseUrl = "http://127.0.0.1:3000";

  const template = (id: string) => {
    cy.visit(url);
    cy.title().should("contain", "download test page");
    cy.get(id).click();
    cy.title().should("contain", "download test page");
    cy.wait(1000);
  };

  it("zip link, has download", () => {
    template("#dl_link_1");
  });

  it("zip link, no download", () => {
    template("#dl_link_2");
  });

  it("img link, has download", () => {
    template("#dl_link_3");
  });

  it("img link, no download", () => {
    template("#dl_link_4");
  });

  it("base64 link, has download", () => {
    template("#dl_link_5");
  });

  it("base64 link, no download", () => {
    template("#dl_link_6");
  });
});
