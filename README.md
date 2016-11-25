# Práctica: Plugin General gitbook-start npm


![imagen1][logo]
[logo]: https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQmTdns2SIHRywqRrwjOmWCewbAPJKjv5s_iblApWlTryhkwB1n


## Descripción de la práctica

### ayuda
console.log("gitbook-start [OPTIONS]\n"+
"--autor: autor del libro a crear node gitbook-star -a AutorDelLibro\n"+
"--url: repositorio github contra el que se va a trabajar -r github.com/repo.git\n"+
"--directorio: nombre del directorio a crear\n"+
"--repo: Crear repositorio en GITHUB\n"+
"--help: muestra ayuda sobre las opciones disponibles\n"+
"--deploy: Deploy en IaaS(iaas.ull.es)"+
"--iaasIP: Direccion de la maquina virtual\n"+
"--iaaspath: Repositorio que va a contener el libro en iaas\n"+
"--github: Repositorio a desplegar el libro en git\n"
"--heroku: Nombre de su api en heroku\n");

###Opcion Github

gitbook-start --github d --directorio <nombre>
accedemos a la CARPETA
npm install
node app.js

### Objetivo:
El servidor proveído por el plugin (sea iaaso heroku) deberá autenticar que el lector del libro pertenece a una organización dada de GitHub (por ejemplo ULL-ESIT-SYTW-1617). Si es el caso que pertenece podrá seguir leyendo el libro, sino será redirigido a la ruta de autenticación.

Puede partir de los repos de los plugins que ha usado en prácticas anteriores o crear unos nuevos


### Pasos a seguir:

#### Instalación del plugin
Para ello nos serviremos del paquete [npm-gitbook-start](https://www.npmjs.com/package/gitbook-start-team-noejaco2017-2.0) y seguiremos las instrucciones indicadas.

Una vez finalizado este paso, tendremos un servidor Express desplegado en la IP indicada así como nuevas tareas añadidas al fichero __gulpfile.js__.
#### Paquetes necesarios
Deberemos contar con Node.js y npm instalados en nuestra máquina.

Instalación de los paquetes y dependencias necesarias para el correcto funcionamiento:
~~~
$ npm install
~~~

#### Despliegue del libro
A continuación debemos desplegar el libro a través de la nueva tarea generada.

Para ello ejecutamos por consola:
~~~
$ gulp deploy
~~~


#### Desplegar el servidor Express
En la línea de comandos ingresamos:
~~~
node app.js
~~~
Esto nos permitirá ingresar en el prompt nuestro nombre de usuario y nuestra contraseña, una vez ingresados, correrá el servidor y nos proporcionará información acerca de la ubicación del mismo.
#### Acceso al libro
Como último paso deberemos acceder a la ubicación del servidor proporcionada en el paso anterior.
Lo que veremos será una página de logueo en la que haremos click sobre `login` para acceder al libro.








## Enlaces:
##### Enlace al libro desplegado en gh-pages
[gh-pages](https://ull-esit-sytw-1617.github.io/tareas-iniciales-noejaco2017/)

##### Enlace a gitbook
[gitbook](https://alu0100836059.gitbooks.io/apuntes_sytw_16_17/content/)

##### Enlace a npm gitbook-start-2.0
[npm-gitbook-start](https://www.npmjs.com/package/gitbook-start-team-noejaco2017-2.0)

##### Enlace a npm plugin Heroku
[npm-heroku](https://www.npmjs.com/package/gitbook-start-plugin-heroku-noejaco2017)

##### Enlace al paquete npm iaas
[npm-plugin-iaas](https://www.npmjs.com/package/gitbook-start-plugin-iaas-ull-es-noejaco2017)

##### Enlace a la aplicación desplegada en heroku
[heroku](https://herokuiaass.herokuapp.com/)



## Autores
[Noé Campos](http://dsi1516.github.io/Practica1/)

[Jacobo](https://ull-esit-sytw-1617.github.io/tareas-iniciales-noejaco2017/)
