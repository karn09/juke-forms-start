juke.controller('PlaylistFormCtrl', function($scope, PlaylistFactory) {

  $scope.submit = function() {
    PlaylistFactory.create($scope.playlist)
            .then(function(res) {
              console.log(res);
              $scope.playlist = null;
              $scope.playlistForm.$setPristine(true);
            });
  };
});

juke.controller('PlayListCtrl', function($scope, PlaylistFactory) {
  PlaylistFactory.fetchAll();
});
