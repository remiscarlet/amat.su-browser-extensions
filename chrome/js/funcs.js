$( document ).ready(function() {
  console.log("load");
  $('#submitButton').on("click",function(){
    $.ajax({
            url: "http://amat.su/api/",
            type: "POST",
            crossDomain: true,
            dataType: "json",
            data: {
              isFromExtension : "true",
              customURL: $("#customURL").val(),
              url : $('#url').val()
            },
            success: function(resp){
              $('#output').val(resp.responseText);
            },
            error: function(resp){
              var addKaze = $('#addKaze').is(":checked");
              var data = resp.responseText
              if (addKaze){
                var split = data.split("/")
                data = "http://amat.su/kaze/"+split[3];
              }
              $('#output').val(data);

              //$('#output').val("Oops");
            }
          });
  });
});