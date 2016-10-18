$(document).ready(function(){
  var $userForm = $('.new-user');
  $userForm.on('submit', function(e){
    e.preventDefault();

    //alternatively can use serializeArray
    var formdata = $(this).serializeArray();


    // var user_name = $('#username').val()
    // var user_password = $('#user-password').val()
    // var user_email = $('#user-email').val()

    $.ajax({
      type: 'POST',
      url:'/api/users',
      data: formdata
    }).done(doSomething)

    function doSomething(){
      alert("do something")
    }
  })
})
