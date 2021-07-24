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
			console.log(userData);
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
	  		campaignSideBarData = campaignSideBarData + "<a onclick='showCampaignInfo("+result.data[i].campaign_id+")'>"+result.data[i].campaign_name+"</a>";
	  	}
	  	document.getElementById('campaignbar').innerHTML = campaignSideBarData;
	  })
	  .catch(error => console.log('error', error));
}

function showCampaignInfo(campaignId){
	alert(campaignId)
}