juke.controller('PlaylistFormCtrl', function($scope, $state, PlaylistFactory) {
  $scope.submit = function() {
    PlaylistFactory.create($scope.playlist)
      .then(function(res) {
        console.log(res);
        $scope.playlist = null;
        $scope.playlistForm.$setPristine(true);
        $state.go('playlist', {
          pid: res._id
        });
      });
  };
});

juke.controller('PlayListNavCtrl', function($scope, PlaylistFactory) {
  PlaylistFactory.fetchAll()
    .then(function(res) {
      $scope.list = res;
    });

  $scope.remove = function(item) {
    var currentList = $scope.list;
    PlaylistFactory.removeList(item)
      .then(function(res) {
        $scope.list = currentList.filter(function(playlistItem) {
          return playlistItem._id !== item._id;
        });
      });
  };

});

juke.controller('PlayListCtrl', function($scope, PlaylistFactory, SongFactory, PlayerFactory, playlist, songs) {
  $scope.toggle = function(song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if (PlayerFactory.isPlaying()) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  $scope.remove = function(item) {
    var currentList = $scope.playlist;
    PlaylistFactory.removeSong(currentList, item)
      .then(function(res) {
        $scope.playlist.songs = currentList.songs.filter(function(song) {
          return song !== item;
        });
      });
  };

  $scope.getCurrentSong = function() {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function(song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.submit = function(song) {
    var currentList = $scope.playlist;
    $scope.selected = null;
    $scope.songForm.$setPristine(true);
    PlaylistFactory.addSong(currentList, song)
      .then(function(res) {
        var audio = SongFactory.convert(res.data);
        $scope.playlist.songs.push(audio);
      });
  };

  $scope.playlist = playlist;
  $scope.songs = songs;

});
