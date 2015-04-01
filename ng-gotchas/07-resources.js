angular.module('app', ['ngResouce'])
  .factory('Train', [
    '$resource', '$http',
    function($resource, $http) {
      var URL = 'train/:id';
      var Train = $resource(URL, {
        id: '@id'
      }, {
        // Remember we get get, $save, query, $remove, $delete for free. 
        // Remember you can override the above if required!
        copy: {
          method: 'POST',
          url: URL + '/copy'
        },
        push: {
          method: 'POST',
          url: URL + '/push',
          transformRequest: function(data, headersGetter) {
            return angular.toJson({
              lastModifiedTimestamp: data.lastModified
            });
          }
        }
      });

      Train.prototype.$reset = function reset(reason) {
        var resetURL = URL.replace(/:id/, this.id) + '/revert';
        if (reason.forceSave) {
          delete reason.forceSave;
          resetURL += '?forcesave=true';
        }
        return $http.post(resetURL, reason).then(function(response) {
          return new Train(response.data);
        });
      };
      return Train;
    }
  ]);

// Resources are OOP (sort of)
// Add custom methods to your instances, add custom class methods
// Group all logic related to your object in one place
// Hide weirdo code required by the crazy backend
// Allow the rest of your app to "pretend" a backend is sane in situations where it is not
// See https://docs.angularjs.org/api/ngResource/service/$resource for more wondrous detail
