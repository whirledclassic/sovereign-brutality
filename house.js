(function () {
  var VIDEO = "YJpYrY2RkT4";
  var START = 14;
  var END = 556;
  var VOLUME = 32;
  var player = null;
  var ready = false;
  var wantPlay = false;
  var ticking = null;

  function $(id) { return document.getElementById(id); }

  function buildDock() {
    if ($("house-dock")) return;
    var dock = document.createElement("div");
    dock.id = "house-dock";
    dock.className = "house-dock";
    dock.innerHTML =
      '<button type="button" class="house-btn" id="house-toggle" aria-pressed="false">Play</button>' +
      '<div class="house-copy">' +
        '<strong>House music</strong>' +
        '<span>AMBERGRIS &mdash; Bottom Feeder</span>' +
      '</div>' +
      '<a class="house-buy" href="https://ambergrisdoom.bandcamp.com/album/untitled-ep" target="_blank" rel="noopener">Bandcamp</a>';
    document.body.appendChild(dock);
    $("house-toggle").addEventListener("click", toggle);
  }

  function setUi(on) {
    var btn = $("house-toggle");
    var dock = $("house-dock");
    if (!btn || !dock) return;
    btn.textContent = on ? "Stop" : "Play";
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    dock.classList.toggle("on", on);
  }

  function play() {
    wantPlay = true;
    setUi(true);
    if (!ready || !player || !player.playVideo) return;
    try {
      player.setVolume(VOLUME);
      player.unMute();
      var t = player.getCurrentTime ? player.getCurrentTime() : 0;
      if (t < START || t >= END) player.seekTo(START, true);
      player.playVideo();
    } catch (e) {}
  }

  function stop() {
    wantPlay = false;
    setUi(false);
    if (player && player.pauseVideo) {
      try { player.pauseVideo(); } catch (e) {}
    }
  }

  function toggle() {
    if (wantPlay) stop();
    else play();
  }

  function watchLoop() {
    if (ticking) return;
    ticking = setInterval(function () {
      if (!wantPlay || !player || !player.getCurrentTime) return;
      try {
        var t = player.getCurrentTime();
        if (t >= END) player.seekTo(START, true);
      } catch (e) {}
    }, 1000);
  }

  function loadYouTube() {
    if (window.YT && window.YT.Player) return startPlayer();
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    var prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof prev === "function") prev();
      startPlayer();
    };
  }

  function startPlayer() {
    if (player) return;
    var hold = document.createElement("div");
    hold.id = "house-yt";
    hold.className = "house-yt";
    document.body.appendChild(hold);
    player = new window.YT.Player("house-yt", {
      videoId: VIDEO,
      width: 200,
      height: 80,
      playerVars: {
        start: START,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        playsinline: 1,
        disablekb: 1,
        fs: 0
      },
      events: {
        onReady: function (e) {
          ready = true;
          try { e.target.setVolume(VOLUME); } catch (err) {}
          if (wantPlay) play();
        },
        onStateChange: function (e) {
          if (!window.YT) return;
          if (e.data === window.YT.PlayerState.ENDED && wantPlay) play();
        }
      }
    });
    watchLoop();
  }

  window.sbHousePlay = play;
  window.sbHouseStop = stop;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      buildDock();
      loadYouTube();
    });
  } else {
    buildDock();
    loadYouTube();
  }
})();
