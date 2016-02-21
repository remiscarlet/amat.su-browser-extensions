// content.js

var clickedElement = null;
document.addEventListener("mousedown", function(event){
    //right click
    if(event.button == 2) { 
        clickedElement = event.target;
    }
}, true);


function createNotification(){
  linkDestUrl = clickedElement.href;
  linkInnerHtml = clickedElement.innerHTML;
  clickedElement.id = "manipulatedLink";
  manipulatedLink = $('#manipulatedLink')
  $notification = $('<div/>').css({
    "position":"absolute",
    "top":manipulatedLink.offset().top,
    "left":manipulatedLink.offset().left,
    "border": "1px black solid",
    "border-radius":"10px",
    "background":"#EEEEEE",
    "opacity": 0,
    "font-family": "Georgia",
    "padding": "5px",
    "color":"#FF0008",
    "text-align":"center",
    "font-size":"18px",
    "transition": "opacity .5s ease-in-out",
    "-moz-transition": "opacity .5s ease-in-out",
    "-webkit-transition": "opacity .5s ease-in-out",
    "z-index": 10000
   });
  $notification.html("Copied!");
  //$notification.innerHTML("Copied!")
  //console.log($('#manipulatedLink').offset())
  $notification.attr('id',"amatsuPopup");
  $notification.appendTo(document.body)

  //$('#manipulatedLink').after($notification);
  function fadeTextOut(){
    $notification.css({opacity:1});
    setTimeout(function(){
      $notification.css({opacity:0});
      setTimeout(function(){$notification.remove();},500);
    },750);
  }
  setTimeout(fadeTextOut,500);
}


chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == 'createNotification'){
    console.log(request);
    createNotification();
    sendResponse({"data":"Success!"});
  } else {
    sendResponse({"data":"Failed!"});
  }
});

