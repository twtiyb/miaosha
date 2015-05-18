$(document).ready(function () {
    $("input:radio[name='options']").change(function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {name: "toggleImages", state: $("input:radio[name=options]:checked").val()},
                function (response) {
                    console.log(response.state);
                });
        });
    })
    chrome.extension.sendRequest({name: "initToggle"}, function (response) {
        var state = response.state;
        if (state == "hide" || state == "show") {
            $("input:radio#" + state).parent('label').addClass('active');
        }
        console.log(response.state);
    })
});
