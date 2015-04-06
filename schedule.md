#Chatter

##High Level Goal(s):
_To index and visualize opinion in relation to events._

##Schedule

###Week 1
Twitter API
* Learn how to fetch data from Twitter. Examine the limitations of the API.
* Look at similar projects, precedents. Explore formal possibilities.
	* DQ: Why Twitter?
	* DQ: Does the data accurately reflect general opinion around issues?
	* DQ: Is there an opportunity to bring in an external dataset? To what end? What about the geocodes of the tweets?
	* DQ: What is the input of this program? Do people specify an input? What could some experimental forms of input be?

###Week 2
d3.js
* Get familiarized with relevant with drawing and animation in d3. Look for .svg based animations in d3.
* Plan logic for program.
	* After exploring d3, we plan to compose the basic logic behind the visualization. (Parse the data, Pass the data(?), Animate the data).
	* DQ: What are the parts of the ‘language’ in the data that we want to show relationships between? How can we represent this relationship through other media/sources?

###Week 3
Animation Bootcamp
* Prototype animations in d3.js and relevant libraries.
* Learn / Brush up on Trigonometric Basics, any other mathematical stuff you need for animations.
	* DQ: What are some typo-motion techniques that could be animated with d3.js?

###Week 4
Development
* Major functions: 
	1. Receive input & fetch data from Twitter & related sources
	2. Sort the data chronologically. Record all times.
	3. Parse the data and get keywords.
	4. Pass the data into javascript and d3.js
	5. Starting at time = 0 (First tweet), animate the proliferation of tweets.
	6. Each individual unit has an affect on the _position_ of the central keyword.
	7. Key relationships between units are made apparent based on the frequency of ‘mentions’. (Opportunity to bring in other media?)
	8. The life cycle (or media cycle) of the tweet is animated, visualizing offshoot relationships and broad public opinion.
DQ: Re-evaluate the user interface, if we complete building the program.

###Week 5
Development / Setting
* At this point, we _should be completely done_ with the design of the program.
* Running with the assumption that the work from the previous week will bleed into this week. 
* Consideration of where to present this visualization.

###Week 6
Optimization & Finalization.
* Time for possible installation, emergency fixes, last refinements.