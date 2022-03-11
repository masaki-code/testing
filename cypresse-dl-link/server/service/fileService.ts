import path = require("path");
import * as fs from "fs";
import * as http from "http";

type Request = http.IncomingMessage | { url: string };
type Response = http.ServerResponse;

const dirPublic = "./public";
const indexFile = "index.html";

const service = function (req: Request, res: Response) {
  const pathname = req.url;
  const root = path.resolve(dirPublic);
  const file = path.join(root, pathname);

  fs.stat(file, (err, stat) => {
    if (err) {
      console.error("err", err);
      res.write("err");
      res.end();
      return;
    }

    if (stat.isDirectory()) {
      console.log("isDir: ", file);
      service({ url: `${req.url}/${indexFile}` }, res);
    }

    if (stat.isFile()) {
      console.log("isFile: ", file);
      const stream = fs.createReadStream(file);
      stream.pipe(res);
    }
  });
};

export const fileService = service;

export default fileService;
