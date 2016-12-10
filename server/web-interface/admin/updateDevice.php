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
  $device_name = $_POST["device"];
  $action = $_POST["action"];
  filter($device_name);

  if (authenticate($conn, $access_key) > 0) {
    if ($action = "approve") {
      $sql = $conn->prepare("UPDATE devices SET approved = 1 WHERE name = ?");
    } else if ($action = "delete") {
      $sql = $conn->prepare("DELETE FROM devices WHERE name = ?")
    }
    $sql->bind_param("s", $device_name);
    if ($sql->execute() === false) {
      $response = "SQL Error.";
    } else {
      $response = "OK";
    }
  } else {
    $response = "Error: Unable to authenticate";
  }

  echo $response;
?>
