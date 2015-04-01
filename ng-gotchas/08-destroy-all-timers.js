// Consider normal usage

angular.module('app', [])
  .controller('ExampleController', function($timeout) {
    $timeout(function() {
      // do something
    }, 10000);
  });

// What happens if the controller is destroyed before the timeout finishes?
