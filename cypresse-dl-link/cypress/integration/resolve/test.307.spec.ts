/// <reference types="cypress" />

import template from "./test.template";

context("Download Link 307", () => {
  const param = {
    url: "/index_307.html",
    htmlLink: "/redirect/html/307/",
    imgLink: "/redirect/img/307/",
    filePrefix: "307",
  };

  template(param);
});
