<?php 
    require('../../../configuration/header.php');
    require('../../../configuration/config.php');
	
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
	
	$userId = $_REQUEST['userId'];
	$password = md5($_REQUEST['password']);
	
	$conn = new mysqli($tulip_servername, $tulip_username, $tulip_password, $tulip_dbname);
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	//checking user current status, killing existing sessions
	$sql0 = "SELECT count(1) as log_num FROM user_session_history where logout_time is null";
	$countResult = $conn->query($sql0);
	if($countResult->num_rows > 0){
		while ($row = $countResult->fetch_assoc()) {
			if($row["log_num"] > 0){
				$logoutUserQuery = "UPDATE user_session_history SET logout_time = now(), logout_reason = 'USER_FORCED_LOGOUT' WHERE logout_time is null and user_id = '".$userId."'";
				$runquery = $conn->query($logoutUserQuery);
			}
		}
	}

	//logging user in
	$sql = "SELECT user_pass,tc_id FROM login WHERE user_id = '".$userId."'";
	$result = $conn->query($sql);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			if($row["user_pass"] == $password){
	    		//adding session
		    	$insertSessionId = "INSERT INTO user_session_history (tc_id, session_id,user_id,login_time) VALUES ('".$row["tc_id"]."','".$sessionId."','".$userId."',now())";
		        $conn->query($insertSessionId);
				//get user name and user role
				$getUserRoleQuery = "SELECT name, role FROM users WHERE user_id = '".$userId."'";
				$userRole = $conn->query($getUserRoleQuery);
				if($userRole->num_rows >0){
					while($row2 = $userRole->fetch_assoc()){
						$userData = '{"result":"success","userId":"'.$userId.'","sessionId":"'.$sessionId.'","userRole":"'.$row2["role"].'","userName":"'.$row2["name"].'","tcId":"'.$row["tc_id"].'"}';
						echo $userData;
					}
			    }
			}else{
			    echo '{"result":"failed","reason":"wrong_password"}';
			}
		}
	} else {
		echo '{"result":"failed","reason":"no_user_found"}';
	}
	$conn->close();

?>