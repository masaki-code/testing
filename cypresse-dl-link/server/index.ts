import * as http from "http";
import listener from "./listener";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(listener);
server.listen(port, hostname);
