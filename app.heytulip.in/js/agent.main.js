var userDataGlobal;
var campaignDataGlobal;
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
			// console.log(userData);
			userDataGlobal = userData;
			getCampaign(userData);
		}catch(e){
			console.log(e);
		}
	}else{
		window.open("../");
	}
}

function getCampaign(userData){
	var urlParams = new URLSearchParams(window.location.search);
	var userId = urlParams.get('userId');
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

	fetch("http://api.heytulip.in/tuliprestapi/app/getCampaignByUser/?tc_id=1&user_id="+userId, requestOptions)
	  .then(response => response.json())
	  .then(result => {
	  	campaignDataGlobal = result;
	  	var campaignSideBarData = '';
	  	for(var i = 0; i<result.data.length; i++){
	  		campaignSideBarData = campaignSideBarData + "<a onclick='showCampaignInfo("+JSON.stringify(result.data[i])+","+JSON.stringify(result)+")'>"+result.data[i].campaign_name+"</a>";
	  	}
	  	document.getElementById('campaignbar').innerHTML = campaignSideBarData;
	  })
	  .catch(error => console.log('error', error));
}

function showCampaignInfo(selectedCampaignData, allCampaignData){
	var campaignSideBarData = '';
	for(var i = 0; i<allCampaignData.data.length; i++){
	  		if(allCampaignData.data[i].campaign_id == selectedCampaignData.campaign_id){
	  			campaignSideBarData = campaignSideBarData + "<a class='active'>"+allCampaignData.data[i].campaign_name+" ></a>";
	  			showCampaignData(selectedCampaignData)
	  		}else{
	  			campaignSideBarData = campaignSideBarData + "<a onclick='showCampaignInfo("+JSON.stringify(allCampaignData.data[i])+","+JSON.stringify(allCampaignData)+")'>"+allCampaignData.data[i].campaign_name+"</a>";
	  		}
	  		document.getElementById('sidebar').innerHTML = "<h3>HeyTulip</h3>   <a>"+ userDataGlobal.userName +"</a>   <span id='campaignbar'></span>   <a >Custom App 1</a>   <a >Custom App 2</a>   <a onclick=\"doLogout()\">Logout</a>";

	  		document.getElementById('campaignbar').innerHTML = campaignSideBarData;
	 }
}

function showCampaignData(campaignData){
	if(campaignData.type == 'ticket_application'){
		showTicketCampaign(campaignData);
	}else if(campaignData.type == 'chat_application'){
		showChatCampaign(campaignData);
	}else{
		showError();
	}
}

function showTicketCampaign(campaignData){
console.log(userDataGlobal)

	document.getElementById('content').innerHTML = "<span id='alert_box'></span><br /><div class='container px-4'><div class='row gx-5'> <div class='col'> <div class='form-floating mb-3'>   <input type='text' class='form-control' id='floatingInput'>   <label for='floatingInput'>Search</label> </div></div>  </div> </div> <br /> <div class='accordion' id='accordionTicket'>   <div class='accordion-item'>     <h2 class='accordion-header' id='headingOne'>       <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='false' aria-controls='collapseOne'>         Campaign Tickets       </button>     </h2>     <div id='collapseOne' class='accordion-collapse collapse' aria-labelledby='headingOne' data-bs-parent='#accordionTicket'>       <div class='accordion-body'> <span id='campaign_ticket'> <strong> > </strong> Loading Campaign Ticket(s) </span>  </div>     </div>   </div>   <div class='accordion-item'>     <h2 class='accordion-header' id='headingTwo'>       <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>         Assigned Tickets       </button>     </h2>     <div id='collapseTwo' class='accordion-collapse collapse' aria-labelledby='headingTwo' data-bs-parent='#accordionTicket'>       <span id='assigned_ticket'> <strong> > </strong> Loading Assigned Ticket(s) </span>     </div>   </div>   <div class='accordion-item'>     <h2 class='accordion-header' id='headingThree'>       <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#collapseThree' aria-expanded='false' aria-controls='collapseThree'>         "+userDataGlobal.userName+"'s Tasks       </button>     </h2>     <div id='collapseThree' class='accordion-collapse collapse' aria-labelledby='headingThree' data-bs-parent='#accordionTicket'>       <div class='accordion-body'>         <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.       </div>     </div>   </div> </div>";

	getCampaignTicketData(campaignData.campaign_id, userDataGlobal.tcId);
	getUserTicketData(userDataGlobal.userId, userDataGlobal.tcId);
}

