/// <reference types="cypress" />

import template from "./test.template";

context("Download Link 301", () => {
  const param = {
    url: "/index_301.html",
    htmlLink: "/redirect/html/301/",
    imgLink: "/redirect/img/301/",
    filePrefix: "301",
  };

  template(param);
});
