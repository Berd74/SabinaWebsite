

function logoStart($JQelement, animation) {

    var $logo = $JQelement;
    var logoParent = $logo[0].parentElement;

    foo();

    function foo() {
        if (logoParent.offsetWidth < 610){
            $logo.css("width", logoParent.offsetWidth - 20);
        } else {

            $logo.css("width", "");
        }

        var logoHeight = $logo.height() / 2;
        var logoWidth = $logo.width() / 2;

        var logoLeft = logoParent.offsetWidth / 2 - logoWidth;
        var logoBottom = window.innerHeight / 2 - logoHeight;

        $logo.css("left", logoLeft);
        $logo.css("bottom", logoBottom);

    }

    $(window).on("resize.logo", foo);

    if (animation) {
        $logo.load("logo4.svg", function () {

            var letterArray = ["s", "s2", "a", "a2long", "f", "f2", "o", "o2", "o3", "t", "t2", "2o", "2o2", "2o3"];
            var elements = [];
            var lenghts = [];
            var times = [];
            var time = 2500; //2500

            letterArray.forEach(function (currentValue, index) {
                elements[index] = $logo.find("#" + currentValue + "");
                lenghts[index] = elements[index][0].getTotalLength();
                elements[index].css("stroke-dasharray", lenghts[index]);
                elements[index].css("stroke-dashoffset", lenghts[index]);
            });

            var sum = lenghts.reduce(add, 0);

            function add(a, b) {
                return a + b;
            }

            lenghts.forEach(function (currentValue, index) {
                times[index] = time * currentValue / sum;
            });

            var x = -1;

            setTimeout(animation, 250);
            setTimeout(animation2, 1900);

            function animation() {
                x++;
                if (x >= times.length) {
                    return
                }
                elements[x].animate({'stroke-dashoffset': 0}, times[x], "linear", function () {
                    animation()
                });
            }

            var heartElements = ["heart6", "heart5", "heart4", "heart3", "heart2", "heart1"];

            heartElements.forEach(function (currentValue, index) {
                heartElements[index] = $logo.find("#" + currentValue + "");
            });

            heartElements[0].prop('berdX', 15);
            heartElements[0].prop('berdY', -35);

            heartElements[1].prop('berdX', 40);
            heartElements[1].prop('berdY', -15);

            heartElements[2].prop('berdX', 25);
            heartElements[2].prop('berdY', 30);

            heartElements[3].prop('berdX', -15);
            heartElements[3].prop('berdY', 30);

            heartElements[4].prop('berdX', -40);
            heartElements[4].prop('berdY', 10);

            heartElements[5].prop('berdX', -15);
            heartElements[5].prop('berdY', -25);

            heartElements.forEach(function (element) {
                var a = "translate(" + element.prop('berdX') + "px," + element.prop('berdY') + "px)";
                element.css("transform", a);
            });

            function animation2() {
                heartElements.forEach(function (element) {
                    $(element).animate({
                        berdX: 0,
                        berdY: 0
                    }, {
                        duration: 600,
                        easing: 'swing',
                        step: function (now, tween) {
                            if (tween.prop == "berdX") {
                                $(this).prop('berdX', now);
                            } else {
                                $(this).prop('berdY', now);
                            }

                            var a = "translate(" + $(this).prop('berdX') + "px," + $(this).prop('berdY') + "px)";

                            $(this).css("transform", a);
                        }
                    });

                });
            }
        });
    } else {
        $logo.load("logo4.svg");
    }
}
