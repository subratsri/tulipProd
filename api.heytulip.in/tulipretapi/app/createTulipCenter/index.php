<?php
    
    require('../../../configuration/header.php');
    require('../../../configuration/config.php');
    
	$name = $_REQUEST['name'];
	$email = $_REQUEST['email'];
	$license_id = $_REQUEST['license_id'];

	// Create connection
	$conn = new mysqli($tulip_servername, $tulip_username, $tulip_password, $tulip_dbname);
	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	$sql = "INSERT INTO tulip_center (name, email, license_id)	VALUES ('".$name."', '".$email."', ".$license_id.")";

	if ($conn->query($sql) === TRUE) {
	  echo '{"status":"created","error":null}';
	} else {
	  echo '{"status":"failed","error":"'.$conn->error.'"}';
	}

	$conn->close();
?>