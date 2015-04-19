$(document).ready(function(){
	
	var winWidth = $(window).width();
	var winHeight = $(window).height();
 	
 	var tweetObj;

 	//Get Data from PHP file, create an Object with the incoming JSON string
	$(function(){
		$.ajax({
				url: '../searcher.php',
				type: 'GET',
				success: function(response) {
					if (typeof response.errors === 'undefined' || response.errors.length < 1) {	
							tweetObj = jQuery.parseJSON(response);
							drawTweet(tweetObj);
							console.log(tweetObj.statuses.length);
					} else {	 
						    console.log('fucked');
					}
				},
				error: function(errors) {
					console.log('fucked');
				}
			});
		});

});