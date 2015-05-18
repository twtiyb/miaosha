/**
 * Created by User on 14-3-30.
 */
function Song(id, name, artist) {
    this.id = id;
    this.name = name;
    this.artist = artist;
    this.lyricUrl;
    this.lyric = this.addLyric();
}
Song.prototype.getLyric = function () {
    var url = this.lyricUrl;
    var song = this;
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            //将时间信息去掉，g全局符号，把所有匹配字符串替换
            data = data.replace(/\[.*\]/g, '').trim();
            data = data.replace(/\n/g, '\n<br>');
            song.printLyric(data);
        }
    })
}
Song.prototype.getLyricUrl = function () {
    var withAritist = false;
    if (this.name == undefined || this.name == null || this.name == '') return '';
    var url = 'http://geci.me/api/lyric/' + this.name;
    if (!(this.artist == undefined || this.artist == null || this.artist == '')) {
        url += '/' + this.artist;
        withAritist = true;
    }
    this.ajaxLyricUrl(url, withAritist);
}
Song.prototype.ajaxLyricUrl = function (url, withAritist) {
    var song = this;
    $.ajax({
        url: url,
        method: 'GET',
        success: function (data) {
            console.log(data);
            var count = data.count;
            console.log(count);
            if (count > 0) {
                song.lyricUrl = data.result[0].lrc;
                song.getLyric();
            } else {
                if (withAritist) {
                    url = url.substring(0, url.lastIndexOf("/"));
                    song.ajaxLyricUrl(url, false);
                } else
                    song.printLyric('找不到歌词');
            }
        },
        error: function () {
            return undefined;
        }
    })
}
Song.prototype.printLyric = function (text) {
    this.lyric.html(text);
}
Song.prototype.setId = function (id) {
    this.id = id;
}
Song.prototype.setName = function (name) {
    this.name = name;
}
Song.prototype.setArtist = function (artist) {
    this.artist = artist;
}
Song.prototype.addLyric = function () {
    var lyrics_div=document.createElement('div');//用document.createElement()方法可以创造新的节点
    document.body.appendChild(lyrics_div);//用document.body.appendChild()方法把新的节点附加到到document中
    lyrics_div.style.width = '900px';//下面几行是设置css
    lyrics_div.style.backgroundColor = '#F00';
    lyrics_div.style.zIndex = '42';
    lyrics_div.style.position = 'relative';
    lyrics_div.style.margin = '200px auto 0';
    lyrics_div.id = 'lyricParent';
    lyrics_div = $('<div id="myLyric" style="width: 490px;height: 280px;background-color: #9dd6c5;position: absolute;right: 0;overflow: auto;display: block;font-size: 14px;padding: 10px;"></div>')
    $('div#lyricParent').append(lyrics_div);
    return lyrics_div;
}

var lastSongId = '', song;
$(document).ready(function () {
    eval('var data=' + localStorage['bubbler_song_info']);
    song = new Song(data.id, data.song_name, data.artist);
    $("div#fm-channel-list").scroll(function () {
        var offsetTop = $(this).scrollTop();
        $("div#myLyric").scrollTop(offsetTop);
    });
})
window.setInterval(function () {
    eval('var data=' + localStorage['bubbler_song_info']);
    if (lastSongId != data.id) {
        lastSongId = data.id;
        song.setId(data.id);
        song.setArtist(data.artist);
        song.setName(data.song_name);
        song.getLyricUrl();

    }
}, 2000);
