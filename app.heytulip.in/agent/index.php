<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<title>Tulip - Agent</title>
	<link rel="stylesheet" type="text/css" href="../css/agent.css">
	<link rel="stylesheet" type="text/css" href="../css/jquery.dataTables.css">
	<link href="../css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">

	<script type="text/javascript" src="../js/aes.js"></script>
	<script type="text/javascript" src="../js/jquery.min.js"></script>
	<script type="text/javascript" src="../js/bootstrap.bundle.min.js"></script>
  	<script type="text/javascript" src="../js/bootstrap.min.js"></script>
	<script type="text/javascript" src="../js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="../js/agent.main.js"></script>
</head>
<body onload="getCustInfo()">
	<!-- The sidebar -->
	<div class="sidebar" id="sidebar">
		<h3>HeyTulip</h3>
		<a class="active">Campaign</a>
		<a >Custom App 1</a>
		<a >Custom App 2</a>
		<a onclick="doLogout()">Logout</a>
	</div>

	<!-- Page content -->
	<div class="content" id="content">
		<span id='alert_box'></span>
		<div id="field_main"></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</body>
</html>