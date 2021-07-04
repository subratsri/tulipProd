var userDataGlobal = '';
var campaignUserGlobal = [];
var userCampaignToAssign = [];
var userCampaignToRemove = [];
var campaignAvailGlobal  = [];
		function setFieldTable(){
			$(function(){
				$("#field-table").dataTable({
					"pageLength":10,
					"bPaginate": true,
				    "bLengthChange": false,
				    "bFilter": true,
				    "bInfo": true,
				    "bAutoWidth": true
				});
			})
		}

		function getCustInfo(){
			var urlParams = new URLSearchParams(window.location.search);
			var userId = urlParams.get('userId');
			var data = urlParams.get('data');
			if(userId != null && data != null && data != '' && userId != ''){
				data = decodeURIComponent(data);
				try{	
					var decrypted = CryptoJS.AES.decrypt(data, userId);
					decrypted = decrypted.toString(CryptoJS.enc.Utf8);
					var userData = JSON.parse(decrypted);
					userDataGlobal = userData;
					showProcess();
				}catch(e){
					console.log(e);
				}
			}else{
				window.open("../");
			}
		}
		function updateData(campaignId, processId){
			var setupUrl = document.getElementById('setup'+processId).value;
			var propagateCustomer = document.getElementById('flexCheckProcess'+processId).checked;
			if(propagateCustomer){propagateCustomer=1;}else{propagateCustomer=0;}
			var history = document.getElementById('preview'+campaignId).value;
			var customer = document.getElementById('customer'+campaignId).value;
			var dispose = document.getElementById('dispose'+campaignId).value;

			var requestOptions = {
			  method: 'GET',
			  redirect: 'follow'
			};

			fetch("http://api.heytulip.in/tuliprestapi/app/updateProcessAndCampaign/?campaignId="+campaignId+"&processId="+processId+"&propagateCustomer="+propagateCustomer+"&setupUrl="+setupUrl+"&history="+history+"&dispose="+dispose+"&customer="+customer, requestOptions)
			  .then(response => response.text())
			  .then(result => {
			  		document.getElementById('alert_box').innerHTML = '<div class="alert alert-success  alert-dismissible fade show" role="alert">Data updated <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
			  })
			  .catch(error => console.log('error', error));
		}

		
		function assignUser(campaignId){
			var tag = "availableUser"+campaignId;
			var tc_id = userDataGlobal.tcId;
			var userData = campaignAvailGlobal;
			if(userData){
				for(var i=0; i < userData.length;i++){
					var userCampaign = userData[i].substring(userData[i].lastIndexOf("_")+1, userData[i].length);
					if(userCampaign == campaignId){
						var tag2 = userData[i]+'_checkbox';
						var checkBoxCheck = document.getElementById(tag2).checked;
						if(checkBoxCheck){
							document.getElementById(userData[i]).style.display = 'none';
							var userId = userData[i].substring(0,userData[i].lastIndexOf("_"));
							var requestOptions = {
							  method: 'GET',
							  redirect: 'follow'
							};

							fetch("http://api.heytulip.in/tuliprestapi/app/assignUserToCampaign/?user_id="+userId+"&campaign_id="+campaignId+"&tc_id="+tc_id, requestOptions)
							  .then(response => response.json())
							  .then(result => {
							  		getCampaignUser(campaignId);
							  })
							  .catch(error => console.log('error', error));
						}
					}
				}
			}
		}
		function removeUser(campaignId){
			var tag = "assignedUser"+campaignId;
			var userData = campaignUserGlobal;
			var tc_id = userDataGlobal.tcId;
			if(userData){
				for(var i=0; i < userData.length;i++){
					var userCampaign = userData[i].substring(userData[i].lastIndexOf("_")+1, userData[i].length);
					if(userCampaign == campaignId){
						var tag2 = userData[i]+'_checkbox';
						var checkBoxCheck = document.getElementById(tag2).checked;
						if(checkBoxCheck){
							document.getElementById(userData[i]).style.display = 'none';
							var userId = userData[i].substring(0,userData[i].lastIndexOf("_"));
							var requestOptions = {
							  method: 'GET',
							  redirect: 'follow'
							};

							fetch("http://api.heytulip.in/tuliprestapi/app/removeUserFromCampaign/?user_id="+userId+"&campaign_id="+campaignId+"&tc_id="+tc_id, requestOptions)
							  .then(response => response.json())
							  .then(result => {
							  		getCampaignUser(campaignId);
							  })
							  .catch(error => console.log('error', error));
						}
					}
				}
			}
		}


		/////////////////////////////////////////////////////////////////////

			function filterAvailableUser(campaignId) {
			  var tag = "campaignAvailUser"+campaignId;
			  var myTableTag = "availableUser"+campaignId;
			  var input,filter, table, tr, td, i, txtValue;
			  input = document.getElementById(tag);
			  filter = input.value.toUpperCase();
			  table = document.getElementById(myTableTag);
			  tr = table.getElementsByTagName("tr");
			  // alert(tr.length);
			  for (i = 1; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[1];
			 
			    if (td) {
			      txtValue = td.innerText;
			      if (txtValue.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }       
			  }
			}

			function filterAssignedUser(campaignId) {
			  var tag = "campaignUser"+campaignId;
			  var myTableTag = "assignedUser"+campaignId;
			  var input,filter, table, tr, td, i, txtValue;
			  input = document.getElementById(tag);
			  filter = input.value.toUpperCase();
			  table = document.getElementById(myTableTag);
			  tr = table.getElementsByTagName("tr");
			  // alert(tr.length);
			  for (i = 1; i < tr.length; i++) {
			    td = tr[i].getElementsByTagName("td")[1];
			 
			    if (td) {
			      txtValue = td.innerText;
			      if (txtValue.toUpperCase().indexOf(filter) > -1) {
			        tr[i].style.display = "";
			      } else {
			        tr[i].style.display = "none";
			      }
			    }       
			  }
			}


		   /////////////////////////////////////////////
		function getAvailableUser(campaignId){
			var tc_id = userDataGlobal.tcId;
			var requestOptions = {
			  method: 'GET',
			  redirect: 'follow'
			};

			fetch("http://api.heytulip.in/tuliprestapi/app/getAvailableUserByCampaign/?campaign_id="+campaignId+"&tc_id="+tc_id, requestOptions)
			  .then(response => response.json())
			  .then(result => {
			  		var tag = 'availableTable'+campaignId;
			  	console.log('Avail User'+campaignId+ JSON.stringify(result.data))
				  	var usersHTML = '';
				  	if(result.data){
						var userAvailData = '<input type="text" id="campaignAvailUser'+campaignId+'" onkeyup="filterAvailableUser('+campaignId+')" ><button style="float:right;" onclick="assignUser('+campaignId+')"> > </button> <span style="font-size: 20px;padding-left:90px;">Available Users</span> <table id="availableUser'+campaignId+'"> <tr class="header"> <th style="width:60%;"><input type="checkbox"></th> <th style="width:40%;">User ID</th> </tr>';

						for(var userLoop=0; userLoop < result.data.length; userLoop++){
							campaignAvailGlobal.push(result.data[userLoop].user_id+'_'+campaignId);
							usersHTML = usersHTML+'<tr id="'+result.data[userLoop].user_id+'_'+campaignId+'"><td><input type="checkbox"  id="'+result.data[userLoop].user_id+'_'+campaignId+'_checkbox" value="'+result.data[userLoop].user_id+'" /></td><td>'+result.data[userLoop].user_id+'</td></tr>';
						}
						userAvailData = userAvailData+usersHTML+'</table>';
					}else{
						var userAvailData = 'No User Available';				

					}
					document.getElementById(tag).innerHTML=userAvailData;
			  })
			  .catch(error => console.log('error', error));
		}

		function getCampaignUser(campaignId){
			var tc_id = userDataGlobal.tcId;
			var requestOptions = {
			  method: 'GET',
			  redirect: 'follow'
			};

			fetch("http://api.heytulip.in/tuliprestapi/app/getUserByCampaign/?campaign_id="+campaignId+"&tc_id="+tc_id, requestOptions)
			  .then(response => response.json())
				  .then(result => {
				  	var noUserFound = '';
				  	var tag = 'campaign_user'+campaignId;
				  	var usersHTML = '';
				  	if(result.data){

						var userAllData = '<div id="availableTable'+campaignId+'" style="width:48%;float:left;"></div>';
						var userAssignedData = '<div id="assignedTable" style="width:48%;float:right;"> <button onclick="removeUser('+campaignId+')"> < </button><input  style="float:right;" type="text" id="campaignUser'+campaignId+'" onkeyup="filterAssignedUser('+campaignId+')" > <span style="font-size: 20px;padding-left:90px;">Assigned Users</span> <table id="assignedUser'+campaignId+'"> <tr class="header"> <th style="width:60%;"><input type="checkbox"></th> <th style="width:40%;">User ID</th> </tr>';

						for(var userLoop=0; userLoop < result.data.length; userLoop++){
							campaignUserGlobal.push(result.data[userLoop].user_id+'_'+campaignId);
							usersHTML = usersHTML+'<tr id="'+result.data[userLoop].user_id+'_'+campaignId+'"><td><input type="checkbox"  id="'+result.data[userLoop].user_id+'_'+campaignId+'_checkbox" value="'+result.data[userLoop].user_id+'" /></td><td>'+result.data[userLoop].user_id+'</td></tr>';
						}
						userAssignedData = userAssignedData+usersHTML+'</table> </div>';
					}else{
						var userAllData = '<div id="availableTable'+campaignId+'" style="width:48%;float:left;">No User Available</div>';
						var userAssignedData = '<div id="assignedTable" style="width:48%;float:right;">No User Available</div>';
						userAssignedData = userAssignedData+usersHTML;					

					}
					document.getElementById(tag).innerHTML='<div id="userTable">'+userAllData+userAssignedData+'</div>';
					getAvailableUser(campaignId);
			  })
			  .catch(error => console.log('error', error));
			
		}
		function getCampaigns(process_id){
			var processId = parseInt(process_id);
			var requestOptions = {
			  method: 'GET',
			  redirect: 'follow'
			};
			var data_name = 'campaign_data'+ process_id;
			fetch("http://api.heytulip.in/tuliprestapi/app/getCampaign/?process_id="+processId, requestOptions)
			  .then(response => response.json())
			  .then(result => {
			  	if(result.status != 'no_data'){
			  	 	console.log('Campaign Data '+result.data.length);
			  	 	var campaignData = '<div class="accordion accordion-flush" id="accordionMain'+process_id+'">';
			  	 	for(var i=0;i<result.data.length;i++){
			  	 		campaignData = campaignData+'<div class="accordion-item"> <h2 class="accordion-header" id="heading'+i+'"> <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCampaign'+i+'_'+process_id+'" aria-expanded="true" aria-controls="collapseCampaign'+i+'_'+process_id+'"><br /><i>'+result.data[i].name+'</i> </button> </h2> <div id="collapseCampaign'+i+'_'+process_id+'" class="accordion-collapse collapse" aria-labelledby="heading'+i+'" data-bs-parent="#accordionMain'+process_id+'"><br /><div class="accordion-body"><b>Campaign ID</b>  '+result.data[i].id+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Type</b> <i>'+result.data[i].type+'</i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<b>Theme ID </b>'+result.data[i].theme_id+'<br /><br />History URL <input type="text" id="preview'+result.data[i].id+'" value="'+result.data[i].preview_url+'"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Customer URL <input type="text" id="customer'+result.data[i].id+'"  value="'+result.data[i].customer_url+'"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dispose URL <input type="text" id="dispose'+result.data[i].id+'" value="'+result.data[i].dispose_url+'"/> <br /><br /><p> <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUser'+result.data[i].id+'" aria-expanded="false" aria-controls="collapseUser'+result.data[i].id+'"> &nbsp;&nbsp;Users&nbsp;&nbsp; </button> </p> <div class="collapse" id="collapseUser'+result.data[i].id+'"> <div class="card card-body"><span id="campaign_user'+result.data[i].id+'"></span></div> </div><br /><button type="button" class="btn btn-primary" onclick="updateData('+result.data[i].id+','+processId+')">Update</button></div> </div> </div>';
			  	 	}
			  	 	campaignData = campaignData + ' </div>';

			  	  	document.getElementById(data_name).innerHTML = campaignData;
			  	  	for(var j=0;j<result.data.length;j++){
			  	  		getCampaignUser(result.data[j].id);
			  	  	}
			  	}else{
			  		document.getElementById(data_name).innerHTML = 'No Campaign Created';
			  	}
			  })
			  .catch(error => console.log('error', error));

		}

		function createCampaign(){
			alert('Unimplemented');

		}
		//Show all data on UI 
		function showProcessData(data){
			
			var length = Object.keys(JSON.parse(data).data).length;
			data = JSON.parse(data);
			var processData = '<span id="alert_box"></span><br /><br />';
			var ddData = '';
			for(var i=0; i< length;i++){
				if(data.data[i].propagate_customer == 1){
					processData = processData+'<p><button class="btn btn-primary" type="button" data-bs-toggle="collapse"'+i+' data-bs-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapseExample">'+data.data[i].name+'</button></p><div class="collapse" id="collapse'+i+'"><div class="card card-body"><span>Process ID : '+data.data[i].id+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-primary" onclick="createCampaign()">Create Campaign</button></span><br /><br />CRM Setup URL <input type="text" id="setup'+data.data[i].id+'" value="'+data.data[i].crm_url+'"/><br /><div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="flexCheckProcess'+data.data[i].id+'" checked> <label class="form-check-label" for="flexCheckDefault">Propogate Customer </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data Field <i>'+data.data[i].field_name+'</i></div><br />'+'<div id="campaign_data'+data.data[i].id+'"></div>';
				}else{
					processData = processData+'<p><button class="btn btn-primary" type="button" data-bs-toggle="collapse"'+i+' data-bs-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapseExample">'+data.data[i].name+'</button></p><div class="collapse" id="collapse'+i+'"><div class="card card-body"><span>Process ID : '+data.data[i].id+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <button type="button" class="btn btn-primary" onclick="createCampaign()">Create Campaign</button></span><br /><br />CRM Setup URL <input type="text" id="setup'+data.data[i].id+'" value="'+data.data[i].crm_url+'"/><br /><div class="form-check"> <input class="form-check-input" type="checkbox" value="" id="flexCheckProcess'+data.data[i].id+'" > <label class="form-check-label" for="flexCheckDefault">Propogate Customer </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Data Field <i>'+data.data[i].field_name+'</i></div><br />'+'<div id="campaign_data'+data.data[i].id+'"></div>';
				}
				processData = processData+'</div></div><br />';
			}
			document.getElementById('content').innerHTML = processData;
			for(j=0;j<length;j++){
				getCampaigns(data.data[j].id);
			}
		}

		function showMediaProfileData(data){
			document.getElementById('content').innerHTML = "<span id='alert_box'></span><p>Media Profile</p>";
		}

		function showFieldsData(data){
			var fieldData = '<span id="alert_box"></span><table id="field-table" data-page-length="10"><thead><tr><th>Field Name</th><th>Field</th></tr></thead><tbody>';
			var tableData = "";
			var length = Object.keys(JSON.parse(data).data).length;
			data = JSON.parse(data);
			for(var i =0; i<length; i++){
				tableData = tableData+'<tr><td>'+data.data[i].name+'</td><td>'+JSON.stringify(data.data[i].field_json)+'</td></tr>';
			}

			tableData = tableData+'</tbody></table>';
			fieldData = fieldData + tableData;
			document.getElementById('content').innerHTML = fieldData;
			setFieldTable();

		}

		function showAppConfigData(data){
			document.getElementById('content').innerHTML = "<span id='alert_box'></span><p>App Configuration</p>";
		}

		function showUsersData(data){
			document.getElementById('content').innerHTML = "<span id='alert_box'></span><p>Users</p>";
		}

		function showEventData(data){
			document.getElementById('content').innerHTML = "<span id='alert_box'></span><p>Event</p>";
		}
		//Get all data from API

		function getProcessData(){
			var requestOptions = {
			  method: 'GET',
			  redirect: 'follow'
			};

			fetch("http://api.heytulip.in/tuliprestapi/app/getProcess/?tc_id="+userDataGlobal.tcId, requestOptions)
			  .then(response => response.text())
			  .then(result => {
			  	showProcessData(result);
			  })
			  .catch(error => console.log('error', error));
			
		}
		function getMediaProfileData(){
			var data = '{"test2":"test2"}';
			showMediaProfileData(data);
		}
		function getFieldsData(){
			var requestOptions = {
			  method: 'GET',
			  redirect: 'follow'
			};

			fetch("http://api.heytulip.in/tuliprestapi/app/getField/?tc_id="+userDataGlobal.tcId, requestOptions)
			  .then(response => response.text())
			  .then(result => {
				showFieldsData(result);
			  })
			  .catch(error => console.log('error', error));

		}
		function getAppConfigData(){
			var data = '{"test3":"test3"}';
			showAppConfigData(data);
		}

		function getUsersData(){
			var data;
			showUsersData(data);	
		}
		function getEventData(){
			var data;
			showEventData(data);
		}

		//Fucntion for handling NAV -> Fucntions to be dynamically added for custom tab
		function showProcess(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a class="active">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a onclick="showFields()">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a onclick="showEvent()">Events</a><a onclick="showUsers()">Users</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';

			getProcessData();
		}
		function showMediaProfile(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a class="active">Media Profile</a> <a onclick="showFields()">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a onclick="showEvent()">Events</a><a onclick="showUsers()">Users</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';
			getMediaProfileData();
		}
		function showFields(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a class="active">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a onclick="showEvent()">Events</a><a onclick="showUsers()">Users</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a> <div id="field_main"></div>';
			
			getFieldsData();
		}
		function showAppConfig(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a onclick="showFields()">Fields</a> <a class="active">App Configuration</a> <a onclick="showEvent()">Events</a><a onclick="showUsers()">Users</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';
			getAppConfigData();
		}
		function showEvent(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a onclick="showFields()">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a class="active">Events</a><a onclick="showUsers()">Users</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';
			getEventData();
		}
		function showUsers(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a onclick="showFields()">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a onclick="showEvent()">Events</a> <a class="active">Users</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';
			getUsersData();
		}
		
		function doLogout(){
			alert('Unimplemented');
		}