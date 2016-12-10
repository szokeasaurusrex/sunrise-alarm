<?php
  function authenticate($conn, $device_name, $password) {
    $sql = $conn->prepare("SELECT * FROM devices WHERE name = ?");
    $sql = $conn->bind_param("s", $device_name);
    $sql->execute();
    $device = $sql->get_result()->fetch_assoc();
    if ($device["approved"] && password_verify($password, $device["hash"])) {
      return true;
    } else {
      return false;
    }
  }
?>
