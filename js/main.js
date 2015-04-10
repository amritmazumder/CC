$(document).ready(function(){

	var svg = d3.select('.container').append('svg').attr('width','100%').attr('height','600');
	var datasetX = [5,100,150,200,250];
	var datasetY = [30,603,121,843,354];

	d3.select('svg').append('circle')
	.attr('r','50')
	.attr('cy','50%')
	.attr('cx','50%');

	d3.select('circle').attr('fill','#ffce00')
	.transition()
	.duration(2000)
	.attr('r','20')
	.attr('cy','100%')
	.attr('cx','20%')	
	.attr('fill',"#ff5656");

	var shuffle = function(){
			for(i=0;i<datasetX.length;i++){
			d3.select('circle').transition().duration(4000)
			.attr('cx',datasetX[i])
			.attr('cy',datasetY[i])
			.attr('r',datasetX[i]);
			shuffle();
		}
	}


	// for (i = 0; i < dataset.length; i++) {
	// 	d3.select('circle')
	// 		.attr('fill','#ffce00')
	// 		.transition().duration(4000)
	// 		.attr('cx',dataset[i]).attr('cy',dataset[i]).attr('r',dataset[i]/10)
	// 		.attr('fill',"#ff5656");
	// }
});