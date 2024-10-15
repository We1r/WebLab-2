const http = require("http");
const fs = require("fs");
const path = require("path");
const open = require("open");

const PORT = 8000;

const server = http.createServer((req, res) => {
  let filePath = "main.html";
  if (req.url === "/" || req.url === "/main.html") {
    filePath = path.join(__dirname, "main.html");
  } else {
    filePath = path.join(__dirname, req.url);
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".jpg": "image/jpg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".otf": "font/otf",
  };

  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404);
        res.end(`File not found: ${req.url}`);
      } else {
        res.writeHead(500);
        res.end(`Server error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  open(`http://localhost:${PORT}/`);
});
