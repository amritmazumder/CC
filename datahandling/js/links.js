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

        textArray = [];

        for(i = 0; i < tweet.statuses.length; i++) {
            var text = tweet.statuses[i].text;
            var splitText = text.split(' ');
            tweet.statuses[i].tokens = splitText;
            //console.log(splitText);
        }

        for (i = 0; i < tweet.statuses.length; i++) {
            for (j = 0; j < tweet.statuses[i].tokens.length; j++) {
                if (tweet.statuses[i].tokens[j] == 'Women' || tweet.statuses[i].tokens[j] == 'women' || tweet.statuses[i].tokens[j] == 'woman' || tweet.statuses[i].tokens[j] == 'Woman' || tweet.statuses[i].tokens[j] == '#women' || tweet.statuses[i].tokens[j] == '#woman') {
                    textArray.push(tweet.statuses[i]);
                }
            }
        }

        var tagArray = [];
        var uniqueTags = [];
       
        for(i = 0; i < textArray.length; i++) {
            for (j = 0; j < textArray[i].entities.hashtags.length; j++) {
                tagArray.push(textArray[i].entities.hashtags[j].text)
            }
        }

        $.each(tagArray, function(i, el){
            if($.inArray(el, uniqueTags) === -1) uniqueTags.push(el);
        });

        //console.log(textArray[0].entities.hashtags[0].text);
        
        //Append SVG to DIV
        var svg = d3.select('.container').append('svg').attr('height', height+height).attr('width', width);

        svg.selectAll('text')
            .data(uniqueTags).enter().append('text')
            .text(function(d){return '#' + d})
            .attr('x', function(d,i) {
                return 20
            })
            .attr('y', function(d,i){
                return i * 15
            })
            .attr('font-size', '10px')

        //Create 2 Arrays to store indexes that will be shuffled later
        var tempVal = [];
        var tempVal2 = [];

        //Store first set of random indexes
        for(i = 0; i < tweet.statuses.length; i++) {
            tempVal.push(i);
        }
        
        //Store second Set of random indexes
        for(i = 0; i < tweet.statuses.length; i++) {
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
        //console.log(tweet.statuses.length, textArray.length);

        var group = svg.selectAll('g').data(textArray)
                            .enter()
                            .append('g')
                            //for each tweet received....
                            .each(function(d,i){
                                //For the Node Array....
                                //Create a new Object that adds enties for New Nodes
                                var val = {
                                    'x': 0,
                                    'y': 0
                                } 
                                // For the Links Array....
                                // Use the shuffled arrays to create random links
                                // This is to be used an index for the Node Array
                                var lav = {
                                        'source': i,
                                        'target': i+1
                                    } 
                                
                                graph.nodes.push(val);
                                graph.links.push(lav);
                            });
        

        //Initialize Force Layout
        // All Force Layout related code goes here: 
        var force = d3.layout.force()
                    .size([width, height])
                    .charge(-400)
                    //.gravity(0.5)
                    .linkDistance(550)
                    .on("tick", tick);

        var link = d3.select('g').selectAll(".link"),
        node = d3.select('g').selectAll(".node");


        var action = function(graph) {
                force
                    .nodes(graph.nodes)
                    .links(graph.links)
                    .start();

                link = link.data(graph.links)
                    .enter().append("line")
                    .attr("class", "link");

                //Create A Group Element for Each Node
                node = node.data(graph.nodes)
                      .enter().append("g")
                      .attr("class", "node");

                node.append('circle')
                        .attr('r', 5)
                        .attr('fill', '#ff5656')
                        .attr('cx', 0)
                        .attr('cy', 0);

                var bounds = {
                    x: 0, // bounding box is 300 pixels from the left
                    y: -5, // bounding box is 400 pixels from the top
                    width: 300, // bounding box is 500 pixels across
                    height: 600 // bounding box is 600 pixels tall
                };

                node.data(tweet.statuses).append('text')
                        .attr('dx', 10)
                        .attr('dy', 0)
                        .attr('width', 30)
                        .attr('class', 'tweet-text')
                        .attr('font-family', 'sans-serif')
                        .text(function(d){
                            return d.text;
                        });

                d3.selectAll('text.tweet-text')
                    .each(function(d,i){
                        d3.select(this).textwrap(bounds)
                    });
                      
                }        


        function tick() {
          link.attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });

          // node.attr("x", function(d) { return d.x; })
          //     .attr("y", function(d) { return d.y; });

          node.data(graph.nodes).attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        }

        action(graph);
    }

});

