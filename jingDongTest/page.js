 alert("start");
 a = $.extend({el: $("#loginbar"),callback: null}, a || {});
        var b = function() {
            return "https:" == document.location.protocol ? "https://" : "http://"
        };
        $.ajax({url: b() + "passport.jd.com/new/helloService.ashx",dataType: "jsonp",scriptCharset: "GBK",success: function(b) {
                b && b.info && (a.el.html(b.info), a.callback && a.callback(b)), b && b.sso && $.each(b.sso, function() {
                    $.getJSON(this)
                })
            }})