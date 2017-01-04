#!/usr/bin/env node
var express = require('express');
var app = express()
var path = require('path');
//var fs= require('fs-extra');
var fs = require('fs-extended');
var fs_simple=('fs');
var ejs=require('ejs');
var child = require("child_process");
var exec = require('child_process').exec;
//########################################################################################################################################3
var github = require('octonode');
var inquirer = require('inquirer');
//var org = github.Organization('bulletjs');
//var org = github.Organization('bulletjs');

//
var client = github.client();


//MINIMIST
 var argv = require('minimist')(process.argv.slice(2));
 console.dir(argv);



////////////////
var author;
var name;
var directorio;
var repo_url;
// var iaasip;
// var iaaspath;
// var appheroku;
var url_wiki;
////////////////

// Para el package.EJS dependiendo de la entrada permitimos ''
var iaaspath = argv.iaaspath || '';
var iaasip = argv.iaasIP || '';
var appheroku = argv.heroku || '';



// var ghme = client.me();
// function preguntas2(){
// prompt.get([{
//        name: 'nombre_paquete',
//        //required: true
//      },{
//        name: 'url',
//        //required: true
//      },{
//          name: 'iaas_ip',
//          require: true
//      },{
//          name: 'iaas_path',
//          require: true
//
//      },{
//          name: 'nombre_heroku',
//          require: true
//      },{
//          name: 'author',
//          require: true
//      },], function (err, result) {
//      //
//      // Log the results.
//      //
//      console.log('  nombre paquete: ' + result.nombre_paquete);
//      console.log('  url repo: ' + result.url);
//      console.log('  iaas_path: ' + result.iaas_ip);
//      console.log('  nombre heroku ' + result.iaas_path);
//      console.log('  author ' + result.nombre_heroku);
//      console.log('  author ' + result.author);
//       author=result.author;
//       name=result.nombre_paquete;
//       repo_url=result.url;
//       iaasip= result.iaas_ip;
//       iaaspath=result.iaas_path;
//       appheroku=result.nombre_heroku;
//    });
// }
////
var datos_usuario = [
    {
      name: 'nombre_paquete',
      message: "Introduzca un nombre para su aplicación\n",
      default: "Libro web"
     },
     {
       name: 'url',
       message: "Introduzca la URL de su repositorio git\n",
       require: true
     },
     {
       name: 'url_wiki',
       message: "Introduzca la URL de su wiki.\n"+
                "Si no está interesado en el despliegue de su wiki pulse intro",
     },
     {
      name: 'author',
      message: "Introduzca el nombre del autor:",
      require: true

    },];
////


function preguntas(){
      var preguntas = [{
        type: 'input',
        name: 'name_usuario',
        message: 'Intrduzca su usuario, Por favor\n',
        default: 'JacoboRG',
      },{
        type: 'password',
        name: 'password_usuario',
        message: 'Introduzca contraseña: \n',
        default: '1234pepe',
      }];
}

//--------------------------------------------------












