'use strict';

angular.module('wikimeanApp')
  .controller('wikiCtrl', function ($scope, ArticleService) {
  	$scope.articles = ArticleService.getList().$object; //Hace la llamada a getList, y cuando vuelve, copia las cosas a $object... y de alguna manera se le asigna a $scope.articles
  });
