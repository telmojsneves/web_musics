'use strict';

var module =  angular.module('ubi_app');


module.factory('MusicService',['$http', function($http){

    var Musics = {};

    Musics.all = function(){

        var method = "GET";
        var url = "api/v1/musics/";

        return requestData(method, url);

    }

    Musics.nextPage = function(page){
        var method = "GET";
        var url = "api/v1/musics/?page=" + page ;

        return requestData(method, url);


    }

    Musics.get = function(musicID){

        //specific music
        var method = "GET";
        var url = "api/v1/musics/" + musicID + "/" ;

        return requestData(method, url)
    }

    Musics.add = function(music){
        var method = "POST";
        var url="api/v1/musics/";

        return insertData(method, url, music);

    }

    Musics.delete = function(){
        //delete music call
    }

    Musics.update = function(){
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


    return Musics;





}]);
