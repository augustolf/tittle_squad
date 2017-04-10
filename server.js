const PORT = 8080;

let http = require('http');
let path = require('path');
let fs = require('fs');

let server = http.createServer(handleRequest);
server.listen(PORT);


function handleRequest(req, res) {
  let pathname = req.url;
  if (pathname == '/') {
    pathname = '/index.html';
  }
  let ext = path.extname(pathname);
  let typeExt = {
    '.html': 'text/html',
    '.js':   'text/javascript',
    '.css':  'text/css'
  };
  let contentType = typeExt[ext] || 'text/plain';

  fs.readFile(__dirname + pathname,
    function (err, data) {
      // if there is an error
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      // Otherwise, send the data, the contents of the file
      res.writeHead(200,{ 'Content-Type': contentType });
      res.end(data);
    }
  );
}