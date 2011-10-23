window.username = null
$(function() {
try {
  var socket = io.connect('http://localhost', {port: 4000});
  socket.on('connect', function() {
    socket.on('message', function(data) {
      var data = JSON.parse(data);
      var message = data.message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

      addMessage(message, data.name);

      // TODO: Detect Scroll Height
      $('.comment-list').scrollTop(100000000000000000)
    });
  });
} catch(e) {}

  socket.on('username', function(data) {
    username = data.username;
  });

  function addMessage(message, username) {
    $('section.comment-list').append(
      '<article class="comment">' +
        '<div class="avatar"> <img src="' + username + '.jpg"> </div>' +
        '<blockquote class="message">' +
          '<p>' + message + '</p>' +
        '</blockquote>' +
      '</article>'
    );
  }

  var msgInput = $('.reply-input');
  msgInput.keypress(function(event) {
    if(event.keyCode != 13) return;
    var msg = msgInput.attr('value');
    if(msg) {
      try {
        addMessage(msg, username);
        socket.send(msg);
      } catch(e) {}
      msgInput.val('');
    }
  });

  var submit = $('.reply-form');
  submit.submit(function(event) {
    event.preventDefault();
    var msg = msgInput.attr('value');
    if(msg) {
      try {
        addMessage(msg, username);
        socket.send(msg);
      } catch(e) {}
      msgInput.val('');
    }
  });
});
