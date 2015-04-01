 - Unit / E2E testing can be tricky "get one's head around" and to setup.
 - After setup however, it's very easy to add tests for a different portion of code

# Three requirements

# 1. Package json

```JSON
{
  "devDependencies": {
    "jasmine": "^2.1.1",
    "karma": "^0.12.28",
    "karma-coverage": "^0.2.7",
    "karma-jasmine": "^0.3.2",
    "karma-junit-reporter": "^0.2.2",
    "karma-phantomjs-launcher": "^0.1.4"
  },
  "scripts": {
    "pretest": "npm install && bower install",
    "test": "node_modules/karma/bin/karma start karma.conf.js --no-auto-watch --single-run --reporters dots",
    // Use in development
    "test-watch": "node_modules/karma/bin/karma start karma.conf.js --auto-watch",
    // For travis
    "test-single-run": "node_modules/karma/bin/karma start karma.conf.js  --single-run"
  }
}
```

# 2. Karma config

```JS
module.exports = function(config) {
  config.set({
    files: [
      // Files your code needs to run - NG and non-NG dependencies
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/sn-sticky-table-header.js',
      'test/unit/**/*.js'
    ],
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/**/*.js': ['coverage']
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-jasmine',
      'karma-junit-reporter'
    ],
    coverageReporter: {
      reporters: [{
        type: 'html',
        subdir: 'report-html'
      }, {
        type: 'lcov',
        subdir: 'report-lcov'
      }]
    }
  });
};
```

# 3. Test code

This is where things can get tricky.
 - Be persistent
 - Use Goolge
 - Ask for help

```JavaScript
angular.module('snStickyTableHeaderApp', ['snStickyTableHeader']);

describe('Solnet Angular Sticky Table Header', function() {
  var $window, scrollFunction, element, scope;

  beforeEach(module('snStickyTableHeaderApp'));
  
  var options = {
    STICKY: 'STICKY',
    CLONE: 'CLONE',
    CLONE_VISIBLE: 'CLONE_VISIBLE'
  };
  
  beforeEach(function() {
    module(function($provide) {
      $provide.value('snStickyTableHeaderOptions', options);
    });
  });

  beforeEach(module('snStickyTableHeader'));

  beforeEach(inject(function($rootScope, $compile, _$window_, _snStickyTableHeaderOptions_) {
    $window = _$window_;
    scope = $rootScope.$new();

    element = '<table sn-sticky-table-header><thead><tr><th>heading</th></tr></thead><tbody><tr><td>cell</td></tr></tbody></table>';

    element = $compile(element)(scope);
    scope.$digest();
  }));

  describe('#initialise', function() {
    it('should bind the "scroll" event to the $window', inject(function() {
      spyOn(angular, 'element').and.callFake(function() {
        return {
          bind: function(a, b) {
            expect(a).toEqual('scroll resize');
          },
          off: function() {}
        };
      });
      scope.initialise();

      expect(angular.element).toHaveBeenCalledWith($window);
    }));
  });

  describe('#destroy', function() {
    it('should remove the "scroll" event from the $window on destroy', inject(function() {
      spyOn(angular, 'element').and.callFake(function() {
        return {
          unbind: function(a, b) {
            expect(a).toEqual('scroll resize');
          },
          off: function() {}
        };
      });
      scope.$destroy();
    }));
  });

  describe('#scroll', function() {
    it('should return true', inject(function() {
      expect(scope.scroll()).toBe(true);
    }));

    it('should call #stick if the window has been scrolled such that the top of the table is no longer visible', inject(function() {
      spyOn($.prototype, 'scrollTop').and.callFake(function() {
        return 100;
      });
      spyOn(scope, 'stick').and.callThrough();
      scope.scroll();
      expect(scope.stick).toHaveBeenCalled();
    }));

    it('should call #unstick if the window has been scrolled such that the top of the table is visible', inject(function() {
      scope.stick();
      spyOn(scope, 'unstick').and.callThrough();
      scope.scroll();
      expect(scope.unstick).toHaveBeenCalled();
    }));
  });

  describe('#stick', function() {
    it('should add the correct class to the original thead', inject(function() {
      scope.stick();
      expect(element.find('thead').hasClass(options.STICKY)).toBe(true);
    }));

    it('should clone the table and apply the correct classes', inject(function() {
      expect(scope.clone).toBe(null);
      scope.stick();
      expect(scope.clone).not.toBe(null);

      expect(scope.clone.hasClass(options.CLONE)).toBe(true);
      expect(scope.clone.hasClass(options.CLONE_VISIBLE)).toBe(true);
    }));

    it('should call #styleClone', inject(function() {
      spyOn(scope, 'styleClone');
      scope.stick();
      expect(scope.styleClone).toHaveBeenCalled();
    }));

    it('should not clone the table more than once', inject(function() {
      var spy = spyOn(scope, 'cloneTable').and.callThrough();
      scope.stick();
      scope.stick();
      scope.stick();
      scope.stick();
      expect(scope.cloneTable.calls.count()).toBe(1);
    }));
  });

  describe('#unstick', function() {
    it('after a #stick call should remove the CLONE_VISIBLE class from the clone', inject(function() {
      scope.stick();
      scope.unstick();
      expect(scope.clone.hasClass(options.CLONE_VISIBLE)).toBe(false);
    }));
  });

  describe('#cloneTable', function() {
    it('should remove the cloned table\'s tbody after cloning', function() {
      scope.stick();
      expect(angular.element(scope.clone).find('tbody').length).toBe(0);
      expect(angular.element(scope.table).find('tbody').length).toBe(1);
    });
  });

  describe('#styleClone', function() {
    it('should set the width of the cloned table\'s th elements to be the same as the original', inject(function() {
      scope.stick();
      th = scope.thead.find('th');
      angular.forEach(scope.clone.find('th'), function(thClone, thCloneIndex) {
        expect(angular.element(thClone).width()).toBe(angular.element(th.get(thCloneIndex)).width());
      });
    }));
  });
});
```
