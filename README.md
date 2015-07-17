# wikimean

### wiki basado en MEAN (mongo, express, angular, node)

ToDo
* ✓ setup inicial
* ✓ armado de base y conexion cliente con restangular
* ✓ pagina cliente inicial recuperando informacion de la base
* ✓ filtro textile
* ~~campo con tags~~
* ✓ revisar campos fecha
* ✓ diagramacion de pagina principal
  * ✓ tomar colores de https://www.materialpalette.com/deep-purple/orange
  * ✓ header bootstrap (bg violeta fg naranja ?)
  * ✓ izq. zona con todos los articulos  ~~los ultimos 10 titulos ordenados fecha desc y link a 'mas' para ver el resto~~  (violeta)
    * ✓ puede ser un ng-include que adentro tenga un controller propio
    * ✓ sino puede ser una directiva customizada, como < sidebar /> (la directiva tiene una propiedad controller para asignarle un controller aparte)
  * ✓ centro con el ultimo articulo completo
  * footer con copyright y login
* migrar articulos del sitio viejo
* ✓ highlightjs
* probar Restangular.setBaseUrl(location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + location.pathname);
* filtro para youtube
* pagina del articulo
* ~~busqueda por tags~~
* pagina de login para poder editar
* edicion en la pagina del articulo
* deployment produccion


Links interesantes:
* http://txstyle.org/
* https://github.com/borgar/textile-js
* https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application
* https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular
* https://github.com/alexyoung/stextile
* http://alexgorbatchev.com/SyntaxHighlighter/manual/installation.html
* https://highlightjs.org/download/
* https://hackhands.com/mongodb-crud-mvc-way-with-passport-authentication/
* http://stackoverflow.com/questions/18708428/how-to-do-authentication-with-node-js-and-mean-stack
