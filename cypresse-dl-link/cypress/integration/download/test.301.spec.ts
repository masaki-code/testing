/// <reference types="cypress" />

context("Download Link", () => {
  const url = "/index_301.html";
  Cypress.config().baseUrl = "http://127.0.0.1:3000";

  const template = (id: string) => {
    cy.visit(url);
    cy.title().should("contain", "download test page");
    cy.get(id).click();
    cy.wait(500);
    cy.wait(500);
    cy.wait(500);
    cy.title().should("contain", "download test page");
  };

  it("301 redirect link, to html, no download", () => {
    template("#dl_link_1");
  });

  it("301 redirect link, to html, has download", () => {
    template("#dl_link_2");
  });

  it("301 redirect link, to img, no download", () => {
    template("#dl_link_3");
  });

  it("301 redirect link, to img, has download", () => {
    template("#dl_link_4");
  });
});
