<?php
  function filter(&$value) {
    $value = htmlspecialchars($value);
  }
  function toInt(&$value) {
    $value = (int) $value;
  }

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

  $success = "OK";
  $post_data = $_POST;
  $edit_type = $post_data["type"];
  filter($edit_type);
  $alarm = (array) json_decode($post_data["alarm"]);
  $old_alarm = (array) $alarm["old_alarm"];
  unset($alarm["old_alarm"]);
  array_walk_recursive($alarm, "toInt");
  array_walk_recursive($old_alarm, "toInt");

  if ($edit_type == "toggle") {
    $active = (int) $alarm["active"];
    $days = serialize($alarm["days"]);
    $sql = $conn->prepare("UPDATE alarms
      SET active = ?
      WHERE hour = ? AND minute = ? AND days = ?");
    $sql->bind_param("iiis", $active, $alarm[hour], $alarm[minute], $days);
    $sql->execute();
  } else if ($edit_type == "edit" or $edit_type == "delete") {
    $old_days = serialize($old_alarm["days"]);
    $sql = $conn->prepare("DELETE FROM alarms
      WHERE hour = ? AND minute = ? AND days = ?");
    $sql->bind_param("iis", $old_alarm[hour], $old_alarm[minute], $old_alarm[days]);
    $sql->execute();
    if ($edit_type == "edit") {
      $days = serialize($alarm["days"]);
      $active = (int) $alarm["active"];
      $sql = $conn->prepare("INSERT INTO alarms
        VALUES (?, ?, ?, ?, ?, ?)");
      $sql->bind_param("iiiisi", $alarm[hour], $alarm[minute], $alarm[start_hour],
        $alarm[start_minute], $days, $active);
      $sql->execute();
    }
  }
  exec("crontab -r");
  $alarm_path = "/var/www/scripts/alarm.py";
  $sql = "SELECT * FROM alarms";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $crontab = "";
    while ($row = $result->fetch_assoc()) {
      if ($row["active"]){
        $days = unserialize($row["days"]);
        array_walk($row, "toInt");
        array_walk($days, "toInt");
        $days_string = "";
        for ($i = 0; $i < count($days); $i++) {
          $days_string .= (string) $days[$i];
          if ($i + 1 < count($days)) {
            $days_string .= ",";
          }
        }
        $crontab .= "$row[start_minute] $row[start_hour] * * $days_string $alarm_path" . PHP_EOL;
      }
    }
    file_put_contents("/tmp/crontab", $crontab);
    exec("crontab /tmp/crontab");
  }
  echo $success;
?>
