'use strict';

angular
  .module('wikimeanApp', [
    'ngRoute',
    'restangular',
    'ngSanitize'
  ])
  .config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl(location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + location.pathname + 'rest');

    $routeProvider
      .when('/', {
        templateUrl: 'views/wiki.html',
        controller: 'wikiCtrl'
      })
      .when('/article/:id', {
        templateUrl: 'views/article.html',
        controller: 'articleCtrl'
      })
      .when('/article/:id/edit', {
        templateUrl: 'views/article-edit.html',
        controller: 'articleEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  })
  .factory('ArticleRestangular', function(Restangular) {  //Para reemplazar los IDs
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    })
  })
  .directive('sidebar', function() {
    return {
      restrict: 'E',
      controller: 'sidebarCtrl',
      templateUrl: 'views/sidebar.html'
    };
  })
  .directive('articleDate', function() {
    return {
      restrict: 'E',
      scope: {
        article: '='
      },
      controller: 'articleDateCtrl',
      templateUrl: 'views/article-date.html'
    };
  })
  .filter('textiler', function() {
      return function(input)  {
        input = input || '';
        return textile(input);
      };
  })
  .run(function($rootScope, Restangular) {
    Restangular.one('editmode').get().then(function(serverProp) {
      $rootScope.isEditMode = serverProp.isEditMode;
    });
  });
