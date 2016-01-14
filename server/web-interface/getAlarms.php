<?php
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

  $sql = "SELECT * FROM alarms;";
  $result = $conn->query($sql);
  $alarms = array();
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
      $alarms[] = $row;
    }
  }
  echo json_encode($alarms);
?>
