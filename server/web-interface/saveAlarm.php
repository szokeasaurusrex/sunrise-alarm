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

  $success = true;
  $post_data = $_POST;
  array_walk_recursive($post_data, "filter");
  $edit_type = $post_data["type"];
  $alarm = $post_data["alarm"];
  $old_alarm = $alarm["old_alarm"];

  if ($edit_type == "toggle") {
    $active = (int) $alarm["active"];
    $days = serialize($alarm["days"]);
    $sql = "UPDATE alarms
      SET active = $active
      WHERE hour = $alarm[hour] AND minute = $alarm[minute] AND days = $days";
    if ($conn->query($sql) === false) {
      $success = "Error36 " . $conn->error;
    }
  } else if ($edit_type == "edit" or $edit_type == "delete") {
    $old_days = serialize($old_alarm["days"]);
    $sql = "DELETE FROM alarms
      WHERE hour = $old_alarm[hour] AND minute = $old_alarm[minute] AND days = $old_days";
    $conn->query($sql);
    if ($edit_type == "edit") {
      $days = serialize($alarm["days"]);
      $active = (int) $alarm["active"];
      $sql = "INSERT INTO alarms
        VALUES (
          $alarm[hour],
          $alarm[minute],
          $alarm[start_hour],
          $alarm[start_minute],
          $days,
          $active)";
      if ($conn->query($sql) === false) {
        $success = "Error55 " . $conn->error;
      }
    }
  }
  exec("crontab -r");
  $alarm_path = "/home/dani/sunrise-alarm/server/python/alarm.py";
  $sql = "SELECT * FROM alarms";
  $result = $conn->query($sql);
  if ($result->num_rows > 0) {
    $crontab = "";
    while ($row = $result->fetch_assoc()) {
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
      $crontab .= "$alarm[start_minute] $alarm[start_hour] * * $days_string $alarm_path\n";
    }
    file_put_contents("/tmp/crontab", $crontab);
    exec("crontab /tmp/crontab");
  }
  echo (string) $success;
?>
