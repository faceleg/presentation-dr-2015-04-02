angular.module('app', ['ngResouce'])
  .factory('Train', [
    '$resource', '$http',
    function($resource, $http) {
      var URL = 'rest/train/instance/:id';
      var Train = $resource(URL, {
        id: '@id'
      }, {
        copy: {
          method: 'POST',
          url: URL + '/copy'
        },
        pushToAmicus: {
          method: 'POST',
          url: URL + '/push',
          transformRequest: function(data, headersGetter) {
            return angular.toJson({
              lastModifiedTimestamp: data.lastModified
            });
          }
        }
      });

      Train.prototype.$resetToGamePlan = function resetToGamePlan(reason) {
        var resetToGamePlanURL = URL.replace(/:id/, this.id) + '/revert';
        if (reason.forceSave) {
          delete reason.forceSave;
          resetToGamePlanURL += '?forcesave=true';
        }
        return $http.post(resetToGamePlanURL, reason).then(function(response) {
          return new Train(response.data);
        });
      };
      return Train;
    }
  ]);
