'use strict';

var module =  angular.module('ubi_app');


module.factory('UserMusicService',['$http', function($http){

    var Musics = {};

    Musics.all = function(){

        var method = "GET";
        var url = "api/v1/me/";

        return requestData(method, url);

    }

    Musics.nextPage = function(page){
        var method = "GET";
        var url = "api/v1/me/?page=" + page ;

        return requestData(method, url);


    }

    Musics.get = function(musicID){

        //specific music
        var method = "GET";
        var url = "api/v1/me/" + musicID + "/" ;

        return requestData(method, url)
    }

    Musics.add = function(music_id){
        var method = "POST";
        var url="api/v1/me/";

        return insertData(method, url,{"music_id":music_id});

    }

    Musics.delete = function(music_id){
        var method = "DELETE";
        var url="api/v1/me/"+music_id+"/";

        deleteData(method, url);
        //delete music call
    }

    Musics.update = function(music,user){
        //update a specific music info
    }


    function requestData(method, url){
        //XXX use $q to promise events
        return $http({
            method: method,
            url: url
        }).then(function successCallback(response) {
            return response;
          }, function errorCallback(response) {
              // invalid response // in a solid project use  $Q.reject
              return response;
        });
    }

    function insertData(method, url, data){
        return $http({
            method: method,
            url: url,
            data: data
        }).then(function successCallback(response) {
            return response;
          }, function errorCallback(response) {
              // invalid response // in a solid project use  $Q.reject
              return response;
        });
    }

    function deleteData(method, url){
        return $http({
            method: method,
            url: url,
        }).then(function successCallback(response) {
            return response;
          }, function errorCallback(response) {
              // invalid response // in a solid project use  $Q.reject
              return response;
        });
    }


    return Musics;





}]);
