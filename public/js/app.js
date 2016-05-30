//variables
var $appDesktop = $('.container');
var $usernameInput = $('#login');
var $areaMessages = $('#messages');
var $loginPage= $('.login');
var $inputMessages = $('#m')

$appDesktop.hide();
//efeitos de tela
$('.btn-sidebar').click(function(){
  $('.inbox').css('width', '0%');
  $('.conversas').css('width', '0%');
  $('.chat').css('margin-left', '7%');
  $('.chat').css('width', '93%');

});



// Configuração para o nome do usuario
var username;
var isOn = false;
var typing = false;




//Definindo seu nome de usuario
$('#l').submit(function() {
  setUsername();
  return false;
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



  var socket = io();

    $('#chat').submit(function(){
      socket.emit('new message', $('#m').val());
      $('#m').val('');
      return false;
  });


function sendMessage(){


}
  function cleanInput(input){
    return $('<div/>').text(input).text()
  }

  function setUsername(){
     username  = cleanInput($usernameInput.val());

     if(username){
       $loginPage.hide();
       $appDesktop.show();
       isOn = true
       //Enviar o nome do usuario para o servidor
       socket.emit('add user', username);
     }
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
    $('#name-friend') = data.username;
});
