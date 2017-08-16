<?php ?>

<div id="initialSlider" class="imageCentering">
    <img id="underImage" src="">
</div>
<div id="logoSabina"></div>
<div id="circleCointainer"></div>

<script>
    sliderImagesLinks = [];
    <?php
    $isMobile = $_POST['isMobile'];
    $sliderImagesLinks = [];
    echo "console.log(".$isMobile.");";
    if ($isMobile){
        $sliderImagesLinks = glob('folderSabiny/stronaGlowna/poziome/*.{jpg,jpge,png}', GLOB_BRACE);

    } else {
        $sliderImagesLinks = glob('folderSabiny/stronaGlowna/poziome/*.{jpg,jpge,png}', GLOB_BRACE);

    }
    foreach ($sliderImagesLinks as $key => $value) {
        echo "sliderImagesLinks[" . $key . "]='" . $value . "';", "\n";
        if (count($sliderImagesLinks) > $key + 1){
            echo "\t";
        }
    }
    ?>
</script>
