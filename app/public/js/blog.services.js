(function() {
  'use strict'
//services only describe the http methods
  angular.module('app')
    .service('blogService', service)
    service.$inject = ['$http']

    function service ($http) {
      this.getBlog = function (){
        return $http.get('/api/posts').then(function (response) {
          console.log("THIS",response);
          return response.data
        })
      }
      this.sendForm = function (tempObj) {
        return $http.post('/api/posts', tempObj).then(function (response){
          console.log("SUBFORM RES", response);
          return response.data
        })
      }

      }





}());
