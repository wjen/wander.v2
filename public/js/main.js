
$(document).ready(function(){
  $('#edit_btn').on('click', function(){
    $(this).css('color', 'white');
  });
  $('#skip').on('click', function(){
    $(this).css('color', 'white');
  });

  function deleteUser(handle) {
    $.ajax({
      url: `/users/${handle}`,
      method: 'DELETE'
    }).then(function(data) {
      console.log(data);
      location = ('/');
    },function(err) {
      console.log(err);
    });
  }

  $('.delete-button').on('click', function() {
    var handle = $(this).attr('id');
    if (confirm('Are you sure you want to delete your account?')) {
      deleteUser(handle);
    }
  });

});