function estructura(directorio){
      //CREACION DE LOS DIRECTORIOS TXT, SCRIPTS, Y LA CARPETA A GENERAR
      //creamos el directorio raiz
      fs.createDir("./" + directorio, function(err){
            if(err)
              console.log(err);
        	});


          //creamos el directorio txt
          fs.createDir("./" + directorio + "/txt", function(err){
            if(err)
              console.log(err);
        	});


        	//creamos el directorio scripts
        	fs.createDir("./" + directorio + "/scripts", function(err){
            if(err)
              console.log(err);
        	});


        	//copiamos lo que hay en txt y lo ponemos en el txt creado
          fs.copyDir(path.join(__dirname, '..','txt'), "./" + directorio + "/txt", function (err) {
          	if (err)
              console.error(err)
        	});


          //copiamos lo que hay en scripts y lo ponemos en el spripts creado
          fs.copyDir(path.join(__dirname, '..', 'scripts'), "./" + directorio + "/scripts", function (err) {
          	if (err)
              console.error(err)
        	});


          //copiamos gulpfile
          // fs.copyFile(path.join(__dirname,'..','gulpfile.js'), "./" + directorio + "/gulpfile.js",function(err){
          //   if(err)
          //     console.log(err);
          // });


          //copiamos el book
          fs.copyFile(path.join(__dirname,'..','book.json'),"./" + directorio + "/book.json",function(err){
            if(err)
            console.log(err);
          });

          // //copiamos el gitignore
          // fs.copyFile(path.join(__dirname,'..','template_npm','.gitignore'),"./" + directorio + "/.gitignore",function(err){
          //   if(err)
          //   console.log(err);
          // });

          //renderizando package.json
          ejs.renderFile(path.join(__dirname,'..', 'template_npm', 'package.ejs'), { autor: author , nombre: name, direcciongit: repo_url, dirwiki: url_wiki, nombreheroku:appheroku ,direccionip:iaasip,direccionpath:iaaspath},
            function(err,data){
              if(err) {
                  console.error(err);
              }
              if(data) {
                  fs.writeFile("./" + directorio + "/package.json", data);
              }
          });
console.log("SALGO");

}


