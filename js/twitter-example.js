$(document).ready(function(){
	
	var winWidth = $(window).width();
	var winHeight = $(window).height();
 	
 	var tweetObj;

 	//Get Data from PHP file, create an Object with the incoming JSON string
	$(function(){
		$.ajax({
				url: 'searcher.php',
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


	var svg = d3.select('.container').append('svg').attr('width','100%').attr('height',winHeight);
	var trigger = svg.append('circle').attr('cx',winWidth/2).attr('cy',winHeight/2).attr('r','50').attr('fill','rgb(240,240,240)');

	
	var drawTweet = function(response){
		var groups = svg.selectAll('g')
							.data(response.statuses)
							.enter()
							.append('g');
			
			groups.append('circle')
					.attr('cx', function(d,i){
								return winWidth/2;
							})
							.attr('cy', function(d,i){
								return winHeight/2;
							})
							.attr('r', function(d,i){
								return '20';
							});	

		initDelay = 0;
		var toggle = true;

		trigger.on('mouseover',function(){
			if (toggle) {
				toggle = false;
				groups.select('circle').transition()
				.delay(function(){
					initDelay += 200;
					return initDelay;
				})
				.attr('cx',function(d){
					return Math.floor(Math.random() * (winWidth - 0 + 1));
				})
				.attr('cy',function(d){
					return Math.floor(Math.random() * (winHeight - 0 + 1));
				})
				.attr('fill',function(d){
					var col1 = Math.floor(Math.random() * (255 - 0 + 1));
					var col2 = Math.floor(Math.random() * (255 - 0 + 1));
					var col3 = Math.floor(Math.random() * (255 - 0 + 1));

					return 'rgb('+col1+','+col2+','+col3+')'
				});
			}
		});

		var circles = groups.select('circle');

		circles.on('mouseover',function(){
			d3.select(this.parentNode)
					.append('text')
					.text(function(d){return d.text})
					.attr('x','40')
					.attr('y', '40');

		});

		circles.on('mouseout',function(){
			d3.select(this.parentNode)
				.select('text')
				.remove();
		})
	}


});