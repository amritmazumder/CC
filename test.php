<?php
	require_once('TwitterAPIExchange.php');
 
	/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
	$settings = array(
	    'oauth_access_token' => "28595591-q6ocrEICp0cVEW1rH9C1h514E7dYOQvVwjUcwuMLa",
	    'oauth_access_token_secret' => "LuNheRRTvBlsdshQBTAcHeBAuxmWH5tSZTE2KoSXQszYZ",
	    'consumer_key' => "2zD9W50OGU83O8QPJOdVc37XC",
	    'consumer_secret' => "vXaU7YgkQr3D6zL2C3R5dcT6uz1udZmz4rLVlK3bdJRRpKK2Fw"
	);

	$url = "https://api.twitter.com/1.1/search/tweets.json";
	$requestMethod = "GET";

	
		$input = htmlentities($_GET['val1']);
		$count = '200';
		/** $getfield = '?q='.$input.'&count='.$count; **/
		$getfield = '?q='.$input.'&count='.$count.'&lang=en'.'&result_type=mixed';


		$twitter = new TwitterAPIExchange($settings);
		$string = json_decode($twitter->setGetfield($getfield)
		->buildOauth($url, $requestMethod)
		->performRequest(),$assoc = TRUE);
	

?>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/style.css">
		<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,700' rel='stylesheet' type='text/css'>
	</head>

	<h1> WADDUP AASHMAN</h1>

	<form action="test.php" method="get">
	    Enter Keywords without spaces: 
	    <input type="text" name="val1" id="val1"></input>

	    <input type="submit" value="send"></input>
	</form>
	<?php
		$startTweetBlock = '<div class="tweet-block">';
		$closeDiv = '</div>';

		$tweet = '<div class="tweet-text">';
		$tweetTime = '<div class="tweet-time">';
		$tweetUser = '<div class="tweet-user">';
		$tweetHandle = '<div class="tweet-handle">';
		$tweetStats = '<div class="tweet-stats">';

		echo 'Showing '.$count.' Tweets For: '.$input.'<br />';
		foreach($string[statuses] as $items)
		    {	
		        echo $startTweetBlock.$tweet.$items['text'].$closeDiv;
		        echo $tweetUser.$items['user']['name'].$closeDiv;
		        echo $tweetHandle.'@'.$items['user']['screen_name'].$closeDiv;
		        echo $tweetStats.$items['favorite_count'].$closeDiv;
		        echo $tweetStats.$items['retweet_count'].$closeDiv;
		        echo $tweetTime.$items['created_at'].'<br />'.$closeDiv.$closeDiv;
		    }
	?>


</html>
	
	
