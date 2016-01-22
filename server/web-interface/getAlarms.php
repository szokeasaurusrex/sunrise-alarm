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
      if ($row["active"] === 0) {
        $active = false;
      } else {
        $active = true;
      }
      $alarms[] = array(
        "minute" => $row["minute"],
        "hour" => $row["hour"],
        "days" => $row["days"],
        "active" => $active
      );
    }
  } else {
    $alarms = "none";
  }
  echo json_encode($alarms);
?>
