'use strict';

angular.module('wikimeanApp')
  .controller('articleCtrl', function ($scope, $routeParams, ArticleRestangular) {
    $scope.article = ArticleRestangular.one('article', $routeParams.id).get().$object;
  });
