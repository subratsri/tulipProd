<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>HeyTulip</title>
  <link href="css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <script type="text/javascript" src="js/aes.js"></script>
  <script type="text/javascript" src="./js/jquery.min.js"></script>
  <script type="text/javascript" src="js/bootstrap.bundle.min.js"></script> 
  <script type="text/javascript" src="js/jquery.min.js"></script>
  <script type="text/javascript" src="js/bootstrap.min.js"></script>
  <script src="js/main.js" type="text/javascript"></script>
</head>
<body>
  <div class="wrapper">
    <div id="formContent">
      <h2>Hey Tulip</h2>
      <!-- Icon -->
      <div class="fadeIn first">
        <img src="tulip-flower.svg" class="img-fluid" id="icon" alt="HeyTulip" />
      </div>

      <!-- Login Form -->
      <div>
        <input type="text" id="userId" class="fadeIn second" name="login" placeholder="User ID">
        <input type="password" id="password" class="fadeIn third" name="login" placeholder="Password">
        <div id='loginButton'>
            <button onclick="doLogin()" class="fadeIn fourth">Log In</button>
        </div>
      </div>
    </div>


  </div>

</body>
</html>