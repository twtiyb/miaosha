/**
 * Created by User on 14-3-30.
 */
chrome.runtime.onInstalled.addListener(function () {
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                var name = request.name;
                if (name == "setState") {
                    var state = request.state;
                    if (state == "hide" || state == "show") {
                        localStorage.state = state;
                    }
                } else if (name == "getState") {
                    sendResponse({state: localStorage.state});
                }
            });
//        chrome.browserAction.onClicked.addListener(function () {
//
//        });
        chrome.extension.onRequest.addListener(
            function(requset,sender,sendResponse){
                var name=requset.name;
                if(name=="initToggle"){
                    sendResponse({state:localStorage.state});
                }
            }
        )
    }
)
