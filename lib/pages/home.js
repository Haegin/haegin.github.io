google.load("feeds", "1")

$(document).ready(function(){

    $.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?id=Haegin&count=3&callback=?", function(data){
        for(i in data){
            $("#twitter").append("<p>" + data[i].text + "<br><span><a href='http://twitter.com/Haegin/status/" + data[i].id + "'>" +  $.timeago(new Date(data[i].created_at)) + "</a></span></p>");
        }
        twttr.anywhere(function(t){
            t("#twitter").linkifyUsers();
        });
    });

    var blog = new google.feeds.Feed("http://haeg.in/atom.xml")
    blog.load(function(result){
        if(!result.error){
            var data = result.feed.entries;
            for(i in data){
                $("#blog").append("<p><a href='" + data[i].link + "'>" + data[i].title + "</a><br><span>" + $.timeago(new Date(data[i].publishedDate.split(" -")[0])) + "</span></p>");
            }
        }
    });

    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=hjmills&period=7day&api_key=223a2fcb36c66a854d828fb031ba3141 &format=json&callback=?", function(data){
        var list = data.topalbums.album
        var mylist = [];
        var linkobject = {};
//        for(var i = 0; i < 16; i += 1){
//            $("#lastfm ul").append("<li><p><a href='" + list[i].url + "'>" + list[i].name + "</a><br /><span>from " + list[i].album["#text"] + " by " + list[i].artist["#text"] + "</span><img src='" + list[i].image[1]["#text"] + "' alt='" + list[i].album["#text"] + "' /></p></li>");
//        }
        for(var i = 0; i < 16; i += 1){
            $("#lastfm ul").append("<li><a href='" + list[i].url + "'><img src='" + list[i].image[2]["#text"] + "' alt='" + list[i].name + " by " + list[i].artist["name"] + "' /></a></li>");
        }
    });

    $.getJSON("http://github.com/api/v2/json/repos/show/haegin?callback=?", function(data){
        for(var i = 0; i < data.repositories.length; i += 1){
            $("#github").append("<p><a href='" + data.repositories[i].url + "'>" + data.repositories[i].name + "</a><br><span>" + data.repositories[i].description + "</span></p>");
        }
    });

    var goodread = new google.feeds.Feed("http://www.goodreads.com/review/list_rss/4733960?key=5a78023a8a8b581e10e2702f3a2730ca948c0989&shelf=%23ALL%23")
    goodread.setResultFormat(google.feeds.Feed.XML_FORMAT);
    goodread.setNumEntries(16);
    goodread.load(function(result){
        if(!result.error){
            var items = result.xmlDocument.getElementsByTagName('item');
//            for(i in items){
//                var title = items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
//                var read  = items[i].getElementsByTagName('user_read_at')[0].firstChild.nodeValue;
//                var author = items[i].getElementsByTagName('author_name')[0].firstChild.nodeValue;
//                var link  = items[i].getElementsByTagName('link')[0].firstChild.nodeValue;
//                var image = items[i].getElementsByTagName('book_image_url')[0].firstChild.nodeValue;
//                $("#goodreads").append("<p><a href='" + link + "'>" + title + "</a><br><span>by " + author + "</span><img src='" + image + "' alt='" + title + " by " + author + "' /></p>");
//            }
            for(i in items){
                var title = items[i].getElementsByTagName('title')[0].firstChild.nodeValue;
                var author = items[i].getElementsByTagName('author_name')[0].firstChild.nodeValue;
                var link  = items[i].getElementsByTagName('link')[0].firstChild.nodeValue;
                var image = items[i].getElementsByTagName('book_large_image_url')[0].firstChild.nodeValue;
                $("#goodreads ul").append("<li><a href='" + link + "'><img src='" + image + "' alt='" + title + " by " + author + "' /></a></li>");
            }
        }
    });

});
