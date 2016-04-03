'use strict';

var module = angular.module('ubi_app', ['ngRoute','ngCookies','ui.bootstrap']);

/*
module.run(['$rootScope', '$location', 'Authentication', function ($rootScope, $location, Authentication) {
    $rootScope.$on('$routeChangeStart', function (event,next) {


        if (!Authentication.isAuthenticated()) {
            $location.path('/login');
        }
        else {
            $location.path('/home');
        }
    });
}]);
*/


module.config(["$interpolateProvider", function($interpolateProvider) {
            $interpolateProvider.startSymbol('{$');
            $interpolateProvider.endSymbol('$}');
        }
    ]
);

module.config(function ($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: '/static/views/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm',
        }).when('/login',{
            templateUrl: '/static/views/login.html',
            controller: 'LoginController',
            controllerAs: 'vm',
        }).when('/musics/',{
            templateUrl: '/static/views/musics_list.html',
            controller: 'MusicController',
            controllerAs: 'musicCtrl',
        }).when('/me/',{
            templateUrl: '/static/views/mymusic_list.html',
            controller: 'UserMusicController'

        }).otherwise({
        redirectTo : '/'
    });
});

module.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
});


module.run(function ($http){

    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';

});
