// Objetivo: Criar um app de chat, quando acessar carregar uma pagina de login que pede o nome do usuario e usa essa indetificação para conversar na aplicação.

//Solução:
// 1. Fazer a requisao de todos os modulos
  var express = require('express'); // npm install --save express
  var app = express();
    var server = app.listen(3000);
  var io = require('socket.io').listen(server);  //npm install --save socket.io

//  Enviar pagina
  app.get('/', function(req, res){
    res.sendFile(__dirname +'/index.html');
    app.use(express.static( __dirname + '/public'));
  });



//Quando a existir conexão
io.on('connection', function(socket){
  // Guardar o nome do usuario
  socket.on('add user', function(username){
    socket.username = username;
    console.log(socket.username + ' Está online');
  });

  //  Receber a messagem do usuario e mostrar na tela
  socket.on('new message', function(data){

    // Enviar para o cliente a msg e o nome
    io.emit('new message', {
        username: socket.username,
        message: data
    });
  });

  // Se o usuario desconectar avisar
  socket.on('disconnect', function(data){
    //Enviar o nome de quem desconectou
    console.log(socket.username + ' está offline');

  });

});
