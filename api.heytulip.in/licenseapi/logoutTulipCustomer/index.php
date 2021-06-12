<?php 
    require('../../configuration/header.php');
    require('../../configuration/config.php');
	
	$emailId = $_REQUEST['emailId'];
	
	$conn = new mysqli($license_servername, $license_username, $license_password, $license_dbname);
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}
	$sql = "UPDATE tulip_customer_login SET session_start_time = DATE_SUB(now(),INTERVAL 1 HOUR) WHERE contact_email = '".$emailId."'";

	$conn->query($sql);
	$message = '{"message":"Done"}';
    echo $message;	
	$conn->close();

?>