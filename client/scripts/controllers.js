'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, $timeout, $location, ArticleRestangular, Analytics) {
    Analytics.trackPage('/article/' + $routeParams.id);

    ArticleRestangular.one('article', $routeParams.id).get().then(function(article) {
        $scope.article = article;
        $scope.editArticle = function () {
          $location.path('/article/' + $routeParams.id + '/edit');
        };
    });

    postDecorate('article', $scope, $timeout);

  })
  .controller('articleEditCtrl', function ($scope, $routeParams, $location, ArticleRestangular, Analytics) {
    Analytics.trackPage('/article/' + $routeParams.id + '/edit');

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
  .controller('articleAddCtrl', function ($scope, $location, ArticleRestangular, Analytics) {
    Analytics.trackPage('/create/article';

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
  .controller('wikiCtrl', function ($scope, $timeout, $location, ArticleRestangular, Analytics) {
    Analytics.trackPage('/');

    $scope.addArticle = function () {
      $location.path('/create/article');
    };

  	ArticleRestangular.all('article?limit=1&sort=-created').getList().then(function(articles) {
      $scope.articles = articles;
    });

    postDecorate('articles', $scope, $timeout);

  })
  .controller('sidebarCtrl', function ($scope, ArticleRestangular) {

    ArticleRestangular.all('article?sort=-created').getList().then(function(articles) {
      $scope.sidebarArticles = articles;
    });

  })
  .controller('articleDateCtrl', function ($scope) {

  });



// Funciones auxiliares
function postDecorate(target, $scope, $timeout) {
  $scope.$watch(target, function() {
    $timeout(function() {

      //Highlighting de los bloques de codigo
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });

      //Se encierran las tablas en un div para hacerlas responsivas
      $('table').each(function () {
          $(this).wrap('<div class="table-responsive">');
      });
    });
  });
}