async function getUserTicketData(userId, tcId){
	var userAssignedTicket = '<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Subject</th><th scope="col">Date Added</th><th scope="col">State</th><th scope="col">Date Modified</th> <th scope="col">Ticket ID</th><th>Account</th><th>Action</th></tr></thead><tbody>';
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};
	const assignedAPIResponse = await fetch("http://api.heytulip.in/tuliprestapi/app/ticket/getTicketsByUser/?tc_id="+tcId+"&user_id="+userId,requestOptions);
	const assignedTickets = await assignedAPIResponse.json();
	for(var i=0; i< assignedTickets.data.length; i++){
	  		if(assignedTickets.data[i].assigned_user_id == userDataGlobal.user_id){
	  			var j = i+1;
	  			const response2 = await fetch("http://api.heytulip.in/tuliprestapi/app/getCustomerInfo/?tc_id="+tcId+"&customer_email_id="+assignedTickets.data[i].customer_email, requestOptions);
	  			var customer_name = await response2.json();
	  			userAssignedTicket = userAssignedTicket + "<tr><th scope='row'>"+j+"</th><td>"+assignedTickets.data[i].subject+"</td><td>"+assignedTickets.data[i].date_added+"</td><td>"+assignedTickets.data[i].ticket_external_state+"</td><td>"+assignedTickets.data[i].last_updated+"</td><td>"+assignedTickets.data[i].id+"</td><td>"+customer_name.data[0].name+"</td><td><button type='button' class='btn btn-success'>View</button></td></tr>";
	  		}
	  	}
	document.getElementById("assigned_ticket").innerHTML = userAssignedTicket;
}

async function getCampaignTicketData(campaignId, tcId){
	var campaignUnassignedTicket = '<table class="table"><thead><tr><th scope="col">#</th><th scope="col">Subject</th><th scope="col">Date Added</th> <th scope="col">Ticket ID</th><th>Account</th><th>Action</th></tr></thead><tbody>';
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

	const response = await fetch("http://api.heytulip.in/tuliprestapi/app/ticket/getTicketsByCampaign/?tc_id="+tcId+"&campaign_id="+campaignId, requestOptions)
	var result = await response.json();
	  	for(var i=0; i< result.data.length; i++){
	  		if(result.data[i].assigned_user_id == userDataGlobal.user_id){
	  			var j = i+1;
	  			const response2 = await fetch("http://api.heytulip.in/tuliprestapi/app/getCustomerInfo/?tc_id="+tcId+"&customer_email_id="+result.data[i].customer_email, requestOptions);
	  			var customer_name = await response2.json();
	  			campaignUnassignedTicket = campaignUnassignedTicket + "<tr><th scope='row'>"+j+"</th><td>"+result.data[i].subject+"</td><td>"+result.data[i].date_added+"</td><td>"+result.data[i].id+"</td><td>"+customer_name.data[0].name+"</td><td><button type='button' class='btn btn-success'>Pick</button> <button type='button' class='btn btn-success'>View</button></td></tr>";
	  		}
	  	}
	  	document.getElementById("campaign_ticket").innerHTML = campaignUnassignedTicket;
}

function showChatCampaign(){
	document.getElementById('content').innerHTML = "<span id='alert_box'></span><p>Loding Chats...</p>";
}

function showError(){
	document.getElementById('content').innerHTML = "<span id='alert_box'></span><p>Error 102, please contact Tulip Support</p>";
}