<?php
  function authenticate($conn, $device_name, $password) {
    $sql = $conn->prepare("SELECT * FROM devices WHERE name = ?");
    $sql->bind_param("s", $device_name);
    $sql->execute();
    $result = $sql->get_result();
    if ($result->num_rows == 1) {
      $device = $result->fetch_assoc();
      if ($device["approved"] && password_verify($password, $device["hash"])) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
?>
