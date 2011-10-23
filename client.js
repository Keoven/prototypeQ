$(function() {
  var socket = io.connect('http://localhost', {port: 4000});
  socket.on('connect', function() {
    socket.on('message', function(message) {
      var data = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      window.scrollBy(0, 10000000000000000);
      addMessage(message)
      msgInput.focus();
    });
  });

  function addMessage(message) {
    $('section.comment-list').append(
      '<article class="comment">' +
        '<div class="avatar"> <img src="#"> </div>' +
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
      addMessage(msg);
      socket.send(msg);
      msgInput.val('');
    }
  });

  var submit = $('.reply-form');
  submit.submit(function(event) {
    event.preventDefault();
    var msg = msgInput.attr('value');
    if(msg) {
      addMessage(msg);
      socket.send(msg);
      msgInput.val('');
    }
  });
});
