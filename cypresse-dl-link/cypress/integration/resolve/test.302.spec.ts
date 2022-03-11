/// <reference types="cypress" />

import template from "./test.template";

context("Download Link 302", () => {
  const param = {
    url: "/index_302.html",
    htmlLink: "/redirect/html/302/",
    imgLink: "/redirect/img/302/",
    filePrefix: "302",
  };

  template(param);
});
