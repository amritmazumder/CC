 <?php

require_once('twitter_proxy.php');

// Twitter OAuth Config options
$oauth_access_token = '28595591-q6ocrEICp0cVEW1rH9C1h514E7dYOQvVwjUcwuMLa';
$oauth_access_token_secret = 'LuNheRRTvBlsdshQBTAcHeBAuxmWH5tSZTE2KoSXQszYZ';
$consumer_key = '2zD9W50OGU83O8QPJOdVc37XC';
$consumer_secret = 'vXaU7YgkQr3D6zL2C3R5dcT6uz1udZmz4rLVlK3bdJRRpKK2Fw';
$user_id = '78884300';
$screen_name = 'parallax';
$count = 5;
$keyword = 'twitter';

$twitter_url = 'search/tweets.json';
//$twitter_url .= '?user_id=' . $user_id;
//$twitter_url .= '&screen_name=' . $screen_name;
//$twitter_url .= '&count=' . $count;
$twitter_url .= '?q=' . $keyword;

// Create a Twitter Proxy object from our twitter_proxy.php class
$twitter_proxy = new TwitterProxy(
	$oauth_access_token,			// 'Access token' on https://apps.twitter.com
	$oauth_access_token_secret,		// 'Access token secret' on https://apps.twitter.com
	$consumer_key,					// 'API key' on https://apps.twitter.com
	$consumer_secret
);

// Invoke the get method to retrieve results via a cURL request
$tweets = $twitter_proxy->get($twitter_url);
echo $tweets;
?>