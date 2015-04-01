// One may use bluebird instead of $q
// $q is slower than bluebird - http://jsperf.com/pimp-vs-bluebird-vs-q-vs-rsvp
// Only do this at project start

angular.module('HelloApp', [])
  .run(["$rootScope", function($rootScope) {
    Promise.setScheduler(function(cb) {
      $rootScope.$evalAsync(cb);
    });
  }]);
