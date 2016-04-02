juke.factory('PlaylistFactory', function($http, $log, SongFactory) {
  var _cachedList = [];
  return {
    create: function(playlist) {
      return $http.post('/api/playlists', playlist)
        .then(function(res) {
          _cachedList.push(res.data);
          return res.data;
        })
        .catch($log.error);
    },
    fetchAll: function() {
      return $http.get('/api/playlists')
        .then(function(res) {
          angular.copy(res.data, _cachedList);
          return _cachedList;
        })
        .catch($log.error);
    },
    fetchByid: function(id) {
      return $http.get('/api/playlists/' + id)
        .then(function(res) {
          return res.data;
        })
        .then(function(list) {
          list.songs = list.songs.map(SongFactory.convert);
          return list;
        })
        .catch($log.error);
    },
    addSong: function(list, song) {
      return $http.post('/api/playlists/' + list._id + '/songs', {
          playlist: list,
          song: song
        })
        .then(function(res) {
          return res;
        })
        .catch($log.error);
    },
    removeSong: function(list, song) {
      // /:playlistId/songs/:songId
      return $http.delete('/api/playlists/' + list._id + '/songs/' + song._id, {
          songId: song._id
        })
        .then(function(res) {
          return res;
        })
        .catch($log.error);
    },
    removeList: function(list) {
      return $http.delete('/api/playlists/' + list._id)
        .then(function(res) {
          return res;
        })
        .catch($log.error);
    }
  };
});
