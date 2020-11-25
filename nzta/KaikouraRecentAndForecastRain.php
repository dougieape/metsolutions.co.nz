<?php
$file_url = 'https://f002.backblazeb2.com/file/KaikouraTARP/KaikouraRecentAndForecastRain.csv';
header('Content-Type: application/octet-stream');
header("Content-Transfer-Encoding: Binary"); 
header("Content-disposition: attachment; filename=\"" . basename($file_url) . "\""); 
readfile($file_url);
exit();
?>