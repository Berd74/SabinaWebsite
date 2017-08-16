

$(function () {


    function foo() {

        if($("#initialSlider").length != 0) {
            if(isMobile){
                $('.onePage').css({ height: window.outerHeight });
            } else {
                $('.onePage').css({ height: window.innerHeight });

            }
            if(detectIE()){
                setTimeout(function () {
                    if(isMobile){
                        $('.onePage').css({ height: window.outerHeight });
                    } else {
                        $('.onePage').css({ height: window.innerHeight });

                    }
                },1110);
            }
        }
    }
    $(window).on("resize", foo);

    var toggleWidth = 300;

    $("#buttonMenu").click(function (event) {
        event.stopPropagation();
        if (toggleWidth == 300){ toggleWidth = 0; } else { toggleWidth = 300; }
        console.log(toggleWidth);
        $( ".menuCover:nth-child(2)" ).stop(true).animate({
            bottom: toggleWidth
        }, 350);
    });

    $(".menuHideOnClick").on("click", function(){
        console.log(toggleWidth);

        if(toggleWidth != 300) {

            $(".menuCover:nth-child(2)").stop(true).animate({
                bottom: 300
            }, 350);
            toggleWidth = 300;
        }

    });

    $(window).on("click", function(){
        console.log(toggleWidth);

        if(toggleWidth != 300){

           $( ".menuCover:nth-child(2)" ).stop(true).animate({
               bottom: 300
           }, 350);
           toggleWidth = 300;

       }
    });


    $( ".menuCover").find("a").click(function () {

    });

    var hidden = false;

    var lastScrollTop = 0;
    $(window).on("scroll", function(){

        if(actualPage == "galeryIn.php") {return}

        if($("#initialSlider").length == 0) {
            var st = $(window).scrollTop();
            if (st != lastScrollTop){
                if (st >= lastScrollTop){
                    if (!hidden) {
                        $("header").stop(true).animate({
                            top: 0
                        }, 450);
                        hidden = true;
                    }
                } else {
                    if (hidden) {
                        $("header").stop(true).animate({
                            top: 52
                        }, 450);
                        hidden = false;
                    }
                }
                lastScrollTop = st;

            }
        }
    });
});