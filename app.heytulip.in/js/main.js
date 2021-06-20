function doLogin(){
	var userId = document.getElementById("userId").value;
	var password = document.getElementById("password").value;
	if(userId && password){

	document.getElementById("loginButton").innerHTML = '<br /><div class="spinner-border text-dark" style=" width: 66px; height: 66px; " role="status"><span class="visually-hidden">Loading...</span></div><br />';
		var settings = {
		  "url": "http://api.heytulip.in/tuliprestapi/app/login/",
		  "method": "POST",
		  "timeout": 0,
		  "headers": {
		    "Content-Type": "application/x-www-form-urlencoded"
		  },
		  "data": {
		    "userId": userId,
		    "password": password
		  }
		};

		try{
			$.ajax(settings).done(function (response) {
		  	loadingAnim.style.display = "none";
			  	if(response != 0){
			  	  	var encrypted = CryptoJS.AES.encrypt(response, emailid);
			  	  	encrypted = encodeURIComponent(encrypted);
			  	  	// alert(encrypted);
			  	  	if(emailid){
			  	  	  	window.open("premiumsupport/?emailid="+emailid+"&response="+encrypted,"_self");
			  	  	}
			  	}else{
	 				alert("failed");
			  	}
			});
		}catch(error){
			console.log('Error #001 ', error);
		}

	}else{
		alert("failed");
	}
}