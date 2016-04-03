/**
* Authentication
* GET BY ANOTHER WEBSERVICE ALREADY DONE
*/
(function () {
    'use strict';

    angular.module('ubi_app').factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    function Authentication($cookies, $http) {

        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            register: register,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate
        };

        return Authentication;

        function register(email, password, username) {
          return $http.post('/api/v1/users/', {
            username: username,
            password: password,
            email: email
        }).then(registerSuccessFn, registerErrorFn);

            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(email, password);
            }

            function registerErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }

        function login(email, password) {
            return $http.post('/api/v1/auth/login/', {
                email: email, password: password
            }).then(loginSuccessFn, loginErrorFn);

            function loginSuccessFn(data, status, headers, config) {

                Authentication.setAuthenticatedAccount(data.data);
                window.location = '/';
            }


            function loginErrorFn(data, status, headers, config) {
                console.error('Error login request');
            }
        }

        function logout(){
            return $http.post('/api/v1/auth/logout/').then(logoutSuccessFn, logoutErrorFn);
            function logoutSuccessFn(data,status,headers, config){

                Authentication.unauthenticate();
                window.location = '/';

            }
            function logoutErrorFn(data,status,headers,config){

                console.log("maybe no user to logout");

            }
        }

        function getAuthenticatedAccount() {
            if (!$cookies.getObject("authenticatedAccount")) {
                return;
            }

            return JSON.parse($cookies.getObject("authenticatedAccount"));
        }

        function isAuthenticated() {
            if ($cookies.getObject("authenticatedAccount")){
                return true;

            }return false;
        }

        function setAuthenticatedAccount(account) {

            $cookies.putObject('authenticatedAccount',JSON.stringify(account));

        }

        function unauthenticate() {
            delete $cookies.remove('authenticatedAccount');
        }

    }
})();
