main_app.controller('UserMusicController',
                    ['UserMusicService',
                    '$scope',
                    function(UserMusicService,$scope){


    $scope.data = {};
    $scope.musics = {};

    getAll();


    function getAll(){
        UserMusicService.all().then(function(response){

            $scope.data = response.data;
            $scope.musics = $scope.data;

        });

    }




}]);
