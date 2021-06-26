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