angular.module('app'. ['ngResource'])
  .factory('CustomerGroup', [
    '$resource',
    function($resource) {
      return $resource('/customergroup/:id', {
        id: '@id'
      });
    }
  ]);

/*
We get:

{ 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };
  
for free!
*/

angular.module('app', ['CustomerGroup'])
  .controller('ExampleController', function(CustomerGroup) {
  
    // "class" methods are called like this
    $scope.customerGroups = CustomerGroup.query();
    
    var newCustomerGroup = new CustomerGroup();
    newCustomerGroup.name = 'This group is very new';
    // "instance" methods are called with a $ prefix
    newCustomerGroup.$save();
    
    // Callback style
    CustomerGroup({ id: 1 }, function(customerGroup) {
      console.log(customerGroup);
    });
    
    // Or with a promise:
    CustomerGroup({ id: 1 }).$promise.then(function(customerGroup) {
      console.log(customerGroup);
    })
    .catch(function() {
      console.log('undefined behaviour occurred');
    });
    
    // The object returned is an empty reference that will "become" the resource when the promise is resolved
    // One may immediately use the below object in views (even though it is not immediately resolved)
    $scope.customerGroup = CustomerGroup.get({ id: 1 });
  });

// Do not use $http in your controllers. Use re-usable, encapsulating resources
// Testable
// Re-usable
// Keep controllers slim
