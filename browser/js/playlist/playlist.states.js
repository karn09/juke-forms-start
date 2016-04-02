juke.config(function($stateProvider) {
  $stateProvider.state('playListForm', {
    url: '/playlists/add',
    templateUrl: '/js/playlist/templates/playlistForm.html',
    controller: 'PlaylistFormCtrl'
  });

  $stateProvider.state('playlist', {
    url: '/playlists/:pid',
    controller: 'PlayListCtrl',
    templateUrl: '/js/playlist/templates/playlist.html',
    resolve: {
      playlist: function(PlaylistFactory, $stateParams) {
        return PlaylistFactory.fetchByid($stateParams.pid);
      },
      songs: function(SongFactory) {
        return SongFactory.fetchAll();
      }
    }
  });
});
