'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, $timeout, ArticleRestangular) {
    $scope.alert = {};

    ArticleRestangular.one('article', $routeParams.id).get().then(function(article) {
        $scope.alert.show = false;
        $scope.article = article;
        $scope.saveArticle = function () {
          $scope.article.save().then(function () {
            $scope.alert.show = true;
            $scope.alert.message = "Article saved";
          });
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
