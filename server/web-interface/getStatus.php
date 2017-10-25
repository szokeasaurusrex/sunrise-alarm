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

  $path = "/home/pi/web/sunrise-alarm/server/python/sendrecieve.py";

  $access_key = $_POST;

  if (authenticate($conn, $access_key) > 0) {
    echo shell_exec("$path i");
  } else {
    echo "unauthorized";
  }
?>
