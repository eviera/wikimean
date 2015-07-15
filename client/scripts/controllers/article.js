'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, ArticleRestangular) {
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

  });
