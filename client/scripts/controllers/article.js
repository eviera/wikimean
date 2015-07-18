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


  });
