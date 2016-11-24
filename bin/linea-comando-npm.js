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
// var ghme = client.me();



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

//---------------------------------------------------------------------------------

//(CUANDO GENERAMOS EL TOKEN DEBEMOS COMPROBAR CON LAS LLAMADAS A FS si exite el fichero en su home.gitbook-start/config.json con sysREAD()  process.env.home)
//comprobamos si hay un config.json en home



//---------------------------------------------------------NECESARIO PARA ESTA

//fs.existsSync(path.join(process.env.HOME, './.gitbook-start/config.json')) ? console.log("EXISTE") : console.log("NO existe");
//console.log("Valor de AUX"+aux);
// fs.writeFile(path.join(process.env.HOME,'./.gitbook-start/config.json'), 'Hello Node.js','utf-8' ,(err) => {
//   if (err) throw err;
//   console.log('It\'s saved config.json');
// });

// //añadimos la tarea en contenido debemos añadir lo que devuleva el token
// fs.writeFileSync(path.join(process.env.HOME,'./.gitbook-start/config.json'), /*contenido,*/  {'flag':'a'},  function(err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("Añadiendo tarea gulp de node modules")
// });



//Authenticate to github in cli mode (desktop application) //GENERA el TOKEN vampos y creo que sin el gist
// github.auth.config({
//   username: 'pksunkara',
//   password: 'password'
// }).login(['user', 'repo', 'gist'], function (err, id, token) {
//   console.log(id, token);
// });

//Create a repository (POST /user/repos) // CREAR REPO
// ghme.repo({
//   "name": "Hello-World",
//   "description": "This is your first repo",
// }, callback); //repo


//Get emails of the user (GET /user/emails) //OBTENER EMAIL USER
//ghme.emails(callback); //array of emails

//Get information about the user (GET /user)//OBTENER INFORMACION USER
//ghme.info(callback); //json




//--------------------------------ANTIGUO-------------------------------------------------

// var client = github.client('jhghjhgh');//generado token
// var ghme = client.me();
// //var ghuser = client.user('pipopipo');
//
//
//
//
// client.get('/user', {}, function (err, status, body, headers) {
//   // console.log("ACCEDEMOS A USER HEADERS")
//   // console.log(headers);
//   console.log("ACCEDEMOS A USER BODY")
//   console.log(body); //json object
//
//
//   fs.writeJson('../.gitbook-start/config.json', {body}, function (err) {
//     console.log(err)
//   });
//
//
// });
//
// client.get('/user/emails', {}, function (err, status, body, headers) {
//   // console.log("ACCEDEMOS A USER/EMAILS HEADERS")
//   // console.log(headers);
//   console.log("ACCEDEMOS A USER/EMAILS BODY")
//   console.log(body); //devolvemos el emaail
//   //ghme.emails(callback);
// });

//inquirer (SCHEMA CONSOLA)

//EJemplo crear token


// return new Promise((resolve,reject)=>{
//   prompt.start();
//   prompt.get(schema,(err,result)=>{
//     if(err)
//     throw err;
//
//     github.auth.config({username:resultname, password: result.password,
//     scopes:['user','repo'],
//     note: ruslt.descripcion
//   },(err,id,token)=>{
//     if(err)throw err;
//     console.log(err);
//     console.log(id);
//     console.log(token);
//     resolve (token);
//   })
// });
// });


//########################################################################################################################################3


// Web application which authenticates to github
// var http = require('http')
//   , url = require('url')
//   , qs = require('querystring')
//   , github = require('octonode');
//
// // Build the authorization config and url
// var auth_url = github.auth.config({
//   id: 'mygithubclientid',
//   secret: 'mygithubclientsecret',
//   apiUrl: 'https://optional-internal-github-enterprise/api/v3',
//   webUrl: 'https://optional-internal-github-enterprise'
// }).login(['user', 'repo', 'gist']);
//
// // Store info to verify against CSRF
// var state = auth_url.match(/&state=([0-9a-z]{32})/i);
//
// // Web server
// http.createServer(function (req, res) {
//   uri = url.parse(req.url);
//   // Redirect to github login
//   if (uri.pathname=='/login') {
//     res.writeHead(302, {'Content-Type': 'text/plain', 'Location': auth_url})
//     res.end('Redirecting to ' + auth_url);
//   }
//   // Callback url from github login
//   else if (uri.pathname=='/auth') {
//     var values = qs.parse(uri.query);
//     // Check against CSRF attacks
//     if (!state || state[1] != values.state) {
//       res.writeHead(403, {'Content-Type': 'text/plain'});
//       res.end('');
//     } else {
//       github.auth.login(values.code, function (err, token) {
//         res.writeHead(200, {'Content-Type': 'text/plain'});
//         res.end(token);
//       });
//     }
//   } else {
//     res.writeHead(200, {'Content-Type': 'text/plain'})
//     res.end('');
//   }
// }).listen(3000);
//
// console.log('Server started on 3000');






