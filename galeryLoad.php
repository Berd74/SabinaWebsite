<?php
$boxIndex = $_POST['boxIndex'] + 2;
$files = scandir("folderSabiny/galeriaPubliczna2");
$files2 = scandir("folderSabiny/galeriaPubliczna2/" . $files[$boxIndex]);

for ($i=0; $i<count($files2); $i++) {
    if (($files2[$i] == ".")||($files2[$i] == "..")||($files2[$i] == "ustawienia")){
        continue;
    }
    echo "folderSabiny/galeriaPubliczna2/" . $files[$boxIndex] . "/" . $files2[$i] . "\n";
}
?>
