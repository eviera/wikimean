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
        templateUrl: 'views/article-add-edit.html',
        controller: 'articleEditCtrl'
      })
      .when('/create/article', {
        templateUrl: 'views/article-add-edit.html',
        controller: 'articleAddCtrl'
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
  .filter('youtuber', function() {
    //La estructura es {{youtube:video_id}}
    return function(input) {
      var result = input;
      var youtubeExp = "{{youtube:";
      var expStart = input.indexOf(youtubeExp);
      if (expStart > -1) {
        var expEnd = input.indexOf("}}", expStart);
        var firstPart = input.substring(0, expStart);
        var secondPart = input.substring(expEnd + 2);
        var videoId = input.substring(expStart + youtubeExp.length, expEnd);

        var youtubeEmbbededHTML='<div >' +
          '<iframex type="text/html" ng-src="{{ trustSrc(' + videoId  +') }}"></iframe>' +
          '</div>';

        result = firstPart + youtubeEmbbededHTML + secondPart;
      }
      return result;
    };
  })
  .run(function($rootScope, Restangular) {
    Restangular.one('editmode').get().then(function(serverProp) {
      $rootScope.isEditMode = serverProp.isEditMode;
    });
  });
