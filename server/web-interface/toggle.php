<?php
  $new_status = $_REQUEST["new_status"];
  $light_status = exec("/home/dani/sunrise-alarm/server/python/toggle.py");
  $i = 0;
  $response = "OK";
  while (strpos($light_status, $new_status) === false) {
    if ($i > 2) {
      $response = "Could not toggle light.";
      break;
    }
    $light_status = exec("/home/dani/sunrise-alarm/server/python/toggle.py");
    $i += 1;
  }
  echo $response;
?>
