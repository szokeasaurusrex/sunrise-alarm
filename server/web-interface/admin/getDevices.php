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

  $access_key = $_POST;

  $device_info = array();

  if ($access_key["key"] == "") {
    $device_name = $access_key["name"];
    filter($device_name);
    $bytes = openssl_random_pseudo_bytes(64, $cstrong);
    if ($cstrong == false) {
      $msg = "Error generating key. Not cryptographically secure.";
    } else if ($bytes == false) {
      $msg = "Error generating key.";
    } else {
      $sql = $conn->prepare("SELECT * FROM devices WHERE name = ?");
      $sql->bind_param("s", $device_name);
      $sql->execute();
      $result = $sql->get_result();
      if ($result->num_rows == 0) {
        $key = bin2hex($bytes);
        $hash = password_hash($key, PASSWORD_DEFAULT);
        $sql = $conn->prepare("INSERT INTO devices VALUES (?, ?, ?)");
        $sql->bind_param("ssi", $device_name, $hash, $a = 0);
        $sql->execute();
        $device_info = array(
          "name" => $device_name,
          "key" => $key
        );
        $msg = "newdevice";
      } else {
        $msg = "duplicatename";
      }
    }
  } else {
    $authorization = authenticate($conn, $access_key);
    if ($authorization > 0) {
      $sql = "SELECT * FROM devices";
      $result = $conn->query($sql);
      while ($row = $result->fetch_assoc()) {
        $device_info[] = array(
          "name" => $row["name"],
          "authorized" => $row["approved"]
        );
      }
      $msg = "OK";
    } else if ($authorization < 0) {
      $msg = "nodevice";
    } else {
      $msg = "unauthorized";
    }
  }

  $response = array(
    "msg" => $msg,
    "device_info" => $device_info
  );

  echo json_encode($response);
?>
