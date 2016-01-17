<?php
  function filter(&$value) {
    $value = htmlspecialchars($value);
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

  $post_data = $_POST;
  array_walk_recursive($post_data, "filter")
  if ($post_data["type"] == "toggle") {
    
  }
?>
