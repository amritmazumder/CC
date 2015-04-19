$(document).ready(function(){

	var winWidth = $(window).width();
	var winHeight = $(window).height();

	var datasetX = [5,100,150,200,250];
	var datasetY = [30,603,121,843,354];

	var megaData = [
		{
			"x": 100,
			"y": 60,
			"r": 30,
			"color":'red'
		}, {
			"x": 200,
			"y": 403,
			"r": 10,
			"color":'blue'
		}, {
			"x": 550,
			"y": 121,
			"r": 75,
			"color":'green'
		}, {
			"x": 800,
			"y": 243,
			"r": 45,
			"color":'yellow'
		}, {
			"x": 1000,
			"y": 354,
			"r": 100,
			"color":'black'
		}];

	var svg = d3.select('.container').append('svg').attr('width','100%').attr('height',winHeight);

	var circles = svg.selectAll('circle')
						.data(megaData)
						.enter()
						.append('circle')
						.attr('cx',winWidth/2)
						.attr('cy',winHeight/2)
						.attr('r','20');
		
		circles.on('mouseover',function(){
					circles.transition()
							.duration(2000)
							.attr('cx',function(d){
								return d.x
							})
							.attr('cy',function(d){
								return d.y
							})
							.attr('r',function(d){
								return d.r
							})
							.attr('fill',function(d){
								return d.color
							})
		});

		circles.on('mouseout',function(){
			circles.transition()
			.attr('cx',winWidth/2)
			.attr('cy',winHeight/2)
			.attr('r',20)
			.attr('fill','black')
		});
});