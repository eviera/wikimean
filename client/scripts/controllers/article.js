'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, ArticleRestangular) {

    ArticleRestangular.one('article', $routeParams.id).get().then(function(article) {
        $scope.article = article;
        $scope.saveArticle = function () {
          $scope.article.save().then(function () {
            alert('guardado' + $scope.article.content);
          });
        };
    });

  });
