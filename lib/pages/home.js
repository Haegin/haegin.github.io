google.load("feeds", "1")
            
$(document).ready(function(){
 
    $.getJSON("http://api.twitter.com/1/statuses/user_timeline.json?id=Haegin&count=3&callback=?", function(data){
        for(i in data){
            $("#twitter").append("<p>" + data[i].text + "<br><span><a href='http://twitter.com/Haegin/status/" + data[i].id + "'>" +  $.timeago(new Date(data[i].created_at)) + "</a></span></p>");
        }
//        twttr.anywhere(function(t){
//            t("#twitter").linkifyUsers();
//        });
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
    
    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=HJMills&api_key=223a2fcb36c66a854d828fb031ba3141 &format=json&callback=?", function(data){
        var list = data.weeklyalbumchart.album;
        var myList = [];
        var linkObject = {};
        for(var i = 0; i < 10; i += 1){
            $("#lastfm ul").append("<li><a href='" + list[i].url + "'>" + list[i].name + "</a> by " + list[i].artist["#text"] + "</li>");
        }
    });
    
    $.getJSON("http://github.com/api/v2/json/repos/show/Haegin?callback=?", function(data){
        for(var i = 0; i < data.repositories.length; i += 1){
            $("#github").append("<p><a href='" + data.repositories[i].url + "'>" + data.repositories[i].name + "</a><br><span>" + data.repositories[i].description + "</span></p>");   
        }     
    });

});
