import io from 'socket.io-client';

var socket = io();
var $ = document.querySelector.bind(document);
var username = 'anonymous';

$('#form').addEventListener('submit', handleSubmit);

function handleSubmit (e) {
  e.preventDefault();

  var inputName = $('#username').value;
  if (inputName.length > 0 ) username = inputName;

  socket.emit('chat message', username + ': ' + $('#m').value);
  $('#m').value = '';
}

socket.on('chat message', function(msg) {
  var li = document.createElement('li');
  li.innerHTML = msg;
  $('#messages').appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
})
