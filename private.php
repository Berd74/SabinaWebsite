<?php ?>
<?php ?>
<div id="galery">

    <h1>PRYWATNE</h1>
    <div class="galleryFlex">

        <?php
        $files = scandir("folderSabiny/galeriaPrywatna");
        $number = 0;

        foreach ($files as $fileName) {

            if (($fileName == ".")||($fileName == "..")){
                continue;
            }



            $file = fopen("folderSabiny/galeriaPrywatna/".$fileName."/ustawienia/ustawienia.txt", "r");
            $x = 0;
            $info = array_fill_keys(array('tytul', 'linia1', 'linia2'), '');

            while(! feof($file))
            {
                $data = explode(":", fgets($file));

                if(count($data) == 2){

                    $info[(string)$data[0]] = $data[1];
                }

            }

            fclose($file);

            $img = 'folderSabiny/galeriaPrywatna/'.$fileName.'/ustawienia/miniaturka.jpg';

            printf("<a id=\"%s\" class=\"galleryCover\">", $number);
            printf("<div class=\"description\">");
            printf("<span class=\"title\">%s</span>",$info["tytul"]);
            printf("<span class=\"info\">%s<br>%s</span>",$info["linia1"],$info["linia2"]);
            printf("</div>");
            printf("<div class=\"imageCover\">");
            printf('<img src="%s">',$img);
            printf("</div>");
            printf("</a>");
            $number++;
        }


        ?>

        <div class="flexHelper"></div>
        <div class="flexHelper"></div>
        <div class="flexHelper"></div>

    </div>
</div>

<script>
    var scrList;
    var boxIndex;
    var galeryTitle;

    $(function () {
        setTimeout(function() {
            var a = $("#galery").find("img");

            a.each(function () {
                this.onload = function () {
                    imageCentering2($(this));
                };
                if($(this).prop('complete')){
                    imageCentering2($(this));
                }
            });


            function imageCentering(img) {
                var element = img.parentElement;
                var imgRatio = img.naturalWidth / img.naturalHeight;
                var elementRatio = element.offsetWidth / element.offsetHeight;

                if (imgRatio < elementRatio) {
                    img.style.height = "auto";
                    img.style.width = element.offsetWidth + "px";
                    img.style.right = 0 + "px";
                    img.style.bottom = (element.offsetHeight - img.clientHeight) / 2 + "px";
                } else {
                    img.style.height = element.offsetHeight + "px";
                    img.style.width = element.offsetHeight * imgRatio + "px";
                    img.style.bottom = 0 + "px";
                    img.style.right = (element.offsetWidth - img.clientWidth) / 2 + "px";
                }
            }

            function imageCentering2(img) {

                var logoParent = img.parent();
                var imgRatio = img[0].naturalWidth / img[0].naturalHeight;
                var elementRatio = logoParent.width() / logoParent.height();

                if (imgRatio < elementRatio) {
                    console.log(img.height());
                    img.css("height", "auto");
                    img.css("width", logoParent.width());
                    img.css("left", 0);

                    var imgHeight = img.height() / 2;
                    var logoBottom = logoParent.height() / 2 - imgHeight;
                    console.log(logoBottom);

                    img.css("bottom", -logoBottom);
                } else {
                    img.css("height", logoParent.height());
                    img.css("width", "auto");
                    img.css("bottom", 0);
                    var imgWidth = img.width() / 2;
                    var logoLeft = logoParent.width() / 2 - imgWidth;



                    img.css("left", logoLeft);
                }

                // TO DODAC JAKO ON LOAD PRZED WSTAWIENIEM OBRAZKA

                // ##################### END #####################

            }

        }, 50);


        $(".galleryCover").click(function(){
            //                actualPage = "galeryIn.php";
            galeryTitle = $(this).find(".title").text();
            boxIndex = $(this).attr("id");
            boxIndex = parseInt(boxIndex);
            console.log(boxIndex);
            console.log(galeryTitle);
            $("#titlePrivateGalery").text(galeryTitle);
            $("#passwordBackground").css("display", "flex").hide().fadeIn(400);

            //                $.post("galeryLoad.php", {'boxIndex' : boxIndex},
            //                    function(data){
            //                        scrList = data.split(/\n/);
            //                        scrList.pop();
            //
            //                        $("header").stop(true).animate({
            //                            top: 52
            //                        }, 450);
            //
            //                        $("main").load("galeryIn.php");
            //                    });
        });
    });



</script>