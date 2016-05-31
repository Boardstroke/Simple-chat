//variables
var $appDesktop = $('.container');
var $usernameInput = $('#login');
var $areaMessages = $('#messages');
var $loginPage= $('.login');
var $inputMessages = $('#m')


$appDesktop.hide();
$('#open').hide()
//efeitos de tela

$('#close').click(function(){
  $('.inbox').css('width', '0%'); $('.conversas').css('width', '0%');
  $('.chat').css('margin-left', '7%'); $('.chat').css('width', '93%');
  $('#close').hide(); $('#open').show();
});
$('#open').click(function(){
  $('.inbox').css('width', '20%');
  $('.conversas').css('width', '25%');
  $('.chat').css('margin-left', '52%'); $('.chat').css('width', '48%')
  $('#close').show(); $('#open').hide();
});



// Configuração para o nome do usuario
var username;
var isOn = false;
var typing = false;



  var socket = io();

  //Definindo seu nome de usuario
  $('#l').submit(function() {
    setUsername();
    return false;
  });

    $('#chat').submit(function(){
      socket.emit('new message', $('#m').val());
      $('#m').val('');
      return false;
  });


  function cleanInput(input){
    return $('<div/>').text(input).text()
  }

  function setUsername(){
     username  = cleanInput($usernameInput.val().trim());

     if(username){
       $loginPage.hide();
       $appDesktop.show();
       isOn = true
       //Enviar o nome do usuario para o servidor
       socket.emit('add user', username);
     }
  };

  function addUser(data){

    var list = '<li class="clearfix">' + '  <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt=" avatar" />' + '<div class="float-right friend-list"> <h5>' + data + '</h5>   <h6>Online</h6> </div> </li>'

    $('#migos').append(list);
  };


  function addMessage(data){
    var dia = getTime();

    if(username === data.username){
      var response = '<li class="clearfix">' +
      '<div class="message-data align-right"> ' +
      '<span class="message-data-time" > ' + dia + '</span>' +
      '&nbsp; &nbsp; <span class="name">' + data.username + '</span> ' +
      '</div> <div class="message ' + 'other-message ' + 'float-right"> '+ data.message + '</div>' +
      '</li>';
    }else {
      var response = '<li>' +
      '<div class="message-data"> ' +
      '<span class="message-data-time" > ' + dia + '</span>' +
      ' <span class="message-data-name">' + data.username + '</span> </div>  ' +
      '<div class="message my-message"> '+ data.message + '</div>' +
      '</li>';
    }
      $('#messages').append(response);
  }

  socket.on('new message', function(data){
    addMessage(data);
    });

    socket.on('user on', function(username){
      addUser(username);
    });






//Dar a hora exata
  var getTime = function(){
    var today = new Date();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();
    var miday;
    if(hour > 12){
      miday = 'P.M'
    }else {
      miday = 'A.M'
    }
    var data = miday +' ' + hour + ':' + minute + ':' + second;
    return data;
  }
