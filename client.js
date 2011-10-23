$(function() {
  var socket = io.connect('http://localhost', {port: 4000});
  socket.on('connect', function() {
    socket.on('message', function(message) {
      var data = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      $('#log ul').append('<li>' + data + '</li>');
      window.scrollBy(0, 10000000000000000);
      msgInput.focus();
    });
  });

  var msgInput = $('.reply-input');
  msgInput.keypress(function(event) {
    if(event.keyCode != 13) return;
    var msg = msgInput.attr('value');
    if(msg) {
      socket.send(msg);
      msgInput.val('');
    }
  });

  var submit = $('.reply-form');
  submit.submit(function(event) {
    event.preventDefault();
    var msg = msgInput.attr('value');
    if(msg) {
      socket.send(msg);
      msgInput.val('');
    }
  });
});
