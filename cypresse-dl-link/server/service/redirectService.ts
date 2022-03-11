import path = require("path");
import * as fs from "fs";
import * as http from "http";

type Request = http.IncomingMessage;
type Response = http.ServerResponse;

const getHttpCode = function (req: Request) {
  if (req.url === "/redirect/html/301/" || req.url === "/redirect/img/301/") {
    return 301;
  }

  if (req.url === "/redirect/html/302/" || req.url === "/redirect/img/302/") {
    return 302;
  }

  if (req.url === "/redirect/html/307/" || req.url === "/redirect/img/307/") {
    return 307;
  }

  return 302; // 未定義
};

const getLocation = function (req: Request) {
  if (req.url?.startsWith("/redirect/html/")) {
    return "http://localhost:3000/redirect.html";
  }

  if (req.url?.startsWith("/redirect/img/")) {
    return "http://localhost:3000/c/sample.jpeg";
  }

  return "/";
};

const service = function (req: Request, res: Response) {
  const code = getHttpCode(req);
  const location = getLocation(req);
  res.writeHead(code, { Location: location });
  res.write("hoge");
  res.end();
};

export const redirectService = service;

export default redirectService;
