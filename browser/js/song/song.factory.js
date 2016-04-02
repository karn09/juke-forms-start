'use strict';

juke.factory('SongFactory', function($http, $log) {
  var _songListCache = [];
  return {
    convert: function(song) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      return song;
    },

    fetchAll: function() {
      return $http.get('/api/songs')
        .then(function(res) {
          angular.copy(res.data, _songListCache);
          return _songListCache;
        })
        .catch($log.error);
    }
  };

});
