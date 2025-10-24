import { readFileSync } from "fs";
import { createSecureServer, createServer } from "http2";
import { join } from "path";

const server = createSecureServer(
  {
    key: readFileSync("./keys/server.key"),
    cert: readFileSync("./keys/server.crt"),
  },
  (req, res) => {
    console.log(req.url);

    const publicPath = "./public";

    // res.writeHead(200, { "Content-Type": "text/html" });
    // res.write(`<h1>URL ${req.url}</h1>`);
    // res.end();
    // const data = { name: "John Doe", age: 30, city: "New York" };
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.end(JSON.stringify(data));

    //return js

    if (req.url === "/") {
      const htmlFile = readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(htmlFile);
      return;
    }
    if (req.url?.endsWith(".js")) {
      const jsFile = readFileSync(join(publicPath, req.url), "utf-8");
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(jsFile);
      return;
    }

    if (req.url?.endsWith(".css")) {
      const cssFile = readFileSync(join(publicPath, req.url), "utf-8");
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(cssFile);
      return;
    }
  }
);

server.listen(8080, () => {
  console.log("Server running on port 8080");
});
