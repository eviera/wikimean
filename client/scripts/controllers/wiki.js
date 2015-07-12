'use strict';

angular.module('wikimeanApp')
  .controller('wikiCtrl', function ($scope, ArticleRestangular) {
  	$scope.articles = ArticleRestangular.all('article?limit=10&sort=-created').getList().$object; //Hace la llamada a getList, y cuando vuelve, copia las cosas a $object... y de alguna manera se le asigna a $scope.articles
  });
