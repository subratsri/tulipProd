<!DOCTYPE html>
<html>
<head>
	<title>Tulip Premium Support</title>

	<link rel="stylesheet" type="text/css" href="../css/main.css">
	<link rel="stylesheet" type="text/css" href="../css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="../css/jquery.dataTables.css">
	<script type="text/javascript" src="../js/jquery.min.js"></script>
	<script type="text/javascript" src="../js/bootstrap.bundle.min.js"></script>
	<script type="text/javascript" src="../js/aes.js"></script>
	<script type="text/javascript" src="../js/jquery.dataTables.min.js"></script>
	<script type="text/javascript">
		var mmptCt = 0;
		var sessionIdGlo;
		function getUrlParameter(name) {
		    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		    var results = regex.exec(location.search);
		    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
		};
		function doLogout(){
			var email = getUrlParameter('emailid');
			var settings = {
			  "url": "http://api.heytulip.in/licenseapi/logoutTulipCustomer/?emailId="+email,
			  "method": "GET",
			  "timeout": 0,
			};

			$.ajax(settings).done(function (response) {
			  console.log(response);
			});
			window.open("http://support.heytulip.in/","_self");
		}
		function redirect403(){
			window.open("http://support.heytulip.in/premiumsupport/403.shtml","_self");
		}
		function redirect404(){
			window.open("http://support.heytulip.in/premiumsupport/404.shtml","_self");
		}
		function checkSessionId(sessionId, email){
			var settings = {
			  "url": "http://api.heytulip.in/licenseapi/getCustomerSessionId/?emailId="+email,
			  "method": "GET",
			  "timeout": 0,
			};

			$.ajax(settings).done(function (response) {
			  	var session = JSON.parse(response);
			  	if(sessionId !== session.session_id){
			  		alert("Session Expired, please login again to continue");
			  		window.open("http://support.heytulip.in/","_self");
			  	}
			});
		}
		function setTicketTable(){
			$(function(){
				$("#support-table").dataTable({
					"pageLength":3,
					"bPaginate": true,
				    "bLengthChange": false,
				    "bFilter": true,
				    "bInfo": false,
				    "bAutoWidth": false
				});
			})
		}
		function setLicensetable(){
			$(function(){
				$("#license-table").dataTable({
					"pageLength":3,
					"bPaginate": true,
				    "bLengthChange": false,
				    "bFilter": true,
				    "bInfo": false,
				    "bAutoWidth": false
				});
			})
		}
		function getCustInfo(){

				var urlParams = new URLSearchParams(window.location.search);
				var emailid = urlParams.get('emailid');
				var response = urlParams.get('response');
				if(emailid != null && response != null && response != '' && emailid != ''){
					response = decodeURIComponent(response);
					try{	
						var decrypted = CryptoJS.AES.decrypt(response, emailid);
						decrypted = decrypted.toString(CryptoJS.enc.Utf8);
						var customerData = JSON.parse(decrypted);
					}catch(err){
						redirect404();
					}
					var tc_id = customerData.tc_id;
					var customer_id = customerData.customer_id;
					var customer_name = customerData.customer_name;
					var contact_email = customerData.contact_email;
					var contact_number = customerData.contact_number;
					var sessionId = customerData.sessionId;

					checkSessionId(sessionId, contact_email);
					if(tc_id != undefined && customer_id != null && customer_name != null && contact_email != null && contact_number != null && tc_id != '' && customer_id != '' && customer_name != '' && contact_email != '' && contact_number != ''){
						setTicketTable();
						setLicensetable();
						document.getElementById('tc_id').innerHTML = tc_id;
						document.getElementById('customer_id').innerHTML = customer_id;
						document.getElementById('customer_name').innerHTML = customer_name;
						document.getElementById('contact_email').innerHTML = contact_email;
						document.getElementById('contact_number').innerHTML = contact_number;
					}else{
						redirect404();
					}
				}else{
					redirect404();
				}
			
		}
		function startChat(){
			 var x = document.getElementById("chat-iframe");
			  x.style.display = "block";
		}
	</script>

