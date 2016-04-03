
(function () {
  'use strict';

  angular
    .module('ubi_app')
    .controller('LoginController', LoginController)
    .controller('LogoutControllerNav', LogoutControllerNav);

  LoginController.$inject = ['$location', '$scope', 'Authentication'];
  LogoutControllerNav.$inject = ['$scope','Authentication'];

  function LoginController($location, $scope, Authentication) {
    var vm = this;

    vm.login = login;

    activate();

    function activate() {
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    function login() {
      Authentication.login(vm.email, vm.password);
    }
  }

  function LogoutControllerNav($scope, Authentication){

      var vm = this;

      vm.logout = logout;

      function logout(){
          Authentication.logout();
      }





  }




})();
