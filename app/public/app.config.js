(function() {
  'use strict';

  angular.module('app').config(config)

  config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

  function config($stateProvider, $urlRouterProvider, $locationProvider){

    // this line is optional
    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        name: 'home',
        url: '/',
        component: 'blog'
      })
     .state({
        name: 'edit',
        url: '/edit/:id',
        component: 'editBlog'
     })
    //  .state({
    //     name: 'show',
    //     url: '/houses/:id',
    //     component: 'houseShow'
    //  })
  }

}());
