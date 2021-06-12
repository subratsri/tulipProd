<?php
    require('../../../configuration/header.php');
    require('../../../configuration/config.php');

	$name = $_REQUEST['name'];
	$field_json = $_REQUEST['field_json'];
	$tc_id = $_REQUEST['tc_id'];

	if($name === null){
		$name = 'DefaltFields';
	}
	else if($field_json == null || $tc_id == null){
		echo '{"status":"failed","error":"Required field missing"}';
		die;
	}
	// Create connection
	$conn = new mysqli($tulip_servername, $tulip_username, $tulip_password, $tulip_dbname);
	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	$sql = "INSERT INTO field_info (name, field_json, tc_id) VALUES ('".$name."', '".$field_json."', ".$tc_id.")";

	if ($conn->query($sql) === TRUE) {
		$create_table_sql = "Create table fields_".$tc_id."_".strtolower($name)."(id SERIAL PRIMARY KEY,";

		$field_array = json_decode($field_json,true);
		foreach($field_array as $field => $datatype){
			$create_table_sql = $create_table_sql." ".$field." ".$datatype.",";
        }
        $create_table_sql = substr($create_table_sql,0,-1);
        $create_table_sql .= ")";
        if ($conn->query($create_table_sql) === TRUE) {
		  echo '{"status":"created","error":null}';
		} else {
		  echo '{"status":"failed","error":"'.addslashes($conn->error).'"}';
		}      
    } else {
	  echo '{"status":"failed","error":"'.addslashes($conn->error).'"}';
	}

	$conn->close();
?>