$( document ).ready(function() {
  console.log("load");
  var clipboard = new Clipboard('.clipboard');
  clipboard.on('success', function(e) {
      $("#copyButton").html("Copied!");
      setTimeout(changeBackText,3000);
  });
  clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
  });

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    $('#url').val(url);
  });
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


function changeBackText(){
  $("#copyButton").html("Copy");
};