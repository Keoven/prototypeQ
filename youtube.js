// Display information about the current state of the player
function updateNotes() {
  if(ytplayer && ytplayer.getDuration &&
     (window.prevTime != ytplayer.getCurrentTime())) {
    window.prevTime = ytplayer.getCurrentTime();
    $('li#seeker').width((ytplayer.getCurrentTime() / ytplayer.getDuration() * 100) + "%");
  }
}

function onYouTubePlayerReady(playerId) {
  window.prevTime = 0;
  window.ytplayer = document.getElementById("ytPlayer");
  // This causes the updatePlayerInfo function to be called every 250ms to
  // get fresh data from the player
  setInterval(updateNotes, 250);
  //Load an initial video into the player
  ytplayer.cueVideoById("ylLzyHk54Z0");
}

// The "main method" of this sample. Called when someone clicks "Run".
function loadPlayer() {
  // Lets Flash from another domain call JavaScript
  var params = { allowScriptAccess: "always" };
  // The element id of the Flash embed
  var atts = { id: "ytPlayer" };
  // All of the magic handled by SWFObject (http://code.google.com/p/swfobject/)
  swfobject.embedSWF("http://www.youtube.com/apiplayer?" +
                     "version=3&enablejsapi=1&playerapiid=player1",
                     "video", "460", "280", "9", null, null, params, atts);
}

$(function() {
  loadPlayer();
});