</head>
<body onload="getCustInfo()">
	<center>
	<?php include '../header.php';?>
	</center>
	<div style="text-align: right;">
		<button type="button" class="btn btn-outline-secondary" onclick="doLogout()">Logout</button>
	</div><br />
	<div class="card" style="width: 100%;">
	 	<table class="table-info">
		  <thead>
		    <tr>
		      <th scope="col">Tulip Center ID</th>
		      <th scope="col">Customer ID</th>
		      <th scope="col">Name</th>
		      <th scope="col">Email</th>
		      <th scope="col">Contact Number</th>
		    </tr>
		  </thead>
		  <tbody>
		    <tr>
		      <th scope="row" id="tc_id"></th>
		      <td id="customer_id"></td>
		      <td id="customer_name"></td>
		      <td id="contact_email"></td>
		      <td id="contact_number"></td>
		    </tr>
		  </tbody>
		</table>
	</div><br /><br />
	<div class="accordion accordion-flush" id="accordionFlushLicense" style="width: 20%;border:1px solid black;float: left;">
	  <div class="accordion-item">
	    <h2 class="accordion-header" id="flush-headingOne">
	      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
	        License Information
	      </button>
	    </h2>
	    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushLicense">
	      <div class="accordion-body">
	      	<code>To add/remove any License Element(s), please raise a support ticket</code><br />
	      	<table id="license-table" data-page-length='3'>
			    <thead>
			      <tr>
			      	<th>Tag Name</th>
			      	<th>Quantity</th>
			      </tr>
			    </thead>
			    <tbody>
			    	<?php
			    		$curl = curl_init();
			    		$email = $_REQUEST['emailid'];
						curl_setopt_array($curl, array(
						  CURLOPT_URL => 'http://api.heytulip.in/licenseapi/?command=fetch_license&emailId='.$email,
						  CURLOPT_RETURNTRANSFER => true,
						  CURLOPT_ENCODING => '',
						  CURLOPT_MAXREDIRS => 10,
						  CURLOPT_TIMEOUT => 0,
						  CURLOPT_FOLLOWLOCATION => true,
						  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
						  CURLOPT_CUSTOMREQUEST => 'GET',
						));

						$response = curl_exec($curl);

						curl_close($curl);
						$response = json_decode($response);
						$licObj = $response->license_data;
						
						echo '<tr>';
							echo '<td> Campaign(s) </td>';
							echo '<td>'.$licObj->campaign.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Queue(s) </td>';
							echo '<td>'.$licObj->queue.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Administrator(s) </td>';
							echo '<td>'.$licObj->administrator.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Supervisor(s) </td>';
							echo '<td>'.$licObj->supervisor.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Agent(s) </td>';
							echo '<td>'.$licObj->agent.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Report(s) </td>';
							echo '<td>'.$licObj->reports.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Ticket Trigger(s) </td>';
							echo '<td>'.$licObj->TicketTrigger.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Lead Upload </td>';
							echo '<td>'.$licObj->LeadUpload.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Fetch Order Policy</td>';
							echo '<td>'.$licObj->FetchOrder.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Custom Tabs </td>';
							echo '<td>'.$licObj->CustomTabs.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> CRM </td>';
							echo '<td>'.$licObj->crm.'</td>';
						echo '</tr>';

						echo '<tr>';
							echo '<td> Crm Fields </td>';
							echo '<td>'.$licObj->CrmFields.'</td>';
						echo '</tr>';
			    	?>
			      
			    </tbody>
		  </table>
	      </div>
	    </div>
	  </div>
	</div>

	<div class="accordion accordion-flush" id="accordionFlushTickets" style="width: 78%;border:1px solid black;float: right;">
	  <div class="accordion-item">
	    <h2 class="accordion-header" id="flush-headingOne">
	      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
	        Support/Service Ticket(s) &nbsp;<small>Powered by Tulip Nxt Gen CRM</small>
	      </button>
	    </h2>
	    <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushTickets">
	      <div class="accordion-body">
	      	<button type="button" class="btn btn-outline-secondary">+ Raise a new Ticket</button>
	      	<table id="support-table" data-page-length='4'>
			    <thead>
			      <tr>
			      	<th>Ticket ID</th>
			      	<th>Status</th>
			      	<th>Description</th>
			      	<th>Last Updated</th>
			      	<th></th>
			      </tr>
			    </thead>
			    <tbody>
			      <tr>
			      	<td>SitePoint</td>
			      	<td>SitePoint</td>
			      	<td>SitePoint</td>
			      	<td>SitePoint</td>
			      	<td><button type="button" class="btn btn-outline-secondary">Open</button></td>
			      </tr>
			      <tr>
			      	<td>Learnable</td>
			      	<td>Learnable</td>
			      	<td>Learnable</td>
			      	<td>Learnable</td>
			      	<td><button type="button" class="btn btn-outline-secondary">Open</button></td>
			      </tr>
			      <tr>
			      	<td>Flippa</td>
			      	<td>Flippa</td>
			      	<td>Flippa</td>
			      	<td>Flippa</td>
			      	<td><button type="button" class="btn btn-outline-secondary">Open</button></td>
			      </tr>
			      <tr>
			      	<td>Subrat</td>
			      	<td>Subrat</td>
			      	<td>Subrat</td>
			      	<td>Subrat</td>
			      	<td><button type="button" class="btn btn-outline-secondary">Open</button></td>
			      </tr>
			      <tr>
			      	<td>ABC</td>
			      	<td>ABC</td>
			      	<td>ABC</td>
			      	<td>ABC</td>
			      	<td><button type="button" class="btn btn-outline-secondary">Open</button></td>
			      </tr>
			    </tbody>
		  </table>
	      </div>
	    </div>
	  </div>
	</div>

	<br /><br /><br /><br />

	<!-- Chat REGION -->
	<div class="accordion accordion-flush" id="accordionFlushChat" style="width: 20%;border:1px solid black;float: bottom;">
	  <div class="accordion-item">
	    <h2 class="accordion-header" id="flush-headingThree">
	      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseOne">
	        Start a Chat
	      </button>
	    </h2>
	    <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushChat">
	      <div class="accordion-body">
	      	<iframe src="http://chat.heytulip.in/" height="200" width="1000" title="Chat iframe"></iframe>
	      	
	      </div>
	    </div>
	  </div>
	</div>

	<br /><br /><br /><br /><br /><br /><br />
	<div class="support-footer">
		<?php include '../footer.php';?>
	</div>
</body>
</html>