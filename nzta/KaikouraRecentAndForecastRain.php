<?Php
$file_url = 'https://www.dropbox.com/s/gy87l0y9jk06tk6/KaikouraRecentAndForecastRain.csv?dl=1';
echo "<html><body><table border=1>\n\n";
$f = fopen($file_url, "r");
while (($line = fgetcsv($f)) !== false) {
        echo "<tr>";
        foreach ($line as $cell) {
                echo "<td>" . htmlspecialchars($cell) . "</td>";
        }
        echo "<tr>\n";
}
fclose($f);
echo "\n</table></body></html>";
?>
