function doLogin(){

	var loadingAnim = document.getElementById("loadingAnim");

	var password = document.getElementById('floatingPassword').value;
	var emailid = document.getElementById('floatingEmail').value;

	if(password && emailid){
		loadingAnim.style.display = "block";
		var settings = {
		  "url": "http://api.heytulip.in/licenseapi/tulipcustomerlogin/",
		  "method": "POST",
		  "timeout": 0,
		  "headers": {
		    "Content-Type": "application/x-www-form-urlencoded"
		  },
		  "data": {
		    "emailId": emailid,
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
	 				var nopassidAlert = document.getElementById("nopassidAlert");
	 				nopassidAlert.innerHTML = '<span class="alert alert-danger alert-dismissible fade show" role="alert" >Please Enter your correct Support Id and Password <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </span>';
					var loginAlert = document.getElementById("loginAlert");
					nopassidAlert.style.display = "block";
				 	loginAlert.style.display = "none";
			  	}
			});
		}catch(error){
			console.log('Error #001 ', error);
		}

	}else{
		var nopassidAlert = document.getElementById("nopassidAlert");
		nopassidAlert.innerHTML = '<span class="alert alert-danger alert-dismissible fade show" role="alert" >Please Enter your correct Support Id and Password <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> </span>';
		var loginAlert = document.getElementById("loginAlert");
		nopassidAlert.style.display = "block";
	 	loginAlert.style.display = "none";
	}
}

function onLoad(){
	 var loadingAnim = document.getElementById("loadingAnim");
	 var nopassidAlert = document.getElementById("nopassidAlert");
	 var errorAlert = document.getElementById("wrongEmailPass");
	 nopassidAlert.style.display = "none";
	 loadingAnim.style.display = "none";
	 errorAlert.style.display = "none";
}