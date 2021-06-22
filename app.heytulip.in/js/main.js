function doLogin(){
	var userId = document.getElementById("userId").value;
	var password = document.getElementById("password").value;
	if(userId && password){

	document.getElementById("loginButton").innerHTML = '<br /><span  id="spinner" ><div class="spinner-border text-dark" style=" width: 66px; height: 66px; " role="status"><span class="visually-hidden">Loading...</span></div></span><br />';
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
				// alert(JSON.parse(response));
				alert(response.result);
			  	if(response != 0){
					// var userData = JSON.parse(response);
					userData = response;
					response = JSON.stringify(response);
					alert(userData);
			  	  	var encrypted = CryptoJS.AES.encrypt(response, userId);
			  	  	encrypted = encodeURIComponent(encrypted);
			  	  	// alert(encrypted);
			  	  	if(userData.userRole == 'Administrator'){
			  	  	  	window.open("administrator/?userId="+userId+"&data="+encrypted,"_self");
			  	  	}else if(userData.userRole == 'Supervisor'){
			  	  		window.open("supervisor/?userId="+userId+"&data="+encrypted,"_self");
			  	  	}else if(userData.userRole == 'Agent'){
			  	  		window.open("agent/?userId="+userId+"&data="+encrypted,"_self");
			  	  	}else{
			  	  		if(userData.reason == 'wrong_password'){
			  	  			alert('Please check you ID and Password');
			  	  			document.getElementById('spinner').innerHTML = '<button onclick="doLogin()" class="fadeIn">Log In</button>';
			  	  		}
			  	  	}
			  	}else{
	 				alert("Error");
			  	}
			});
		}catch(error){
			console.log('Error #001 ', error);
		}

	}else{
		alert("failed");
	}
}