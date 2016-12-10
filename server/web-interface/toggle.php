<?php
  require "../authenticate.php";

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
    $light_status = exec("/home/dani/sunrise-alarm/server/python/toggle.py");
    $i = 0;
    $response = "OK";
    while (strpos($light_status, $new_status) === false) {
      if ($i > 2) {
        $response = "Could not toggle light.";
        break;
      }
      $light_status = exec("/home/dani/sunrise-alarm/server/python/toggle.py");
      $i += 1;
    }
  } else {
    $response = "unauthorized";
  }

  echo $response;
?>
