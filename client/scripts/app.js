'use strict';

angular
  .module('wikimeanApp', [
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:3000');

    $routeProvider
      .when('/', {
        templateUrl: 'views/wiki.html',
        controller: 'wikiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
});
