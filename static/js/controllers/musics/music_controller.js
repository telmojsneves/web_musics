'use strict';

var main_app =  angular.module('ubi_app');

main_app.controller('MusicController',
                    ['MusicService',
                    'UserMusicService',
                    'Authentication',
                    '$uibModal',
                     '$scope',
                     '$location',
                     '$routeParams',
                      function( MusicService,
                                UserMusicService,
                                Authentication ,
                                $uibModal,
                                $scope,
                                $location,
                                $routeParams) {


    if (!Authentication.isAuthenticated()){
        $location.path('/login');
        
    }

    var user = getAuthenticatedUser();

    $scope.itemsPerPage = 12;

    $scope.data = {};

    getAll();


    function isUserinMusic(users){

        var result = false;

        angular.forEach(users, function(music_user){

            /* only id is enough */
            if (user.id == music_user.id && user.email == music_user.email) {
                result = true;
            }
        });
        return result;
    }

    function getAuthenticatedUser(){

        var user = {};
        if (Authentication.isAuthenticated()){
            user = Authentication.getAuthenticatedAccount();

        }
        return user;
    }

    function checkUserInMusic(musics){

        angular.forEach(musics,function(music){
            if (music.users.length != 0){

                if (isUserinMusic(music.users)){
                    music.checked = true;
                }

            }
        });
    }

    function getAll(){
        MusicService.all().then(function(response){

            $scope.data = response.data;
            $scope.musics = $scope.data.results;

            $scope.totalItems = $scope.data.count;

            checkUserInMusic($scope.musics);


        });

    }

    $scope.checkedBox = function(music){

        if (music.checked == true){
            UserMusicService.add(music.id);
        }
        else{
            //get first the identifier maybe
            UserMusicService.delete(music.id);

        }

        //UserMusicService.;
        //post to user this specific music or remove it from
        //nested resource (better approach http://jaredscheib.azurewebsites.net/restful-api-and-many-to-many-relationships/)



    }

    $scope.musicPageChanged = function(){

        MusicService.nextPage($scope.currentPage)
            .then(function(response){

                $scope.data = response.data;
                $scope.musics = $scope.data.results;
                checkUserInMusic($scope.musics);
            });
    }

    $scope.addMusic = function(){

        var modalInstance = $uibModal.open({
            templateUrl: '/static/views/musics_add.html',
            controller: 'MusicControllerAdd',
            resolve: {
                music: function () {
                    return $scope.music;
                }
            }
        });

        modalInstance.result.then(function (music) {
            $scope.music = music;

            MusicService.add($scope.music);
            getAll();
        });

        $scope.singleModel = false;

    };



}]);


main_app.controller('MusicControllerAdd',
                    ['$scope',
                    '$uibModalInstance',
                    function(   $scope,
                                $uibModalInstance) {

    $scope.music = {};

    $scope.ok = function(){

        $uibModalInstance.close($scope.music);

    }

    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }


}]);
