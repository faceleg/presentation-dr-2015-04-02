angular.module('app', ['ngResouce'])
  .factory('Train', [
    '$resource', '$http',
    function($resource, $http) {
      var URL = 'train/:id';
      var Train = $resource(URL, {
        id: '@id'
      }, {
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
