'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, $timeout, $location, $sce, ArticleRestangular) {

    $scope.trustSrc = function(src){
      alert('entro');
			return $sce.trustAsResourceUrl(src);
		};

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
  .controller('articleAddCtrl', function ($scope, $location, ArticleRestangular) {
    $scope.article = {};

    $scope.saveArticle = function () {
      $scope.article.created = new Date();
      $scope.article.modified = new Date();
      ArticleRestangular.all('article').post($scope.article).then(function () {
        $location.path('/article');
      });
    };

    $scope.cancel = function () {
      $location.path('/article');
    };

  })
  .controller('wikiCtrl', function ($scope, $timeout, $location, ArticleRestangular) {

    $scope.addArticle = function () {
      $location.path('/create/article');
    };

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
