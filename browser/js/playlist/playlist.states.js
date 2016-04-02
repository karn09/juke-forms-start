juke.config(function($stateProvider) {
  $stateProvider.state('playList', {
    url: '/playlist',
    templateUrl: '/js/playlist/templates/playlist.html',
    controller: 'PlaylistFormCtrl'
  });
});
