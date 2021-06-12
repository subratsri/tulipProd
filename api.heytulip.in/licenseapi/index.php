<?php
    require('../configuration/header.php');
    require('../configuration/config.php');

	$command = $_REQUEST['command'];
	$emailId = $_REQUEST['emailId'];

	$conn = new mysqli($license_servername, $license_username, $license_password, $license_dbname);
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	if($command == 'fetch_license'){
		$sql = "SELECT license_data,license_duration,now() as current_day FROM (SELECT license_data,license_duration,tc_id from license_detail) as lt RIGHT JOIN ( SELECT tc_id, contact_email FROM tulip_customer_info WHERE contact_email = '".$emailId."' ) as rt ON (lt.tc_id = rt.tc_id)";
		$result = $conn->query($sql);
		if ($result->num_rows > 0) {
			while($row = $result->fetch_assoc()) {
			    if($row["license_duration"] >= $row["current_day"]){
				    $licenseData = '{"license_data":'.$row["license_data"].',"status":"active"}';
			    }else{
				    $licenseData = '{"license_data":'.$row["license_data"].',"status":"expired"}';
			    }
			}
		} else {
			$licenseData = '{"license_data":null,"status":"unknown"}';
		}
		
	} else {
	    $licenseData = '{"status":"invalid_command"}';
	}
	echo $licenseData;
	$conn->close();
?>