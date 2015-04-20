// Declare object to read node + link value from
// Will be pushing values in this later
var graph = {
  "nodes": [
    //breaks if you don't start with a default value
    {"x": 469, "y": 410}
  ],
  "links": [
    {"source":  0, "target":  1}
  ]
}


//Init jquery and all
$(document).ready(function(){

    //Store width and height
    var height = $(window).height();
    var width = $(window).width();
	
    //Get Twitter Information from the 'Search API' 
    $(function(){
        $.ajax({
                url: '../searcher.php',
                type: 'GET',
                success: function(response) {
                    if (typeof response.errors === 'undefined' || response.errors.length < 1) { 
                            
                            //parse the received data into a JSON Object
                            tweetObj = jQuery.parseJSON(response);

                            //Run function and pass received data into the program
                            drawTweet(tweetObj);
                            
                    } else {     
                            console.log('screwed');
                    }
                },
                error: function(errors) {
                    console.log('screwed');
                }
            });
        });

    //Draw Tweet function
    //All d3 goes in here
    //takes a parameter function(key) where key allows you to access Twitter JSON
    var drawTweet = function(tweet){
        
        //Append SVG to DIV
        var svg = d3.select('.container').append('svg').attr('height', height).attr('width', width);

        //Create 2 Arrays to store indexes that will be shuffled later
        var tempVal = [];
        var tempVal2 = [];

        //Store first set of random indexes
        for(i = 0; i < 100; i++) {
            tempVal.push(i);
        }
        
        //Store second Set of random indexes
        for(i = 0; i < 100; i++) {
            tempVal2.push(i);
        }

        //Shuffle indexes
        //This will help us make random connections between nodes
        var shuffled = d3.shuffle(tempVal);
        var shuffled2 = d3.shuffle(tempVal2);


        //Setting up values from where the network will oiginate
        var min1 = width/2 + 10;
        var max1 = width/2 - 10;

        var min2 = height/2 + 10;
        var max2 = height/2 - 10;

        //Bind Twitter Data to SVG groups
        var group = svg.selectAll('g').data(tweet.statuses)
                            .enter()
                            .append('g')
                            //for each tweet received....
                            .each(function(d,i){
                                //For the Node Array....
                                //Create a new Object that adds enties for New Nodes
                                var val = {
                                    'x': Math.floor(Math.random() * (max1 - min1 + 1) + min1),
                                    'y': Math.floor(Math.random() * (max2 - min2 + 1) + min2)
                                } 
                                // For the Links Array....
                                // Use the shuffled arrays to create random links
                                // This is to be used an index for the Node Array
                                var lav = {
                                        'source': shuffled[i],
                                        'target': shuffled2[i]
                                    } 
                                
                                graph.nodes.push(val);
                                graph.links.push(lav);
                            });
        

        //Initialize Force Layout

        var force = d3.layout.force()
                    .size([width, height])
                    .charge(-40)
                    .gravity(0.1)
                    .linkDistance(350)
                    .on("tick", tick);

        var link = svg.selectAll(".link"),
        node = svg.selectAll(".node");


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
                      .attr("r", 3)
                      .attr('fill', '#ff5656');
                }        

        function tick() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          node.attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
        }

        action(graph);
    }

});

