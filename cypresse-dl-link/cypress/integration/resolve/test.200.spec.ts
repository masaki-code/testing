/// <reference types="cypress" />

context("Download Link", () => {
  const url = "/index_200.html";
  Cypress.config().baseUrl = "http://127.0.0.1:3000";

  const template = (id: string) => {
    cy.visit(url);
    cy.title().should("contain", "download test page");
    cy.get(id).click();
    cy.title().should("contain", "download test page");
  };

  const resolve = (id: string) => {
    cy.visit(url);
    cy.title().should("contain", "download test page");
    cy.get(id).then(($link) => {
      $link.attr("download", "");
    });
    cy.get(id).click();
    cy.wait(500);
    cy.wait(500);
    cy.title().should("contain", "download test page");
  };

  it("zip link, has download", () => {
    template("#dl_link_1");
  });

  it("zip link, no download", () => {
    resolve("#dl_link_2");
  });

  it("zip link, no download, 2", () => {
    cy.intercept(Cypress.config().baseUrl + "/c/sample.zip", () => {
      Cypress.$(cy.state("$autIframe")).trigger("load");
    });

    template("#dl_link_2");
  });

  it("img link, has download", () => {
    template("#dl_link_3");
  });

  it("img link, no download", () => {
    resolve("#dl_link_4");
  });

  it("base64 link, has download", () => {
    template("#dl_link_5");
  });

  it("base64 link, no download", () => {
    resolve("#dl_link_6");
  });
});
