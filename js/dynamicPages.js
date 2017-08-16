var actualPage;
a = false;

var scrList;
var boxIndex;
var galeryTitle;


// $(document).ajaxComplete(function() {
//     console.log("ajaxComplete");
//     switch(actualPage) {
//         case "initialSlider.php": slider(); break;
//         case "about.php": break;
//         case "contact.php": break;
//     }
    //berd();
    //if jaki kontent jest ladowany
// });

$(function() {

    actualPage = "initialSlider.php";
    $("main").load("initialSlider.php", {'isMobile': isMobile}, function () {
        $("header").css("top", 0);

        sliderStart();
        if(isMobile){
            $('.onePage').css({ height: window.outerHeight });

        } else {
            $('.onePage').css({ height: window.innerHeight });
        }
    });


    var logoTest = true;

    $("nav a").click(function(){

        console.log(isMobile);

        var clicked = $(this).attr('href');

        if (actualPage != clicked){

            if(a){
                fotorama.destroy();
                console.log("kkk");
                a = false;
            }
            $("main").css("display", "none");
            $("main").load(clicked, {'isMobile': isMobile}, function () {

                $("main").stop(true).fadeIn(400);

                if (clicked == "initialSlider.php" ) {

                    $("header").stop(true).animate({
                        top: 0
                    }, 450);
                    sliderStart();

                    if(isMobile){
                        $('.onePage').css({ height: window.outerHeight });

                    } else {
                        $('.onePage').css({ height: window.innerHeight });

                    }


                } else {
                    $('.onePage').css({ height: "" });
                    $("header").stop(true).animate({
                        top: 52
                    }, 450);
                    sliderStop();
                }
            });

        }
        actualPage = clicked;
        return false;
    });
});