//--------------------------------------------------


//MINIMIST
 var argv = require('minimist')(process.argv.slice(2));
 console.dir(argv);


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
          fs.copyFile(path.join(__dirname,'..','gulpfile.js'), "./" + directorio + "/gulpfile.js",function(err){
            if(err)
              console.log(err);
          });


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
          ejs.renderFile(path.join(__dirname,'..', 'template_npm', 'package.ejs'), { autor: author , nombre: name, direcciongit: repo_url,nombreheroku:argv.heroku ,direccionip:argv.iaasIP,direccionpath:argv.iaaspath},
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


var author      = argv.autor || '';
var name        = argv.name || '';
var directorio  = argv.d;
var repo_url    = argv.url || '';

if(argv.h || argv.help){

    //MENU
    console.log("gitbook-start [OPTIONS]\n"+
    "--autor: autor del libro a crear node gitbook-star -a AutorDelLibro\n"+
    "--email: email de contacto del usuario\n"+
    "--version: version repositorio github contra el que se va a trabajar -r github.com/repo.git\n"+
    "--url: repositorio github contra el que se va a trabajar -r github.com/repo.git\n"+
    "--wiki: direccion web de la wiki en github -w github.com/repo.wiki.git\n"+
    "--directorio: nombre del directorio a crear\n"+
    "--repo: Crear repositorio en GITHUB\n"+
    "--help: muestra ayuda sobre las opciones disponibles\n"+
    "--deploy: Deploy en IaaS(iaas.ull.es)"+
    "--iaasIP: Direccion de la maquina virtual\n"+
    "--iaaspath: Repositorio que va a contener el libro en iaas\n"+
    "--github: Repositorio a desplegar el libro en git\n"+
    "--heroku: Nombre de su api en heroku\n");


}else{
    if(argv.repo){

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

    else if(argv.github ){
      console.log("ENTRO EN LA OPCION GITUHB")
     estructura(argv.directorio);
          console.log("Despues de crear estructura");

             child.exec('npm install --save-dev gitbook-start-heroku-token-oauth-noejaco17', function(error, stdout, stderr){
               if(error)
                 console.log(error)

               console.log(stderr);
               console.log(stdout);
             });

             console.log("TAREA GULP");
             var heroku_token = require((path.join(__dirname,'node_modules/gitbook-start-heroku-token-oauth-noejaco17/gitbook-start-heroku-token-oauth.js')));
             console.log("REQUIRE"+heroku_token);
             //añadir las tareas al gulp
             //var heroku_token = require('node_modules/gitbook-start-heroku-token-oauth-noejaco17/gitbook-start-heroku-token-oauth.js');
             console.log("VARIABLE HEROKU REQUIRE"+heroku);
             heroku_token.initialize(argv.directorio);

             console.log("LLEGOOOOOOOOOOO PACKAGE");


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
    else if(argv.deploy && argv.directorio ){
                         if( argv.iaasIP && argv.iaaspath){//Cuando pasamos el directorio

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

                                       ejs.renderFile(path.join(__dirname, '../template_npm', 'package.ejs'),{nombre:argv.name, direcciongit:argv.url, direccionwiki:argv.wiki, autor:argv.autor, email:argv.email,direccionip:argv.iaasIP,direccionpath:argv.iaaspath,nombreheroku:heroku},function(err, result) {
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

                          }else{
                                    if(argv.heroku ){

                                     estructura(argv.directorio);
                                          console.log("Despues de crear estructura");

                                             child.exec('npm install --save-dev gitbook-start-plugin-heroku-noejaco2017', function(error, stdout, stderr){
                                               if(error)
                                                 console.log(error)

                                               console.log(stderr);
                                               console.log(stdout);
                                             });

                                             console.log("TAREA GULP");
                                             //añadir las tareas al gulp
                                             var heroku = require('../node_modules/gitbook-start-plugin-heroku-noejaco2017/linea-comando-heroku');
                                             console.log("VARIABLE HEROKU REQUIRE"+heroku);
                                             heroku.initialize(argv.directorio);

                                             console.log("LLEGOOOOOOOOOOO PACKAGE");


                                             var iaasip     = argv.iaasIP || '';
                                            var iaaspath        = argv.iaaspath || '';


                                             ejs.renderFile(path.join(__dirname, '../template_npm', 'package.ejs'),{nombre:argv.name, direcciongit:argv.url, direccionwiki:argv.wiki, autor:argv.autor, email:argv.email,nombreheroku:argv.heroku,direccionip:iaasip,direccionpath:iaaspath},function(err, result) {
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


                                      }else{
                                            if(!argv.iaasIP || !argv.iaaspath || !argv.deploy ){
                                                         console.log("Falta el argumento IP, path o directorio, consulte el help");
                                            }else if(!argv.heroku){
                                              console.log("Falta el argumento de heroku, consulte el help");
                                            }
                                      }
                          }
      }else{
                  //console.log("Consulte el help FINAL");
      }
}
