<?php 
    require('../../configuration/header.php');
    require('../../configuration/config.php');

	$emailId = $_REQUEST['emailId'];

	$conn = new mysqli($license_servername, $license_username, $license_password, $license_dbname);
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
	$sql = "SELECT latest_session_id from tulip_customer_login WHERE contact_email = '".$emailId."' AND session_start_time >= DATE_SUB('".date('Y-m-d H:i:s')."', INTERVAL 1 HOUR)";

	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	    
		while($row = $result->fetch_assoc()) {
	        $sessionIdJSON = '{"session_id":"'.$row["latest_session_id"].'","status":"success"}';
		}
	} else {
	    $sessionIdJSON = '{"session_id":"0","status":"failed"}';
	}
	echo $sessionIdJSON;
	$conn->close();

?>