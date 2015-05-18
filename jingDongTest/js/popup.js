function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };


  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
    console.assert(typeof url == 'string', 'tab.url should be a string');
    callback(url);
  });
}


function getImageUrl(searchTerm, callback, errorCallback) {
  var searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' +
    '?v=1.0&q=' + encodeURIComponent(searchTerm) + '&rsz=8&start=10';
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'json';
  x.onload = function() {
    var response = x.response;
    if (!response || !response.responseData || !response.responseData.results ||
      response.responseData.results.length === 0) {
      errorCallback('No response from Google Image search!');
      return;
    }
    var firstResult = response.responseData.results[0];
    var imageUrl = firstResult.tbUrl;
    var width = parseInt(firstResult.tbWidth);
    var height = parseInt(firstResult.tbHeight);
    console.assert(
      typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
      'Unexpected respose from the Google Image Search API!');
    callback(imageUrl, width, height);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();

} 
 
function isLogin() {
    //   var c = function(a) {
    //     a = $.extend({el: $("#loginbar"),callback: null}, a || {});
    //     var b = function() {
    //         return "https:" == document.location.protocol ? "https://" : "http://"
    //     };
    //     $.ajax({url: b() + "passport.jd.com/new/helloService.ashx",
    //       dataType: "jsonp",
    //       scriptCharset: "GBK",
    //       success: function(b) {
    //             b && b.info && (a.el.html(b.info), a.callback && a.callback(b)), b && b.sso && $.each(b.sso, function() {
    //                 $.getJSON(this)
    //             })
    //         }})
    // };
    // return c
    return true ;
}
document.addEventListener('DOMContentLoaded', function(){ 
alert($("#name").getvalue());
$("#productName").setvalue($("#name").getvalue());
$("#productName").setvalue("sdfds");

}
);