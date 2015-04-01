angular.module('app', [])
  .controller('ExampleController', function($scope, $timeout) {
    $timeout(function() {
      // do something
    }, 10000);
  });

// What happens if the controller is destroyed before the timeout finishes?
