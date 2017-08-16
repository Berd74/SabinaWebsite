<?php

$boxIndex = $_POST['boxIndex'] + 2;
$passwordIn = $_POST['password'];

$files = scandir("folderSabiny/galeriaPrywatna");


$file = fopen("folderSabiny/galeriaPrywatna/" . $files[$boxIndex] . "/ustawienia/ustawienia.txt", "r");
$x = 0;
$password = null;

while(! feof($file))
{
    $line = fgets($file);
    if (strpos($line, 'haslo') !== false) {
        $data = explode(":", $line);
        if(count($data) == 2){
            $password = $data[1];
        }
    }

}

if ($password == null){
    echo 'null';
}

if ($passwordIn == $password && $password != null){
    $files2 = scandir("folderSabiny/galeriaPrywatna/" . $files[$boxIndex]);

    for ($i=0; $i<count($files2); $i++) {
        if (($files2[$i] == ".")||($files2[$i] == "..")||($files2[$i] == "ustawienia")){
            continue;
        }
        echo "folderSabiny/galeriaPrywatna/" . $files[$boxIndex] . "/" . $files2[$i] . "\n";
    }
} else {
    echo "false";
}
?>