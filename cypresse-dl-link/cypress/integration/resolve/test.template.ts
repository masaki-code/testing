/// <reference types="cypress" />

const template = (param: {
  url: string;
  htmlLink: string;
  imgLink: string;
  filePrefix: string;
}) => {
  const url = param.url;
  const htmlLink = param.htmlLink;
  const imgLink = param.imgLink;
  const filePrefix = param.filePrefix;

  Cypress.config().baseUrl = "http://127.0.0.1:3000";

  afterEach(() => {
    cy.wait(1500);
  });

  const interceptHtml = () => {
    cy.intercept(htmlLink, (req) => {
      req.destroy();
    }).as("linkUrl");
  };

  const interceptImg = () => {
    cy.intercept(imgLink, (req) => {
      req.destroy();
    }).as("linkUrl");
  };

  const resolve = (id: string) => {
    cy.visit(url);
    cy.title().should("contain", "download test page");
    cy.get(id).then(($link) => {
      $link.attr("download", "");
    });
    cy.get(id).click();
    cy.wait("@linkUrl");
    cy.title().should("contain", "download test page");
  };

  const requestHtml = (fileName: string) => {
    cy.request({
      url: htmlLink,
      encoding: "utf8",
    }).then((response) => {
      const folder = Cypress.config("downloadsFolder");
      cy.writeFile(folder + "/" + fileName, response.body, "utf8");
    });
  };

  const requestImg = (fileName: string) => {
    cy.request({
      url: imgLink,
      encoding: "binary",
    }).then((response) => {
      const folder = Cypress.config("downloadsFolder");
      cy.writeFile(folder + "/" + fileName, response.body, "binary");
    });
  };

  it("redirect link, to html, no download", () => {
    interceptHtml();
    resolve("#dl_link_1");
    requestHtml(filePrefix + "_" + "dl_link_1.html");
  });

  it("redirect link, to html, has download", () => {
    interceptHtml();
    resolve("#dl_link_2");
    requestHtml(filePrefix + "_" + "dl_link_2.html");
  });

  it("edirect link, to img, no download", () => {
    interceptImg();
    resolve("#dl_link_3");
    requestImg(filePrefix + "_" + "dl_link_3.jpeg");
  });

  it("redirect link, to img, has download", () => {
    interceptImg();
    resolve("#dl_link_4");
    requestImg(filePrefix + "_" + "dl_link_4.jpeg");
  });

  it("redirect link, to img, has download 2", () => {
    const id = "#dl_link_4";

    cy.visit(url);
    cy.title().should("contain", "download test page");
    cy.get(id).then(($link) => {
      const dlLink = $link.attr("href");

      cy.intercept(dlLink, (req) => {
        req.destroy();
      }).as("linkUrl");

      cy.request({
        url: dlLink,
        encoding: "binary",
      }).then((response) => {
        const folder = Cypress.config("downloadsFolder");
        cy.writeFile(folder + "/" + id + "_2.jpeg", response.body, "binary");
      });
    });
    cy.get(id).click();
    cy.wait("@linkUrl");
    cy.title().should("contain", "download test page");
  });
};

export default template;
