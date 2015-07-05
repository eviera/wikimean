'use strict';

angular.module('wikimeanApp')
  .controller('sidebarCtrl', function ($scope, ArticleRestangular) {
  	$scope.articles = ArticleRestangular.all('article?sort=created').getList().$object; 
  });
