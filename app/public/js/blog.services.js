(function() {
  'use strict'
  //services only describe the http methods
  angular.module('app')
    .service('blogService', service)
  service.$inject = ['$http']

  function service($http) {
    this.getBlog = function() {
      return $http.get('/api/posts').then(function(response) {
        console.log("JUST A GET REQUEST: ", response);
        return response.data
      })
    }
    this.sendForm = function(tempObj) {
      return $http.post('/api/posts', tempObj).then(function(response) {
        console.log("SUBMITTED FORM RESPONSE: ", response);
        return response.data
      })
    }
    this.countVotesUp = function(posts) {
      console.log("POSTS ON UP COUNT IN SERVICE", posts);
      return $http.post('/api/posts', posts).then(function(response) {
        console.log("count votes up RES", response);
        return response.data
      })
    }
    this.countVotesDown = function(posts) {
      console.log("POSTS ON DOWN COUNT IN SERVICE", posts);
      return $http.post('/api/posts', posts).then(function(response) {
        console.log("count votes DOWN RES", response);
        return response.data
      })
    }
    this.deletePost = function(posts) {
      return $http.delete('/:id', posts).then(function(response) {
        console.log("DELETED POST OBJ", response);
      })
    }
    this.createCommentService = function(posts, comment) {
    //  console.log("THE ID", `/${posts.id}/comments`);
      return $http.post(`/api/posts/${posts.id}/comments`, {content:comment}).then(function(response) {
        console.log("ADDED COMMENT", response);
        return response.data
      })
    }
  }



}());
