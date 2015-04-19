$(document).ready(function(){
	var winWidth = $(window).width();
	var winHeight = $(window).height();
 	
 	var tweetObj;

 	//Get Data from PHP file, create an Object with the incoming JSON string
	$(function(){
		$.ajax({
				url: 'app.php',
				type: 'POST',
				success: function(response) {
					if (typeof response.errors === 'undefined' || response.errors.length < 1) {	
							// var arr = [];
							// arr.push(response);
							var inData = jQuery.parseJSON(response);
							streamUpdate(inData);
							
					} else {	 
						    console.log('not working');
					}
				},
				error: function(errors) {
					console.log('not working');
				}
			});
		});

	var streamUpdate = function(inData){
		var svg = d3.select('.container').append('svg').attr('width','100%').attr('height',winHeight);
		var text = svg.selectAll('text').data(inData).enter().append('text').text(inData.length);
	}
});