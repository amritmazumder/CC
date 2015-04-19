var graph = {
  "nodes": [
    {"x": 469, "y": 410},
    {"x": 493, "y": 364},
    {"x": 442, "y": 365},
    {"x": 467, "y": 314},
    {"x": 477, "y": 248},
    {"x": 425, "y": 207},
    {"x": 402, "y": 155},
    {"x": 369, "y": 196},
    {"x": 350, "y": 148},
    {"x": 539, "y": 222},
    {"x": 594, "y": 235},
    {"x": 582, "y": 185},
    {"x": 633, "y": 200}
  ],
  "links": [
    {"source":  0, "target":  1},
    {"source":  1, "target":  2},
    {"source":  2, "target":  0},
    {"source":  1, "target":  3},
    {"source":  3, "target":  2},
    {"source":  3, "target":  4},
    {"source":  4, "target":  5},
    {"source":  5, "target":  6},
    {"source":  5, "target":  7},
    {"source":  6, "target":  7},
    {"source":  6, "target":  8},
    {"source":  7, "target":  8},
    {"source":  9, "target":  4},
    {"source":  9, "target": 11},
    {"source":  9, "target": 10},
    {"source": 10, "target": 11},
    {"source": 11, "target": 12},
    {"source": 12, "target": 10}
  ]
}



$(document).ready(function(){
	
	var width = $(window).width();
	var height = $(window).height();

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

	var action = function(graph) {
  	force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  link = link.data(graph.links)
    .enter().append("line")
    .attr("class", "link");

  node = node.data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 12)
      .on("dblclick", dblclick)
      .call(drag);

	}
    /////////////
	

	var fill = d3.scale.category20();

	var force = d3.layout.force()
	    .size([width, height])
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

