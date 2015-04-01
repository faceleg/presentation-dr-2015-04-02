// One may use bluebird instead of $q

angular.module('HelloApp', [])
  .run(["$rootScope", function($rootScope) {
    Promise.setScheduler(function(cb) {
      $rootScope.$evalAsync(cb);
    });
  }]);