if(argv.h || argv.help){

    //MENU
    console.log("\ngitbook-start [OPTIONS]\n"+
    "--deploy: Despliega cualquier opcion de las siguietes\n\n"+
    "--deploy crear-repo: Crea repositorio en github\n"+
    "--deploy dropbox: Generara una app(server) donde nos logearemos a traves de una bbdd creada en dropbox en heroku\n"+
    "--deploy github: Generaremos una oauth en github a traves de heroku\n"+
    "--deploy mongodb: Generara una app(server) donde nos logearemos a traves de una bbdd creada en mongodb a traves de heroku\n"+
    "--deploy iaas: Crea server en en iaas\n"+
    "--deploy heroku: Crea server en heroku\n\n"+
    "--deploy iaasheroku: Despliega el libro tanto en iaas como en heroku\n\n"+
    "--directorio <nombre directorio>\n\n\n\n"+
    "\tEJ: gitbook-start --deploy <cualquiera> --directorio <nombre directorio>\n"
    );


}else{
    if(argv.deploy == 'crear-repo'){
      console.log("LLEGAMOS A CREAR REPO"+argv.repo);

              if(fs.existsSync(path.join(process.env.HOME, './.gitbook-start/config.json'))){
                       console.log("EXISTE");

                       var file = path.join(process.env.HOME, './.gitbook-start/config.json');//
                       console.log("FICHERO: "+file);


                       fs.readFile(file,"utf-8", function (err, token){
                            if (err) throw err;
                            console.log("VALOR DL FICHERO: "+token);

                            //prueba = token;

                            console.log("TOKEEEEEEN =>"+token+"<=NO ESPACIOS");
                            //prueba.replace(/\s/g,'');
                            // console.log("TOKEN1"+token);
                            client = github.client(token);

                            var ghme = client.me();
                            console.log("CREAMOS EL REPO");
                            ghme.repo({
                              "name": "Primer-repo-generando-con-token",
                              "description": "This is your first repo",
                            }, function (err, body) {//
                              if(err)
                                   console.log(err);
                                   //console.log("MOSTRAMOS BODY: " + body);
                                   console.log("REPO CREADO SATISFACTORIAMENTE");

                          console.log("OBTENIENDO REPOS");
                          client.get('/user', {}, function(err, status, body, headers) {
                              console.log("Usuario: " + body.login);
                              require('simple-git')()
                                  .init()
                                  .addRemote('origin-token', 'git@github.com:' + body.login + '/' + 'Primer-repo-generando-con-token.git')
                               .add('./*')
                               .commit("first commit!")
                               .push('origin-token', 'master');
                          });

                        });
                      });

      }else{
                         console.log("NO EXISTE LO CREAMOS");

                            var file = path.join(process.env.HOME, './.gitbook-start/config.json');//GUARDAMOS PATH

                            // Logeo();
                            //
                            var name = "";//PRUEBAS XQ NO SALE LA FUNCION LOGEO CUANDO ES
                            var pass = "";

                            inquirer.prompt(preguntas).then(function(respuesta){
                              console.log("RESPUSTA"+respuesta);
                              name = respuesta.name_usuario;                      //GUARDAMOS VARIALES DEL SCHMEA
                              pass = respuesta.password_usuario;


                            console.log("NAME: "+name);
                            console.log("PASS: "+pass);

                            github.auth.config({username: name, password: pass}).login({
                             scopes: ['user', 'repo','gist'],
                             note: 'Generando TOKEN NoeJaco17'}, function (err, id, token) {//GENERAMOS TOKEN
                             console.log("MOSTRAMOS ID: "+id);
                             console.log("MOSTRAMOS TOKEN: " + token);
                             console.log("ERROR: "+err);

                                 fs.outputFile(file, token, function (err) {//GENERAMOS FICHERO,con l token
                                   console.log(err);//muestra null
                                 });

                               var client = github.client(token);
                               var ghme = client.me();
                               console.log("CREAMOS EL REPO");
                                     ghme.repo({
                                       "name": "Primer-repo-generando-con-token",
                                       "description": "This is your first repo generated with token",
                                     }, function (err, body,headers) {//
                                       if(err)
                                            console.log(err);
                                            console.log("REPO CREADO SATISFACTORIAMENTE");
                                     });

                                     client.get('/user', {}, function(err, status, body, headers) {
                                         console.log("Usuario: " + body.login);
                                         require('simple-git')()
                                             .init()
                                             .addRemote('origin-token', 'git@github.com:' + body.login + '/' + 'Primer-repo-generando-con-token.git')
                                          .add('./*')
                                          .commit("first commit!")
                                          .push('origin-token', 'master');
                                     });
                         });
                      });


                          //


      }
    }
    else if(argv.deploy == 'dropbox'){
                              console.log("ENTRO EN LA OPCION DROPBOX")
                             estructura(argv.directorio);
                                  console.log("Despues de crear estructura");

                                    //  child.exec('npm install --save-dev gitbook-start-heroku-token-oauth-noejaco17', function(error, stdout, stderr){
                                    //    if(error)
                                    //      console.log(error)
                                     //
                                    //    console.log(stderr);
                                    //    console.log(stdout);
                                    //  });

                                     console.log("TAREA GULP");
                                     //var heroku_token = require((path.join(__dirname,'node_modules/gitbook-start-heroku-token-oauth-noejaco17/gitbook-start-heroku-token-oauth.js')));
                                     var heroku_token = require(path.join(process.cwd(),'node_modules/gitbook-start-heroku-localstrategy-noejaco17/gitbook-start-heroku-drop'));
                                     console.log("REQUIRE"+heroku_token);
                                     //añadir las tareas al gulp
                                     //var heroku_token = require('node_modules/gitbook-start-heroku-token-oauth-noejaco17/gitbook-start-heroku-token-oauth.js');
                                     console.log("VARIABLE HEROKU REQUIRE"+heroku_token);
                                     heroku_token.initialize(argv.directorio);
    }
    else if(argv.deploy == 'github'){
                            console.log("ENTRO EN LA OPCION GITUHB")
                           estructura(argv.directorio);
                                console.log("Despues de crear estructura");

                                  //  child.exec('npm install --save-dev gitbook-start-heroku-token-oauth-noejaco17', function(error, stdout, stderr){
                                  //    if(error)
                                  //      console.log(error)
                                   //
                                  //    console.log(stderr);
                                  //    console.log(stdout);
                                  //  });

                                   console.log("TAREA GULP");
                                   //var heroku_token = require((path.join(__dirname,'node_modules/gitbook-start-heroku-token-oauth-noejaco17/gitbook-start-heroku-token-oauth.js')));
                                   var heroku_token = require(path.join(process.cwd(),'node_modules/gitbook-start-heroku-token-oauth-noejaco17/gitbook-start-heroku-token-oauth'));
                                   console.log("REQUIRE"+heroku_token);
                                   //añadir las tareas al gulp
                                   //var heroku_token = require('node_modules/gitbook-start-heroku-token-oauth-noejaco17/gitbook-start-heroku-token-oauth.js');
                                   console.log("VARIABLE HEROKU REQUIRE"+heroku_token);
                                   heroku_token.initialize(argv.directorio);

                                  // console.log("LLEGOOOOOOOOOOO PACKAGE");


                                  //  var iaasip     = argv.iaasIP || '';
                                  // var iaaspath        = argv.iaaspath || '';

                                   //
                                  //  ejs.renderFile(path.join(__dirname, '../template_npm', 'package.ejs'),{nombre:argv.name, direcciongit:argv.url, direccionwiki:argv.wiki, autor:argv.autor, email:argv.email,nombreheroku:argv.heroku,direccionip:iaasip,direccionpath:iaaspath},function(err, result) {
                                  //     // render on success
                                   //
                                  //             if (!err) {
                                  //                 // result.nombre=argv.name;
                                  //                 // result.direcciongit=argv.url;
                                  //                 // result.direccionwiki='argv.wiki';
                                  //                  console.log(result);
                                  //                      //CREAMOS EL PACKAGE.JSON del template
                                   //
                                  //                          fs.writeFile(path.join(process.cwd(), `${argv.directorio}`, 'package.json'), result);
                                  //                                 if (err) throw err;
                                  //                                 console.log('CREADO PACKAGE.JSON');
                                   //
                                  //             }
                                  //             // render or error
                                  //             else {
                                  //                      console.log('Error renderFile(package.ejs)');
                                  //                      console.log(err);
                                  //             }
                                  //      });

    }
    else if(argv.deploy == 'iaasheroku'){
      console.log("Estamos en IAASHEROKU NPM");
      console.log("ARGV.DIR: "+ argv.directorio);
      estructura(argv.directorio);

      var iaas_heroku = require(path.join(process.cwd(),'node_modules/plugin-ssh-npm-noejaco17/gitbook-start-iaas-npm'));
      iaas_heroku.initialize(argv.directorio);

    }
    else if(argv.deploy == 'mongodb'){
                                  console.log("Estamos en MongoDB");
                                  console.log("ARGV.DIR: "+ argv.directorio);
                                  estructura(argv.directorio);


                                  var mongo = require(path.join(process.cwd(),'node_modules/gitbook-start-mongo-noejaco/gitbook-start-mongo'));
                                  mongo.initialize(argv.directorio);
    }
    else if(argv.deploy == 'iaas'){

                                         estructura(argv.directorio);
                                            console.log("Despues de crear estructura");
                                               child.exec('npm install --save-dev gitbook-start-plugin-iaas-ull-es-noejaco2017', function(error, stdout, stderr){
                                                 if(error)
                                                   console.log(error)

                                                 console.log(stderr);
                                                 console.log(stdout);
                                               })

                                               console.log("TAREA GULP");
                                               //añadir las tareas al gulp
                                               var iaas = require(path.join(__dirname,'../node_modules','gitbook-start-plugin-iaas-ull-es-noejaco2017','linea-comando-iaas'));
                                               iaas.initialize(argv.directorio);

                                               console.log("LLEGOOOOOOOOOOO PACKAGE");

                                               var heroku        = argv.herokupath || '';

                                               var git = require('simple-git')(path.join(process.cwd()));
                                            //console.log("hfhfhfhfhf   " + path.join(process.cwd()));
                                                  preguntas2();
                                                  var author;
                                                  var name;
                                                  var directorio;
                                                  var repo_url;
                                                  var iaasip;
                                                  var iaaspath;
                                                  var appheroku;
                                                 ejs.renderFile(path.join(__dirname, '../template_npm', 'package.ejs'),{nombre:name, direcciongit:url,  autor:author,direccionip:iaasip,direccionpath:iaaspath,nombreheroku:appheroku},function(err, result) {
                                                    // render on success

                                                            if (!err) {
                                                                // result.nombre=argv.name;
                                                                // result.direcciongit=argv.url;
                                                                // result.direccionwiki='argv.wiki';
                                                                 console.log(result);
                                                                     //CREAMOS EL PACKAGE.JSON del template

                                                                         fs.writeFile(path.join(process.cwd(), `${argv.directorio}`, 'package.json'), result);
                                                                                if (err) throw err;
                                                                                console.log('CREADO PACKAGE.JSON');

                                                            }
                                                            // render or error
                                                            else {
                                                                     console.log('Error renderFile(package.ejs)');
                                                                     console.log(err);
                                                            }
                                                     });
      }else if(argv.deploy == 'heroku'){
                                      estructura(argv.directorio);
                                          //  console.log("Despues de crear estructura");
                                          // //  var caca = path.join(__dirname, '/node_modules','gitbook-start-heroku-noejaco-final')+'heroku-command.js';
                                          //
                                          // var test = path.join(path.join(process.cwd(),'node_modules/gitbook-start-heroku-noejaco-final/heroku-command'));


                                          //  console.log("-- path a heroku-command" + test);
                                              //
                                              //   child.exec('npm install --save gitbook-start-heroku-noejaco-final', function(error, stdout, stderr){
                                              //   if(error)
                                              //     console.log(error)
                                              //
                                              //   console.log("\nInstalando plugin heroku...\n");
                                              //   console.log(stderr);
                                              //   console.log(stdout);
                                              // });

                                              console.log("TAREA GULP");
                                              //añadir las tareas al gulp
                                              //var heroku = require('../node_modules/gitbook-start-plugin-heroku-noejaco2017/linea-comando-heroku');
                                              //var heroku = require('./node_modules/gitbook-start-heroku-noejaco-final/heroku-command');
                                              var heroku = require(path.join(process.cwd(),'node_modules/gitbook-start-heroku-noejaco-final/heroku-command'));
                                              console.log("VARIABLE HEROKU REQUIRE"+heroku);
                                              // heroku.initialize(argv.directorio);

                                              console.log("LLEGOOOOOOOOOOO PACKAGE");
                                              ////

                                              inquirer.prompt(datos_usuario).then(function(result){
                                              name=result.nombre_paquete;
                                              repo_url=result.url;
                                              url_wiki = result.url_wiki
                                              author=result.author;

                                              heroku.initialize(argv.directorio);
                                                ejs.renderFile(path.join(__dirname, '../template_npm', 'package.ejs'),{nombre:name, direcciongit:repo_url, dirwiki: url_wiki, autor:author,direccionip:"",direccionpath:"",nombreheroku:""},function(err, salida) {
                                                if (!err) {
                                                      console.log("salida - :"+salida);
                                                      //CREAMOS EL PACKAGE.JSON del template
                                                      // Si todo va bien sobreescribimos el package.json con el generado por el template
                                                      fs.writeFile(path.join(process.cwd(), `${argv.directorio}`, 'package.json'), salida);
                                                             if (err) throw err;
                                                             console.log('CREADO PACKAGE.JSON');

                                                      }
                                                      else {
                                                          console.log('Error renderFile(package.ejs)');
                                                          console.log(err);
                                                           }
                                                  });
                                            });
      }else{
              console.log("NO HA INTRODUCIDO NINGUNA OPCION CONSULTE: gitbook-start --help");
            }
}
