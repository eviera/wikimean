'use strict';

angular
  .module('wikimeanApp', [
    'ngRoute',
    'restangular',
    'ngSanitize'
  ])
  .config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:3000/rest');

    $routeProvider
      .when('/', {
        templateUrl: 'views/wiki.html',
        controller: 'wikiCtrl'
      })
      .when('/article/:id', {
        templateUrl: 'views/article.html',
        controller: 'articleCtrl'
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
      scope: {
        src: '='
      },
      controller: 'sidebarCtrl',
      templateUrl: 'views/sidebar.html'
    };
  })  
  .filter('textiler', function() {
      return function(input)  {
        input = input || '';
        return textile(input);
      };
  });
