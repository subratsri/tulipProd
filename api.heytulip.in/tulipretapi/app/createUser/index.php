<?php
    
    require('../../../configuration/header.php');
    require('../../../configuration/config.php');
    
	$name = $_REQUEST['name'];
	$role = $_REQUEST['role'];
	$max_assigned_ticket = $_REQUEST['max_assigned_ticket'];
	$tc_id = $_REQUEST['tc_id'];
	$user_id = $_REQUEST['user_id'];

    if(is_null($max_assigned_ticket)){
        $max_assigned_ticket = 0;
    }else if(is_null($user_id)){
        echo '{"status":"failed","error":"User ID is null"}';
        exit();
    }
	// Create connection
	$conn = new mysqli($tulip_servername, $tulip_username, $tulip_password, $tulip_dbname);
	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	$sql = "INSERT INTO users (name, role, created_date, max_assigned_ticket,tc_id,user_id)	VALUES ('".$name."','".$role."',now(),'".$max_assigned_ticket."','".$tc_id."','".$user_id."')";

	if ($conn->query($sql) === TRUE) {
		
	  echo '{"status":"created","error":null}';
	} else {
	  echo '{"status":"failed","error":"'.$conn->error.'"}';
	}

	$conn->close();
?>