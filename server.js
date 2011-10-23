var http = require('http'),
    sys  = require('sys'),
    fs   = require('fs'),
    io   = require('socket.io'),
    path = require('path');


var server = http.Server(function(request, response) {
  var filePath = '.' + request.url;
  if(filePath == './')
    filePath = './class.html';

  var extname = path.extname(filePath);
  var contentType
  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    default:
      contentType = 'text/html'
  }

  path.exists(filePath, function(exists) {
    if(exists) {
      fs.readFile(filePath, function(error, content) {
        if(error) {
          response.writeHead(500);
          response.end();
        } else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    } else {
      response.writeHead(404);
      response.end();
    }
  });
});

var socket = io.listen(server);
var userNumber = 1;

socket.sockets.on('connection', function(client) {
  var username;
  console.log('Client Connected');
  username   = 'User ' + userNumber;
  userNumber = userNumber + 1;

  // Temporary
  username = userNumber % 2 == 1 ? 'steven' : 'steve'

  client.emit('username', {username: username});

  client.on('message', function(message) {
    var json = JSON.stringify({
      name   : username,
      message: message
    });
    client.broadcast.send(json);
  });
});

console.log('Listening on port 4000');
server.listen(4000)
