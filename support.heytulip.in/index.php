<!DOCTYPE html>
<html lang="en">
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Tulip Suport</title>
	<link rel="stylesheet" type="text/css" href="./css/main.css">
	<link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css">
	<script type="text/javascript" src="./js/jquery.min.js"></script>
	<script type="text/javascript" src="./js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="./js/aes.js"></script>
	<script type="text/javascript" src="./js/main.js"></script>
	

</head>
<body onload="onLoad()">
	<div class='main-support-container'>
		<div class='support-header'>
			<?php include 'header.php';?><br />
			<div id ='nopassidAlert' >
				<span class="alert alert-danger alert-dismissible fade show" role="alert" >Please Enter your correct Support Id and Password 
					<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
				</span>
			</div>
			<span id= "loginAlert" class="alert  alert-dark alert-dismissible fade show" role="alert" >Please login to continue 
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</span>
			<br /> <br />
			<center id = 'loadingAnim'>
				<div class="loader"></div>
			</center>
		</div><br /><br />
		<div class="support-login">
			<center>
				<img src="./images/tulip-flower.svg" class="img-fluid" width="100" height="100" ><br /><br /><br />
				<?php include 'login.php';?>
			</center>
		</div><br /><br /><br /><br /><br /><br /><br /><br />
		<div class="support-footer">
			<?php include 'footer.php';?>
		</div>
	</div>
</body>
</html>