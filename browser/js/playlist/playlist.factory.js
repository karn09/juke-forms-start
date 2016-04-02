juke.factory('PlaylistFactory', function($http, $log) {
  return {
    create: function(playlist) {
      return $http.post('/api/playlists', playlist)
        .then(function(res) { return res.data; })
        .catch($log.error);
    },
    fetchAll: function() {
      return $http.get('/api/playlists')
        .then(function(res) { return res.data; })
        .catch($log.error);
    }
  };
});
