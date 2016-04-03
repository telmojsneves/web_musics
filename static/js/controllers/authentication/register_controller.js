
(function () {
  'use strict';

  angular
    .module('ubi_app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication) {
    var vm = this;
    vm.register = register;

    activate();

    function activate() {
        if (Authentication.isAuthenticated()) {
            $location.url('/');
        }
    }

    function register() {
      Authentication.register(vm.email, vm.password, vm.username);
    }
  }
})();

/*
'use strict';

var main_app =  angular.module('ubi_app');

main_app.controller('MainCtrl',['$rootScope', '$scope', '$location','$routeParams'] function($rootScope, $scope, $location,$routeParams) {

    $scope.appName="UBI PROJECT TESTING";
    $scope.authorName = "TELMO NEVES"  ;

});
*/
