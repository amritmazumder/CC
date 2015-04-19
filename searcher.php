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

	
		$input = '#icorruption';
		$count = '100';
	
		$getfield = '?q='.$input.'&count='.$count.'&lang=en'.'&result_type=mixed';


		$twitter = new TwitterAPIExchange($settings);
		echo $twitter->setGetfield($getfield)
		             ->buildOauth($url, $requestMethod)
		             ->performRequest();
	

?>