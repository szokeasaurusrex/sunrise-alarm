<?php
  require "authenticate.php";

  $servername = "localhost";
  $username = "sunrise_alarm";
  $password = "";
  $dbName = "sunrise_alarm";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbName);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $access_key = $_POST["authkey"];

  if (authenticate($conn, $access_key) > 0) {
  $new_status = $_POST["new_status"];
    if ($new_status == "on") {
      $light_status = exec("/home/dani/sunrise-alarm/server/python/sendrecieve.py 500");
    } else {
      $light_status = exec("/home/dani/sunrise-alarm/server/python/sendrecieve.py -500");
    }
    if ($new_status == $light_status) {
      $response = "OK";
    } else {
      $response = "Could not toggle";
    }
  } else {
    $response = "unauthorized";
  }

  echo $response;
?>
