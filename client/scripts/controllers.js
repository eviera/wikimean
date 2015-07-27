'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, $timeout, $location, ArticleRestangular) {

    ArticleRestangular.one('article', $routeParams.id).get().then(function(article) {
        $scope.article = article;
        $scope.editArticle = function () {
          $location.path('/article/' + $routeParams.id + '/edit');
        };
    });

    $scope.$watch('article', function() {
      $timeout(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      });
    });

  })
  .controller('articleEditCtrl', function ($scope, $routeParams, $location, ArticleRestangular) {

    ArticleRestangular.one('article', $routeParams.id).get().then(function(article) {
        $scope.article = article;
        $scope.saveArticle = function () {
          $scope.article.modified = new Date();
          $scope.article.save().then(function () {
            $location.path('/article/' + $routeParams.id);
          });
        };
        $scope.cancel = function () {
          $location.path('/article/' + $routeParams.id);
        };

    });

  })
  .controller('wikiCtrl', function ($scope, $timeout, ArticleRestangular) {

  	ArticleRestangular.all('article?limit=1&sort=-created').getList().then(function(articles) {
      $scope.articles = articles;
    });

    //Vigilo la variable 'articles' y cuando cambia, ejecuto el jquery que highlightea los bloques de codigo
    $scope.$watch('articles', function() {
      $timeout(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      });
    });

  })
  .controller('sidebarCtrl', function ($scope, ArticleRestangular) {

    ArticleRestangular.all('article?sort=-created').getList().then(function(articles) {
      $scope.sidebarArticles = articles;
    });

  })
  .controller('articleDateCtrl', function ($scope) {

  });
