'use strict';

var juke = angular.module('juke', ['ui.router', 'ui.bootstrap', 'ui.sortable']);

juke.run(function($rootScope) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
  });
});
