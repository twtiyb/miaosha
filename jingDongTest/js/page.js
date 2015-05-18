 

$(document).ready(function() {
  var isLogin = false;
  var startTime = "";
  var leftTime = "";
  var productName = "";
  var product;
  var pictureUrl = "";
  var skuName = "";
  var sku;


  var url;
  url = "https:" == document.location.protocol ? "https://" : "http://";

  url += "passport.jd.com/new/helloService.ashx";
  url += "?callback=jQuery" + Math.floor(1e7 * Math.random());
  url += "&" + "_=" + (new Date().getTime());

 
  $.ajax({
      type: "get",
      url: url,
      data: {}
    }) 
    .always(function(msg) {
     isLogin =  (msg.response.indexOf('logout')<0);
    });

   var a = $.ajax(url);
  if(isLogin){ 
      productName = $("#name").children()[0];

  } else {
    alert("当前未登陆,请登陆.");
    //window.location.href = "www.baidu.com";
  }


})