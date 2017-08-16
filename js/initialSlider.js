function sliderLoadAndStart(){

    var activeSlideIndex = -1;
    var clickDetected = false;
    var changeSlideTest = true;
    var firstSlide = true;
    var changeSlideTask;
    var loopSliderTimeout;
    var slideFade = 600;
    var slideTime = 1200;


    if(typeof(sliderImagesElements) == 'undefined') {

        sliderImagesElements = [];
        var sliderElement = $("#initialSlider");
        var loadedImageIndex = 0;

        sliderImagesLinks.forEach(function (imageLink, index) {
            var image = new Image();
            image.style.display = "none";
            sliderImagesElements[index] = image;
            sliderElement.append(image);
        });

        loadImages();

        function loadImages() {
            sliderImagesElements[loadedImageIndex].onload = function () {
                berd();
                loadedImageIndex++;
                if (sliderImagesLinks.length > loadedImageIndex){ loadImages() }
            };
            sliderImagesElements[loadedImageIndex].src = sliderImagesLinks[loadedImageIndex];
        }
        loopSliderLoading();
    } else {
        loopSliderLoading();
    }

    function loopSliderLoading() {
        var loop = setInterval(function () {
            console.log(activeSlideIndex);
            if (sliderImagesElements[activeSlideIndex + 1].complete) {
                clearInterval(loop);

                if (!clickDetected) {
                    changeSlide();

                    if (activeSlideIndex >= sliderImagesLinks.length - 1) {
                        console.log("WYKONALEM SIE :d");
                        loopSlider();
                    } else {
                        setTimeout(function () {
                            loopSliderLoading();
                        }, slideTime);
                    }
                }
            }
        }, 50);
    }

    function loopSlider(longer) {
        var delay;
        if (longer){
            delay = 2000;
        } else {
            delay = 0;
        }
        foo();
        function foo() {
            loopSliderTimeout = setTimeout(function () {
                changeSlide();
                foo();
            }, slideTime + delay);
            delay = 0;

        }
    }

    $(window).keydown(function (event) {

        function buttonChangeSlide(imageIndex) {
            clickDetected = true;
            if (imageIndex !== activeSlideIndex) {
                clearTimeout(changeSlideTask);
            }
            clearTimeout(loopSliderTimeout);
            loopSlider(true);
            changeSlide(imageIndex);
        }

        if (changeSlideTest) {
            switch (event.key) {
                case "1":
                    buttonChangeSlide(0);
                    break;
                case "2":
                    buttonChangeSlide(1);
                    break;
                case "3":
                    buttonChangeSlide(2);
                    break;
            }
        }
    });

    var firstSlideDelay = true;

    function changeSlide(newSlideIndex) {

        var consolelog = activeSlideIndex;

        if (!firstSlide) {
            if (newSlideIndex === activeSlideIndex) {return}
            changeSlideTest = false;
            console.log(false);

            var oldSlide = $(sliderImagesElements[activeSlideIndex]);

            oldSlide.css("z-index", "1");
            changeSlideTask = setTimeout(function () {
                oldSlide.css("display", "none");
                changeSlideTest = true;
                console.log(true)
            }, slideFade + 25);

            if (typeof newSlideIndex === 'undefined') {
                activeSlideIndex++;
            } else {
                activeSlideIndex = newSlideIndex
            }
        } else {
            activeSlideIndex = 0;
            firstSlide = false;
        }


        if (activeSlideIndex > sliderImagesLinks.length - 1) {
            activeSlideIndex = 0;
        }

        var newSlide = $(sliderImagesElements[activeSlideIndex]);

        newSlide.css("display", "none");
        newSlide.css("z-index", "10");
        newSlide.fadeIn(slideFade, function () {
            console.log("wykonalem sie");

            if(!firstSlideDelay){
                firstSlideDelay = false;
                console.log("wykonalem sie");
                logo()
            }
        });

        console.log("Zmiana sladu #" + consolelog + " na #" + activeSlideIndex);
    }
}


