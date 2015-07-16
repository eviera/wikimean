'use strict';

angular.module('wikimeanApp')
  .controller('wikiCtrl', function ($scope, $timeout, ArticleRestangular) {

  	ArticleRestangular.all('article?limit=1&sort=-created').getList().then(function(articles) {
      $scope.articles = articles;
    });

    //Vigilo la variable 'articles' y cuando cambia, ejecuto el jquery que highlightea los bloques de codigo
    $scope.$watch('articles', function() {
      $timeout(function() {
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
      });
    });

  });
