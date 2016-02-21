
// background.js


function generateShortenedLinkAndCopy(info, tab) {
  console.log("Info");
  console.log(info);
  $.ajax({
          url: "http://amat.su/api/",
          //url: "http://localhost:8000/api/",
          type: "POST",
          crossDomain: true,
          dataType: "json",
          data: {
            isFromExtension : "true",
            customURL: "",
            url : info.linkUrl,
          },
          success: function(resp){
            alert("Oops, something broke!");
          },
          error: function(resp){
            // var addKaze = $('#addKaze').is(":checked");
            // var data = resp.responseText
            // if (addKaze){
            //   var split = data.split("/")
            //   data = "http://amat.su/kaze/"+split[3];
            // }
            var input = document.createElement('textarea');
            document.body.appendChild(input);
            input.value = resp.responseText;
            input.focus();
            input.select();
            document.execCommand('Copy');
            input.remove();
            chrome.tabs.getSelected(null, function(tab) {
              chrome.tabs.sendRequest(tab.id, {method: 'createNotification',
                                               url: resp.responseText,
                                              }, function(response) {
              });
            });
            //createNotification();
          }
        });
}
var title = "Shorten this URL!";
var id = chrome.contextMenus.create({"title": title, "contexts":["link"],
                                     "onclick": generateShortenedLinkAndCopy});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
})

