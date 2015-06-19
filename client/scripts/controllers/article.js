'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, ArticleService) {
    $scope.article = ArticleService.one($routeParams.id).get().$object;
  });
