/**
 * Created by User on 14-4-14.
 */
$(document).ready(function () {
    function toggleImage(state){
        switch (state) {
            case "hide":
                $("img").each(function(){
                    var originSrc=$(this).attr("src");
                        $(this).bind('load', function () {
                            $(self).hide().attr("src", originSrc + "null");
                            self.loaded=true;
                        })
//                    }
                })

                $("img").css({"display": "none"});
                break;
            case "show":
                $("img").css({"display": "block"});
                $("img").each(function(){
                    var changeSrc=$(this).attr("src");
                    if(changeSrc.lastIndexOf("null")!=-1) {
                        var originSrc = changeSrc.substring(0,changeSrc.lastIndexOf("null"));
                    }
                    $(this).attr("src",originSrc);
                })

                break;
        }
    }
    chrome.runtime.onMessage.addListener(
        function (request, sender,sendResponse) {
            var name = request.name;
            if (name == "toggleImages") {
                var state = request.state;
                chrome.runtime.sendMessage({name: "setState", state: state});
                toggleImage(state);
                sendResponse({state:state});
            }
        });
    chrome.runtime.sendMessage({name:"getState"},function(response){
        toggleImage(response.state);
    })
});