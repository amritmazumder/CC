$(document).ready(function(){
	
	var winWidth = $(window).width();
	var winHeight = $(window).height();

	// var svg = d3.select('.container').append('svg').attr('width','100%').attr('height',winHeight);
	// var trigger = svg.append('circle').attr('cx',winWidth/2).attr('cy',winHeight/2).attr('r','50').attr('fill','rgb(240,240,240)');

	// var response_y = [];

	// for (i = 0; i < 20; i++) {
	// 	var randint_y = Math.floor(Math.random() * (winHeight - 0 + 1));
	// 	response_y.push(randint_y);
	// }  
	// console.log(response_x);
	// console.log(response_y);

	
	// var drawTweet = function(){
		
	// 	var groups = svg.selectAll('g')
	// 				.data(response_y)
	// 				.enter()
	// 				.append('g');
			
	// 	groups.append('circle')
	// 			.attr('cx', function(d,i){
	// 				return winWidth/2;
	// 			})
	// 			.attr('cy', function(d,i){
	// 				return winHeight/2;
	// 			})
	// 			.attr('r', function(d,i){
	// 				return '20';
	// 			});	



	/////////////////

	//var width = 960,
	//height = 500;

	var fill = d3.scale.category20();

	var force = d3.layout.force()
	    .size([winWidth, winHeight])
	    .nodes([{}]) // initialize with a single node
	    .linkDistance(30)
	    .charge(-60)
	    .on("tick", tick);

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	    .on("mousemove", mousemove)
	    .on("mousedown", mousedown);

	svg.append("rect")
	    .attr("width", width)
	    .attr("height", height);

	var nodes = force.nodes(),
	    links = force.links(),
	    node = svg.selectAll(".node"),
	    link = svg.selectAll(".link");

	var cursor = svg.append("circle")
	    .attr("r", 30)
	    .attr("transform", "translate(-100,-100)")
	    .attr("class", "cursor");

	restart();

	function mousemove() {
	  cursor.attr("transform", "translate(" + d3.mouse(this) + ")");
	}

	function mousedown() {
	  var point = d3.mouse(this),
	      node = {x: point[0], y: point[1]},
	      n = nodes.push(node);

	  // add links to any nearby nodes
	  nodes.forEach(function(target) {
	    var x = target.x - node.x,
	        y = target.y - node.y;
	    if (Math.sqrt(x * x + y * y) < 30) {
	      links.push({source: node, target: target});
	    }
	  });

	  restart();
	}

	function tick() {
	  link.attr("x1", function(d) { return d.source.x; })
	      .attr("y1", function(d) { return d.source.y; })
	      .attr("x2", function(d) { return d.target.x; })
	      .attr("y2", function(d) { return d.target.y; });

	  node.attr("cx", function(d) { return d.x; })
	      .attr("cy", function(d) { return d.y; });
	}

	function restart() {
	  link = link.data(links);

	  link.enter().insert("line", ".node")
	      .attr("class", "link");

	  node = node.data(nodes);

	  node.enter().insert("circle", ".cursor")
	      .attr("class", "node")
	      .attr("r", 5)
	      .call(force.drag);

	  force.start();
	}

			
});

