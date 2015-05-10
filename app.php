 <?php
	require 'ctwitter_stream.php';

	$t = new ctwitter_stream();

	$t->login('2zD9W50OGU83O8QPJOdVc37XC', 'vXaU7YgkQr3D6zL2C3R5dcT6uz1udZmz4rLVlK3bdJRRpKK2Fw', '28595591-q6ocrEICp0cVEW1rH9C1h514E7dYOQvVwjUcwuMLa', 'LuNheRRTvBlsdshQBTAcHeBAuxmWH5tSZTE2KoSXQszYZ');

	$t->start(array('women', 'hackathon'));

	echo $t;
?>