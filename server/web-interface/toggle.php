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

  $path = "/home/dani/sunrise-alarm/server/python/send.py";
  $access_key = $_POST["authkey"];

  if (authenticate($conn, $access_key) > 0) {
  $action = intval($_POST["action"]);
    exec("$path $action");
    $response = "OK";
  } else {
    $response = "unauthorized";
  }

  echo $response;
?>
