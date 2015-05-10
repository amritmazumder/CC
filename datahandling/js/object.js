var t = [];
var originalVal;

$(document).ready(function(){      
        $('.trig-button').click(function(){
           var inputVal = $('.formo').val();
          
            getData(inputVal);
        });
});



function getData(inputVal) {
        //console.log(inputVal);
        if (inputVal != undefined) {
            $.ajax({
                url: '../searcher.php?var1='+inputVal+'',
                type: 'GET',
                success: function(response) {
        
                    if (typeof response.errors === 'undefined' || response.errors.length < 1) { 
                            
                            //parse the received data into a JSON Object
                            tweetObj = jQuery.parseJSON(response);

                            //Run function and pass received data into the program
                            processTweet(tweetObj, inputVal);
                            
                    } else {     
                            console.log('screwed');
                    }
                },
                error: function(errors) {
                    console.log('screwed');
                }
            });
        } else {
            console.log('was undefined');
        }
     
}



function processTweet(tweet, inputVal){

	for(i = 0; i < tweet.statuses.length; i++){
		t[i] = new Tweet(tweet.statuses[i]);
	}
    parseTweet(inputVal);
	organizeChrono();
}





function Tweet(tweet){
	this.text = tweet.text;
	this.coordinates = tweet.coordinates;
	this.createdAt = Date.parse(tweet.created_at);
	this.entities = tweet.entities;

    var hashtagCount = tweet.entities.hashtags.length;
    this.hashtags = [];
    for (j = 0; j < hashtagCount; j++) {
        this.hashtags.push(tweet.entities.hashtags[j].text);
    }
}

var firstTweetTime, lastTweetTime;

function organizeChrono(){
    
   t.sort(function(a,b) { return parseFloat(a.createdAt) - parseFloat(b.createdAt) } );
    var lastTweet = t.length - 1;

    firstTweetTime = t[0].createdAt;
    lastTweetTime = t[lastTweet].createdAt;

    createRamp(firstTweetTime, lastTweetTime);

   for (i = 0; i < t.length; i++) {
        var parsedBack = new Date(t[i].createdAt);
        t[i].createdAt = parsedBack;
        t[i].tempDisplay();
   }
   var report = new Date(firstTweetTime) + ">>>>>>>>>>>" + new Date(lastTweetTime)
   $('.container').append("<div class='report'>" + report + "</div>");
}
var commonWords = ['the', 'a', 'this', 'then', 'in', 'rt', 'for', 'they', 'to', 'was', 'is', 'i', 'of', 'an', 'and', 'my', 'his', 'her', 'our', 'at', 'with', 'go', 'it', 'you', 'are', 'by', 'on', 'from', 'not', 'me'];

function parseTweet(inputVal) {
   
    commonWords.push(inputVal);

    var tokens = [];

    for (var i = 0; i < t.length; i++) {
  
        var text = t[i].text;
        var splitText = text.split(/\b\s+/);

        for (var j = 0; j < splitText.length; j++) {
            var token = splitText[j].toLowerCase();
            var checkVal = jQuery.inArray(token, commonWords);
            
            if (checkVal != -1) {

            } else {
                tokens.push(token);
            }
        }
    } 

    getDominantToken(tokens);

}

function getDominantToken(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    commonWords.push(maxEl);
    console.log(maxEl);
    getData(maxEl);
    return maxEl;
}














function createRamp(first, last) {
    var width = $(window).width();
    var height = $(window).height();
    for (i = 0; i < t.length; i++) {
        var val = t[i].createdAt; 
        var calcVal = map_range(val, first, last, 0, width);
       
    }
}


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}




Tweet.prototype.tempDisplay = function(){
    var tweetTime = "<span class='tweet-time'>" + this.createdAt + "</span>"
    var tweetText = "<span class='tweet-text'>" + this.text + "</span>"; 
    var tweetTags = "<span class='tweet-tags'>" + this.hashtags + "</span>"; 
    var tweetFormatted = "<div class='tweet'>" + tweetText + tweetTags + tweetTime +"</div>";
    $('.container').append(tweetFormatted);
}