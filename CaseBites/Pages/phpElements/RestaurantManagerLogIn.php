<?php
require '../vendor/autoload.php'; // include Composer's autoloader
use MongoDB\Client;
use MongoDB\Driver\ServerApi;

$firstname = $_POST['username'];
$password = $_POST['password'];


$uri = 'mongodb+srv://<AdminUser>:qlVhFC18cw6t5ThQ@casebites.rejmzyj.mongodb.net/test';
$apiVersion = new ServerApi(ServerApi::V1);

$client = new MongoDB\Client($uri, [], ['serverApi' => $apiVersion]);

//$db = $client->test;
/*//$mypassword = mysqli_real_escape_string($db,$_POST['password']);

//$sql = "SELECT id,emailID,password FROM LogInInfo";
// WHERE emailID = '$myusername' and password = '$mypassword'";
//$result = $conn->query($sql);
//   $result = mysqli_query($db,$sql);
//   $row = mysqli_fetch_array($result,MYSQLI_ASSOC);
//   $active = $row['active'];

//$count = mysqli_num_rows($result);

/*if($_SERVER["REQUEST_METHOD"] == "POST") {
   // username and password sent from form
   // If result matched $myusername and $mypassword, table row must be 1 row


   if ($result->num_rows > 0) {
       // output data of each row
       while($row = $result->fetch_assoc()) {
           echo "<br> id: ". $row["id"]. " - Name: ". $row["emailID"]. " " . $row["password"] . "<br>";
       }
   } else {
       echo "0 results";
   }
}

/*
  if($count == 1) {
      session_register("myusername");
      $_SESSION['login_user'] = $myusername;

      header("location: restaurantWelcome.php");

   }else {
      $error = "Your Login Name or Password is invalid";
      echo($count);
    //  echo($error);
*/
//$client = new MongoDB\Client($uri, [], ['serverApi' => $apiVersion]);
//Check if either username or password are empty input fields
if(empty($firstname) or empty($password))
{
  //insert an alert box that takes user back to log in page
  echo "<script>if(confirm('Please reenter username and password, they can not be left empty')){document.location.href='../RestaurantManager.html'};</script>";
}
else {
}

//Now import data from MongoDB
   ?>
