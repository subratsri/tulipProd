var userDataGlobal = '';
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
		function setProcessTable(){
			$(function(){
				$("#process-table").dataTable({
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
					console.log(userData);
					userDataGlobal = userData;
					showProcess();
				}catch(e){
					console.log(e);
				}
			}else{
				window.open("../");
			}
		}

		//Show all data on UI 
		function showProcessData(data){
			// document.getElementById('content').innerHTML = "<p>Process</p>";
			// var fieldData = '<table id="process-table" data-page-length="10"><thead><tr><th>Process Name</th><th>Field Name</th><th>Propogate Customer</th><th>CRM URL</th></tr></thead><tbody>';
			// var tableData = "";
			// var length = Object.keys(JSON.parse(data).data).length;
			// data = JSON.parse(data);
			// console.log(length);
			// for(var i =0; i<length; i++){
			// 	tableData = tableData+'<tr><td>'+data.data[i].name+'</td><td>'+data.data[i].field_name+'</td><td>'+data.data[i].propagate_customer+'</td><td>'+data.data[i].crm_url+'</td></tr>';
			// }

			// tableData = tableData+'</tbody></table>';
			// fieldData = fieldData + tableData;
			// document.getElementById('content').innerHTML = fieldData;
			// setProcessTable();
			
			var length = Object.keys(JSON.parse(data).data).length;
			data = JSON.parse(data);
			console.log(length);
			var processData = '<br /><br />';
			var ddData = '';
			for(var i=0; i< length;i++){
			processData = processData+'<p><button class="btn btn-primary" type="button" data-bs-toggle="collapse"'+i+' data-bs-target="#collapse'+i+'" aria-expanded="false" aria-controls="collapseExample">'+data.data[i].name+'</button></p><div class="collapse" id="collapse'+i+'"><div class="card card-body">'+data.data[i]+'</div></div><br />';
			}
			document.getElementById('content').innerHTML = processData;

		}
		
		function showMediaProfileData(data){
			document.getElementById('content').innerHTML = "<p>Media Profile</p>";
		}

		function showFieldsData(data){
			var fieldData = '<table id="field-table" data-page-length="10"><thead><tr><th>Field Name</th><th>Field</th></tr></thead><tbody>';
			var tableData = "";
			var length = Object.keys(JSON.parse(data).data).length;
			data = JSON.parse(data);
			console.log(length);
			for(var i =0; i<length; i++){
				tableData = tableData+'<tr><td>'+data.data[i].name+'</td><td>'+JSON.stringify(data.data[i].field_json)+'</td></tr>';
			}

			tableData = tableData+'</tbody></table>';
			fieldData = fieldData + tableData;
			document.getElementById('content').innerHTML = fieldData;
			setFieldTable();

		}

		function showAppConfigData(data){
			document.getElementById('content').innerHTML = "<p>App Configuration</p>";
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
			  	console.log(result);
			  	showProcessData(result);
			  })
			  .catch(error => console.log('error', error));
			
		}
		function getMediaProfileData(){
			var data = '{"test2":"test2"}';
			showMediaProfileData(data);
		}
		function getFieldsData(){
			// console.log();
			var requestOptions = {
			  method: 'GET',
			  redirect: 'follow'
			};

			fetch("http://api.heytulip.in/tuliprestapi/app/getField/?tc_id="+userDataGlobal.tcId, requestOptions)
			  .then(response => response.text())
			  .then(result => {
			  	console.log(result);
				showFieldsData(result);
			  })
			  .catch(error => console.log('error', error));

		}
		function getAppConfigData(){
			var data = '{"test3":"test3"}';
			showAppConfigData(data);
		}



		//Fucntion for handling NAV -> Fucntions to be dynamically added for custom tab
		function showProcess(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a class="active">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a onclick="showFields()">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a onclick="showEvent()">Events</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';

			getProcessData();
		}
		function showMediaProfile(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a class="active">Media Profile</a> <a onclick="showFields()">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a onclick="showEvent()">Events</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';
			getMediaProfileData();
		}
		function showFields(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a class="active">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a onclick="showEvent()">Events</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a> <div id="field_main"></div>';
			
			getFieldsData();
		}
		function showAppConfig(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a onclick="showFields()">Fields</a> <a class="active">App Configuration</a> <a onclick="showEvent()">Events</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';
			getAppConfigData();
		}
		function showEvent(){
			document.getElementById('sidebar').innerHTML = '<h3>HeyTulip</h3> <a onclick="showProcess()">Process</a> <a onclick="showMediaProfile()">Media Profile</a> <a onclick="showFields()">Fields</a> <a onclick="showAppConfig()">App Configuration</a> <a class="active">Events</a> <a >Custom App 1</a> <a >Custom App 2</a> <a >Custom App 3</a> <a >Custom App 4</a> <a onclick="doLogout()">Logout</a>';
		}
		function doLogout(){
			alert('Unimplemented');
		}