<?php
	header('Access-Control-Allow-Origin: *');

	header('Access-Control-Allow-Methods: GET, POST');

	header("Access-Control-Allow-Headers: X-Requested-With");

	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
	$token = $host = "";


	if ($_SERVER["REQUEST_METHOD"] == "GET") {
		$token = test_input($_REQUEST['token']);
		$host = test_input($_REQUEST['host']);
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Tulip Chat</title>
	<script type="text/javascript">
		function getIframe(){
			var iframe = document.getElementById("iframe_id").contentWindow.location.href;
			alert(iframe);
		}
	</script>
</head>
<body>
	<p>Support Pin: <input type="text" name="support-pin"></p>
	<p><button type="button" class="btn btn-outline-secondary">Start</button></p>

</body>
</html>