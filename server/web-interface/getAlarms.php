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

  $access_key = $_POST;

  $alarms = array();

  if (authenticate($conn, $access_key) > 0)  {
    $sql = "SELECT * FROM alarms;";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
      while($row = $result->fetch_assoc()) {
        $days = unserialize($row["days"]);
        if ($row["active"] == 0) {
          $active = false;
        } else {
          $active = true;
        }
        $alarms[] = array(
          "minute" => $row["minute"],
          "hour" => $row["hour"],
          "days" => $days,
          "active" => $active,
<<<<<<< HEAD
          "dimtime" => $row["dimtime"]
=======
          "dimtime" => $row["dimtime"];
>>>>>>> 76aa390079d085f3597f2e25854ea92e48f13dab
        );
      }
    }
  }

  echo json_encode($alarms);
?>
