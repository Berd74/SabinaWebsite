var mainLoopTimer;
var loadLoopTimer;
var activeSlideIndex = -1;

function sliderStop() {
    $(window).off("resize.slider");
    $(window).off("resize.logo");
    $(window).off("keydown.slider");
    activeSlideIndex = -1;
    clearTimeout(mainLoopTimer);
    clearTimeout(loadLoopTimer);
    clearTimeout(testLoopImageLoaded);
}

function sliderStart() {

    var slideFade = 750; //750
    var slideTime = 1500 + slideFade; //3000

    var clickDetected = false;
    var firstSlide = true;
    var underImage = $("#underImage")[0];
    var $initialSlider = $("#initialSlider");
    var $circleCointainer = $("#circleCointainer");
    var circles = [];

    var changeSlideTestIE = true;
    var changeSlideTimerIE;

    //creating circles
    for (var x = 0; x < sliderImagesLinks.length; x++){
        $circleCointainer.append("<div class='circle'></div>");
        var $circle = $(".circle:last-child");
        $circle.append("<svg  viewBox='0 0 20 20'>" +
            "<path class='unloaded1' d='M20,10c0,5.5-4.5,10-10,10S0,15.5,0,10S4.5,0,10,0C15.4,0,20,4.5,20,10z'/>" +
            "<path class='unloaded2' d='M17.9,10c0,4.4-3.6,7.9-7.9,7.9S2.1,14.4,2.1,10S5.5,2.1,10,2.1S17.9,5.6,17.9,10z'/>" +
            "<path class='cros' d='M4,6c-0.8,1.1-1.2,2.5-1.2,4c0,1.5,0.5,2.9,1.2,4l4-4L4,6z'/>" +
            "<path class='cros' d='M10,8l4-4c-1.1-0.8-2.5-1.2-4-1.2C8.5,2.8,7.1,3.2,6,4L10,8z'/>" +
            "<path class='cros' d='M10,12l-4,4c1.1,0.8,2.5,1.2,4,1.2c1.5,0,2.9-0.4,4-1.2L10,12z'/>" +
            "<path class='cros' d='M12,10l4,4c0.8-1.2,1.2-2.5,1.2-4c0-1.5-0.5-2.9-1.2-4L12,10z'/>" +
            "</svg>");
        circles.push($circle);
    }

    //checking sliderImagesElements
    if (typeof(sliderImagesElements) == 'undefined' || sliderImagesLinks.length != sliderImagesElements.length) { // If not in cache or if update
        sliderImagesElements = [];
        sliderImagesLinks.forEach(function (imageLink, index) {
            var image = new Image();
            image.style.display = "none";
            sliderImagesElements[index] = image;
            $initialSlider.append(image);
        });
    } else {
        sliderImagesElements.forEach(function (imageEle) {
            $initialSlider.append(imageEle);
            imageEle.style.display = "none";
            imageEle.style.zIndex = "1";
        });
    }

    var loadedImageIndex = 0;

    loadingImagesProces();
    function loadingImagesProces() {
        sliderImagesElements[loadedImageIndex].src = "";
        sliderImagesElements[loadedImageIndex].onload = function () {
            circles[loadedImageIndex].find(".unloaded1").attr( "class", "unactive1");
            circles[loadedImageIndex].find(".unloaded2").attr( "class", "unactive2");
            circles[loadedImageIndex].find(".cros").attr( "class", "uncross");

            imageCentering(this);
            loadedImageIndex++;
            if (sliderImagesLinks.length > loadedImageIndex) {
                loadingImagesProces()
            }
        };
        sliderImagesElements[loadedImageIndex].src = sliderImagesLinks[loadedImageIndex];
    }

    //prepering HTML part2 (circle), (number of images is defined)
    var numberOfImages = sliderImagesElements.length;

    //centering for circles
    $circleCointainer[0].style.right = ($circleCointainer[0].parentElement.offsetWidth - $circleCointainer[0].clientWidth) / 2 + "px";

    function changeCircle(circleIndex, longerTest){
        var delay;
        if (longerTest) { delay = 2000;} else { delay = 0; }

        $circleCointainer.find(".active1").attr( "class", "unactive1");
        $circleCointainer.find(".active2").attr( "class", "unactive2");

        var $circle = circles[circleIndex];
        try {
            $circle.find(".unactive1").attr("class", "active1");
            $circle.find(".unactive2").attr("class", "active2");
        } catch(err) {
        }
    }

    if (detectIE() != false){
        logoStart($("#logoSabina"),false)
    }

    firstLoop();
    function firstLoop() {
        testLoopImageLoaded = setInterval(function () {

            if (!clickDetected) {
                if (sliderImagesElements[activeSlideIndex + 1].complete) {
                    clearInterval(testLoopImageLoaded);
                    changeSlide();
                    changeCircle(activeSlideIndex);

                    if (activeSlideIndex >= numberOfImages - 1) { // if all images are loaded
                        mainLoop();
                    } else {
                        loadLoopTimer = setTimeout(function () {
                            firstLoop();
                        }, slideTime);
                    }
                }
            } else {
                clearInterval(testLoopImageLoaded);
            }
        }, 50);
    }

    function mainLoop(longerTest) {
        var delay;
        if (longerTest) { delay = 2000;} else { delay = 0; }

        changeSlideRun();

        function changeSlideRun() {
            mainLoopTimer = setTimeout(function () {
                changeSlide();
                changeCircle(activeSlideIndex);
                changeSlideRun();
            }, slideTime + delay);
            delay = 0;
        }
    }

    //pre slide change
    function changeSlideEventsCancel(imageIndex) {

        if (detectIE() > 0 || (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1)) {

            var imageIndexCopy = imageIndex;

            if (imageIndexCopy > numberOfImages - 1) {
                imageIndexCopy = 0;
            } else if (imageIndexCopy < 0) {
                imageIndexCopy = numberOfImages - 1;
            }
            if ($(sliderImagesElements[imageIndexCopy]).queue().length > 0) { /////// na cofaniu nie dziala !!!
                changeSlideTestIE = true;
                clearTimeout(changeSlideTimerIE);
            }

            if (changeSlideTestIE) {

                clickDetected = true;
                clearTimeout(mainLoopTimer);
                mainLoop(true);
                changeSlide(imageIndex);
                changeCircle(activeSlideIndex, true);


            }
        } else {

            clickDetected = true;
            clearTimeout(mainLoopTimer);
            mainLoop(true);
            changeSlide(imageIndex);
            changeCircle(activeSlideIndex, true);

        }
    }

    //main slide change ###### Dodac kiedy nie jest zaladowany ma pomijac ######
    function changeSlide(newSlideIndex) {

        if (firstSlide && detectIE() == false){
            logoStart($("#logoSabina"),true);
            firstSlide = false;
        }

        if (newSlideIndex === activeSlideIndex) { // If you chose the same slide
            return
        }

        changeSlideTestIE = false;
        changeSlideTimerIE = setTimeout(function () {
            changeSlideTestIE = true;
        }, slideFade + 20);

        if (activeSlideIndex != -1) {   // If it is NOT first slide.
            var oldSlide = $(sliderImagesElements[activeSlideIndex]);
            imageCentering(oldSlide[0]);
            if(detectIE() > 0) {
                oldSlide.stop(true).fadeOut(slideFade);
            } else {
                oldSlide.stop(true).fadeOut(slideFade);
            }
        } else {

        }

        var attempt = 0;
        var activeSlideIndexCopy = activeSlideIndex;

        do {
            if (typeof newSlideIndex === "undefined") { // If number of silde is undefinded
                activeSlideIndex++;
            } else {
                activeSlideIndex = newSlideIndex;
            }

            if (activeSlideIndex > numberOfImages - 1) { // Prevent crossing the border of image array
                activeSlideIndex = 0;
            }
            else if (activeSlideIndex < 0) {
                activeSlideIndex = numberOfImages - 1;
            }
            newSlideIndex = undefined;
            attempt++;
            if (attempt > numberOfImages * 2) {activeSlideIndex = activeSlideIndexCopy; return}
        } while (!sliderImagesElements[activeSlideIndex].complete || sliderImagesElements[activeSlideIndex].src == "");

        $.each(sliderImagesElements, function (index, value) { // index -1 for every image
            var zIndex = $(value).css("z-index");
            if (zIndex > 1) {
                $(value).css("z-index", zIndex - 1)
            }
        });


        var $newSlide = $(sliderImagesElements[activeSlideIndex]);

        // if ($newSlide.queue().length > 0) { // Prevent hard transition // EEEE tu jest powtórzenie ...

            $newSlide.stop().fadeIn(slideFade).queue(function () {
                $(this).css("z-index", "6");
                underImage.src = this.src;
                imageCentering(underImage);
                $(this).dequeue();
            });
            imageCentering($newSlide[0]);

        // } else {

        //     $newSlide.stop().fadeIn(slideFade).queue(function () {
        //         $newSlide.css("z-index", "6");
        //         underImage.src = this.src;
        //         imageCentering(underImage);
        //         $(this).dequeue();
        //     });
        //     imageCentering($newSlide[0]);
        // }
    }

    //Centering (when resize and change slide)
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

    function resizeCentering() {
        Array.prototype.forEach.call(sliderImagesElements, function (img) {
            imageCentering(img);
            imageCentering(underImage);
            $circleCointainer[0].style.right = ($circleCointainer[0].parentElement.offsetWidth - $circleCointainer[0].clientWidth) / 2 + "px";
        });
    }
    $(window).on("resize.slider", resizeCentering);

    $(window).on("keydown.slider", function(event) {
        switch (event.which) {
            case 49:
                changeSlideEventsCancel(activeSlideIndex - 1);
                break;
            case 50:
                changeSlideEventsCancel(1);
                break;
            case 51:
                changeSlideEventsCancel(Math.round(Math.random() * 15));
                break;
            case 52:
                changeSlideEventsCancel(activeSlideIndex + 1);
                break;
        }
    });

    //Event click for circles
    circles.forEach(function (ele, index) {
        ele.click(function () {
            ///////////####################### if unactive return
            if (ele.find(".unloaded1").length == 0) {
                changeSlideEventsCancel(index);
            }
        });
    });
}