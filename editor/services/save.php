<?php
  $data = file_get_contents('php://input');
  $data = json_decode($data, true);
  //file_put_contents("blub.jpg", $data["img-data"]);

  $f = fopen("blub.jpg", 'wb');
  fwrite($f, base64_decode(explode(',', $data["img-data"])[1]));
  fclose($f);
?>
