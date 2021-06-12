<?php 
    require('../../configuration/header.php');
    require('../../configuration/config.php');
	
	function generateSessionId(){
		$length = 10;
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    $charactersLength = strlen($characters);
	    $randomString = '';
	    for ($i = 0; $i < $length; $i++) {
	        $randomString .= $characters[rand(0, $charactersLength - 1)];
	    }
	    return $randomString;
	}
    $sessionStartDatetime = date('Y-m-d H:i:s');
	$sessionId = generateSessionId();
	
	$emailId = $_REQUEST['emailId'];
	$customerPassword = md5($_REQUEST['password']);
	
	$conn = new mysqli($license_servername, $license_username, $license_password, $license_dbname);
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT login_detail.customer_password, login_detail.tc_id, info.customer_id, info.customer_name, info.contact_email, info.contact_number FROM (SELECT customer_password, tc_id FROM tulip_customer_login where contact_email = '".$emailId."' ) as login_detail LEFT JOIN ( SELECT customer_id, customer_name, tc_id, contact_email, contact_number FROM tulip_customer_info WHERE contact_email = '".$emailId."' ) as info ON (login_detail.tc_id = info.tc_id)";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
	    
    	$insertSessionId = "UPDATE tulip_customer_login SET latest_session_id = '".$sessionId."' , session_start_time = '".$sessionStartDatetime."' WHERE contact_email = '".$emailId."'";
        $conn->query($insertSessionId);
  
		while($row = $result->fetch_assoc()) {
			if($row["customer_password"] == $customerPassword){
			    $customerData = '{"tc_id":"'.$row["tc_id"].'","customer_id":"'.$row["customer_id"].'","customer_name":"'.$row["customer_name"].'","contact_email":"'.$row["contact_email"].'","contact_number":"'.$row["contact_number"].'","sessionId":"'.$sessionId.'"}';
			    echo $customerData;
			}else{
			    echo "0";
			}
		}
	} else {
		echo "0";
	}
	$conn->close();

?>