const http = require("http");


const { staticFileHandler } = require("./src/handlers/static");
const { homeHandler } = require("./src/handlers/home");

const routes = {
  "/": homeHandler,
  "index.html": homeHandler
};

http
  .createServer(async (req, res) => {
    const route = routes[req.url];
    if (typeof route === "function") {
      route(req, res);
      return;
    } else if (await staticFileHandler(req, res)) {
      return;
    } 
    res.writeHead(404, ["Content-Type", "text/plaint"]);
    res.write("404 Not Found");
    res.end();
  })
  .listen(3000);
