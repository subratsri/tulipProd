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
		function addUserAssignedTable(campaignId){
			var tag = '#exampleAssigned'+campaignId;
			var table = $(tag).DataTable({
		      'data': [ [ "1", "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ], [ "2", "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ]],
		      'columnDefs': [{
		         'targets': 0,
		         'searchable': false,
		         'orderable': false,
		         'className': 'dt-body-center',
		         'render': function (data, type, full, meta){
		             return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
		         }
		      }],
		      'order': [[1, 'asc']]
		   });

		   // Handle click on "Select all" control
		   $(tag+'-select-all').on('click', function(){
		      // Get all rows with search applied
		      var rows = table.rows({ 'search': 'applied' }).nodes();
		      // Check/uncheck checkboxes for all rows in the table
		      $('input[type="checkbox"]', rows).prop('checked', this.checked);
		   });

		   // Handle click on checkbox to set state of "Select all" control
		   $(tag+' tbody').on('change', 'input[type="checkbox"]', function(){
		      // If checkbox is not checked
		      if(!this.checked){
		         var el = $('#exampleAssigned-select-all').get(0);
		         // If "Select all" control is checked and has 'indeterminate' property
		         if(el && el.checked && ('indeterminate' in el)){
		            // Set visual state of "Select all" control
		            // as 'indeterminate'
		            el.indeterminate = true;
		         }
		      }
		   });

		   // Handle form submission event
		   $('#frm-exampleAssigned'+campaignId).on('submit', function(e){
		      var form = this;

		      // Iterate over all checkboxes in the table
		      table.$('input[type="checkbox"]').each(function(){
		         // If checkbox doesn't exist in DOM
		         if(!$.contains(document, this)){
		            // If checkbox is checked
		            if(this.checked){
		               // Create a hidden element
		               $(form).append(
		                  $('<input>')
		                     .attr('type', 'hidden')
		                     .attr('name', this.name)
		                     .val(this.value)
		               );
		            }
		         }
		      });
		   });
		}
		function addUserTable(campaignId){
			addUserAssignedTable(campaignId);
			var tag = '#example'+campaignId;
			var table = $(tag).DataTable({
		      'data': [ [ "1", "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ], [ "2", "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ]],
		      'columnDefs': [{
		         'targets': 0,
		         'searchable': false,
		         'orderable': false,
		         'className': 'dt-body-center',
		         'render': function (data, type, full, meta){
		             return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
		         }
		      }],
		      'order': [[1, 'asc']]
		   });

		   // Handle click on "Select all" control
		   $(tag+'-select-all').on('click', function(){
		      // Get all rows with search applied
		      var rows = table.rows({ 'search': 'applied' }).nodes();
		      // Check/uncheck checkboxes for all rows in the table
		      $('input[type="checkbox"]', rows).prop('checked', this.checked);
		   });

		   // Handle click on checkbox to set state of "Select all" control
		   $(tag+' tbody').on('change', 'input[type="checkbox"]', function(){
		      // If checkbox is not checked
		      if(!this.checked){
		         var el = $('#example-select-all').get(0);
		         // If "Select all" control is checked and has 'indeterminate' property
		         if(el && el.checked && ('indeterminate' in el)){
		            // Set visual state of "Select all" control
		            // as 'indeterminate'
		            el.indeterminate = true;
		         }
		      }
		   });

		   // Handle form submission event
		   $('#frm-example'+campaignId).on('submit', function(e){
		      var form = this;

		      // Iterate over all checkboxes in the table
		      table.$('input[type="checkbox"]').each(function(){
		         // If checkbox doesn't exist in DOM
		         if(!$.contains(document, this)){
		            // If checkbox is checked
		            if(this.checked){
		               // Create a hidden element
		               $(form).append(
		                  $('<input>')
		                     .attr('type', 'hidden')
		                     .attr('name', this.name)
		                     .val(this.value)
		               );
		            }
		         }
		      });
		   });
		}
		function getCampaignUser(campaignId){
			var tag = 'campaign_user'+campaignId;
			var userAllData = '<div style="width:48%;float:left;"><h3>Available</h3><button> > </button><br /><table id="example'+campaignId+'" class="display select" cellspacing="0" width="100%"> <thead> <tr> <th><input type="checkbox" name="select_all" value="1" id="example'+campaignId+'-select-all"></th> <th>ID</th> <th>Name</th> </tr> </thead></table></div>';
			var userAssignedData = '<div style="width:48%;float:right;"><h3>Assigned</h3><button> < </button><br /><table id="exampleAssigned'+campaignId+'" class="display select" cellspacing="0" width="100%"> <thead> <tr> <th><input type="checkbox" name="select_all" value="2" id="exampleAssigned'+campaignId+'-select-all"></th> <th>ID</th> <th>Name</th> </tr> </thead></table></div>';
			// var midbar = '<div ><button> > </button><br /><button> < </button></div>';
			document.getElementById(tag).innerHTML=userAllData+userAssignedData;
			addUserTable(campaignId);
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
			  	 	console.log(result.data);
			  	 	var campaignData = '<div class="accordion accordion-flush" id="accordionMain">';
			  	 	for(var i=0;i<result.data.length;i++){
			  	 		campaignData = campaignData+'<div class="accordion-item"> <h2 class="accordion-header" id="heading'+i+'"> <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCampaign'+i+'" aria-expanded="true" aria-controls="collapseCampaign'+i+'"><br /><i>'+result.data[i].name+'</i> </button> </h2> <div id="collapseCampaign'+i+'" class="accordion-collapse collapse" aria-labelledby="heading"'+i+' data-bs-parent="#accordionMain"><br /><div class="accordion-body"><b>Campaign ID</b>  '+result.data[i].id+' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Type</b> <i>'+result.data[i].type+'</i> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<b>Theme ID </b>'+result.data[i].theme_id+'<br /><br />History URL <input type="text" id="preview'+result.data[i].id+'" value="'+result.data[i].preview_url+'"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Customer URL <input type="text" id="customer'+result.data[i].id+'"  value="'+result.data[i].customer_url+'"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dispose URL <input type="text" id="dispose'+result.data[i].id+'" value="'+result.data[i].dispose_url+'"/> <br /><br /><p> <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUser'+result.data[i].id+'" aria-expanded="false" aria-controls="collapseUser'+result.data[i].id+'"> &nbsp;&nbsp;Users&nbsp;&nbsp; </button> </p> <div class="collapse" id="collapseUser'+result.data[i].id+'"> <div class="card card-body"><span id="campaign_user'+result.data[i].id+'"></span></div> </div><br /><button type="button" class="btn btn-primary" onclick="updateData('+result.data[i].id+','+processId+')">Update</button></div> </div> </div>';
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