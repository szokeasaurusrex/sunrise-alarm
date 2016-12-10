<?php
  function authenticate($conn, $device_name, $password) {
    $sql = "SELECT * FROM devices WHERE name=$device_name";
    $device = $conn->query($sql)->fetch_assoc();
    if ($device.approved && password_verify($password, $device.hash)) {
      return true;
    } else {
      return false;
    }
  }
?>
