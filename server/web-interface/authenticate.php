<?php
  function filter(&$value) {
    $value = htmlspecialchars($value);
  }

  // returns 1 if authorized, 0 if not, -1 if device not found
  function authenticate($conn, $access_key) {
    $device_name = $access_key["name"];
    $password = $access_key["key"];
    filter($device_name);
    $sql = $conn->prepare("SELECT * FROM devices WHERE name = ?");
    $sql->bind_param("s", $device_name);
    $sql->execute();
    $result = $sql->get_result();
    if ($result->num_rows == 1) {
      $device = $result->fetch_assoc();
      if (password_verify($password, $device["hash"])) {
        return $device["approved"];
      } else {
        return 0;
      }
    } else {
      return -1;
    }
  }
?>
