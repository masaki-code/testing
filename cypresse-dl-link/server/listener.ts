import { IncomingMessage, ServerResponse } from "http";
import fileService from "./service/fileService";
import redirectService from "./service/redirectService";

const listener = function (req: IncomingMessage, res: ServerResponse) {
  if (req.url?.startsWith("/redirect/")) {
    redirectService(req, res);
    return;
  }

  fileService(req, res);
};

export default listener;
