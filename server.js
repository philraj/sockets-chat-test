// importing express and instantiating the app
var express = require('express');
var app = express();

// using static middleware to serve files
app.use(express.static('src'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});



var port = process.env.port || 8080;

var server = app.listen(port, () => {
  console.log("listening on port", port);
});


// pass created server to socket.io
var io = require('socket.io')(server);

io.on('connection', socket => {
  console.log(socket.id + ' connected');

  socket.on('disconnect', () => {
    console.log(socket.id + ' disconnected');
  })

  socket.on('chat message', data => {
    console.log('name:', data.username, '\nmsg:', data.msg);
    io.emit('chat message', data);
  });
});
