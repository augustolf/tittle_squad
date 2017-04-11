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
    '.js': 'text/javascript',
    '.css': 'text/css'
  };
  let contentType = typeExt[ext] || 'text/plain';

  fs.readFile(__dirname + pathname,
    function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading ' + pathname);
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  );
}

let io = require('socket.io').listen(server);

io.sockets.on('connection',
  function (socket) {
    console.log("We have a new client: " + socket.id);
    socket.emit('newEntity', socket.id);
    socket.on('disconnect', function () {
      console.log("Client has disconnected " + socket.id);
    });
  }
);