angular.module('safeTimeout', [])
  .service('safeTimeout', function($timeout) {
    return function setTimeout(scope, fn, delay) {
      var promise = $timeout(fn, delay);
      var deregister = scope.$on('$destroy', function() {
        $timeout.cancel(promise);
      });
      promise.then(deregister);
    }
  })
  .controller('ExampleController', function($scope, $timeout) {
    safeTimeout($scope, function() {
      // do something
    }, 30000);
  });

// If using $timeout, use a wrapper service instead that ensures your $timeout is cleared on $destroy
