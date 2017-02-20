
var jukebox = {
  songs: [],

  //======= ======= ======= initialize ======= ======= =======
  initialize: function () {
    console.log("initialize");
    jukebox.loadSongEl.addEventListener("click", jukebox.showPopupBox);
  },

  // ======= ======= ======= popupBox ======= ======= =======
  popupEl: document.getElementById("popup"),
  closeButtonEl: document.getElementById("closeButton"),
  loadSongEl: document.getElementById("loadSong"),
  saveButtonEl: document.getElementById("saveButton"),


  showPopupBox: function () {
    console.log("showPopupBox");
    jukebox.popupEl.style.display = "block";
    jukebox.closeButtonEl.addEventListener("click", jukebox.closePopupBox);
    jukebox.saveButtonEl.addEventListener("click", jukebox.saveSong);
  },

  closePopupBox: function () {
    console.log("closePopupBox");
    jukebox.popupEl.style.display = "none";
  },

  // ======= ======= ======= Playlist ======= ======= =======
   saveSong: function () {
    console.log("saveSong");
    var song = {
      title: null,
      artist: null,
      source: null,
      image: null,
    };
    song.title = document.getElementById('title').value;
    song.artist = document.getElementById('artist').value;
    song.source = document.getElementById('source').value;
    song.image = document.getElementById('image').value;
    console.log("song:", song);
    jukebox.songs.push(song);
    jukebox.popupEl.style.display = "none";
    document.getElementById("form").reset();
    jukebox.makePlaylist();
  },

   makePlaylist: function () {
    console.log("makePlaylist");
    // var dropdown = document.createElement("SELECT");
    var dropdownHTML = "<select id='songSelect'>";
    var playlistEl = document.getElementById("playlist");
    dropdownHTML += "<option value=''></option>";
    for (var i = 0; i < jukebox.songs.length; i++) {
      nextsong = jukebox.songs[i];
      console.log("nextsong:", nextsong.title);
      dropdownHTML += "<option value='" + nextsong.title +"'>" + nextsong.title +" </option>";
    };
    dropdownHTML += "</select>";
    playlistEl.innerHTML = dropdownHTML;
    var songSelectEl = document.getElementById("songSelect");
    songSelectEl.addEventListener("change", jukebox.showCurrentSong);
  },

  // ======= ======= ======= showCurrentSong======= ======= =======
  showCurrentSong: function () {
    console.log("showCurrentSong");
    var selectedSong = document.getElementById("songSelect").value;
    console.log("selectedSong", selectedSong);
    document.getElementById("showcurrentSong").innerHTML = selectedSong;
    var selectedSongobject;
    for (var a = 0; a < jukebox.songs.length; a++) {
      var nextsong = jukebox.songs[a];
      if (selectedSong == nextsong.title) {
        selectedSongobject = nextsong;
      }
    };
    var audioSourceEl = document.getElementById("audioplay");
    audioSourceEl.src = selectedSongobject.source;
    document.getElementById("showcurrentArtist").innerHTML = selectedSongobject.artist;
    document.getElementById("img").src = selectedSongobject.image;

    // ======= ======= make audio controlButtons ======= =======
    document.getElementById("playButton").addEventListener("click", function playSong() {
      audioSourceEl.play();
      }
    );
    document.getElementById("pauseButton").addEventListener("click", function pauseSong() {
      audioSourceEl.pause();
      }
    );
    document.getElementById("muteButton").addEventListener("click", function muteSong() {
      audioSourceEl.volume = 0;
      }
    );
    document.getElementById("volumeupButton").addEventListener("click", function volumeUp() {
      audioSourceEl.volume = audioSourceEl.volume + 0.1;
      }
    );
    document.getElementById("volumedownButton").addEventListener("click", function volumeDown() {
      audioSourceEl.volume = audioSourceEl.volume - 0.1;
      }
    );

  }

};
jukebox.initialize();


//
//
//
// volumeupButtonEl: document.getElementById("volumeupButton"),
// volumedownButtonEl: document.getElementById("volumedownButton"),
// audioplayEl: document.getElementById("audioplay"),
