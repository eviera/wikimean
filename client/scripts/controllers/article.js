'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, ArticleRestangular) {

    $scope.article = ArticleRestangular.one('article', $routeParams.id).get().$object;

    $scope.saveArticle = function () {
      $scope.article.save().then(function () {
        alert('guardado' + $scope.article.content);
      });
      /*
      ArticleRestangular.save('article', $scope.article).then(function () {
        alert('guardado');
      });
      */
    };

  });
