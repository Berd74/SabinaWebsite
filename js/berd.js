function berd() {

    //for small images
    // var mouseParallax = document.getElementsByClassName("mouseParallaxContainer");
    // Array.prototype.forEach.call(mouseParallax, function (element) {
    //
    //     var movingElement = element.getElementsByClassName("mouseParallaxEffect")[0];
    //     var finalOffsetX = 0;
    //     var finalOffsetY = 0;
    //     var slowedOffsetX = 0;
    //     var slowedOffsetY = 0;
    //     var loop;
    //     var end = true;
    //
    //     movingElement.style.position = "relative";
    //
    //     element.onmousemove = function (event) {
    //         var elementHeight = element.offsetHeight;
    //         var elementWidth = element.offsetWidth;
    //         var maxOffsetX = 50;
    //         var maxOffsetY = 50; //wartosc przesuniecia obrazka (ile obrazka wystaje, im wieszka tym szybkosc animacji zwieksza sie)
    //         finalOffsetY = maxOffsetY * (event.pageY - (elementHeight / 2 + element.offsetTop)) / elementHeight;
    //         finalOffsetX = maxOffsetX * (event.pageX - (elementWidth / 2 + element.offsetLeft)) / elementWidth;
    //
    //     };
    //     element.onmouseover = function () {
    //         clearInterval(loop);
    //         end = false;
    //         start()
    //     };
    //     element.onmouseout = function () {
    //         end = true;
    //     };
    //     function start() {
    //         var a = 1;
    //         loop = setInterval(function () {
    //
    //             slowedOffsetX += (finalOffsetX - slowedOffsetX) / 14;
    //             slowedOffsetY += (finalOffsetY - slowedOffsetY) / 14; // spowolnienie, dynamika (daje wygladzone przejscie, zmniejszenie zwieksza szybkosc animacji)
    //             movingElement.style.left = slowedOffsetX + "px";
    //             movingElement.style.top = slowedOffsetY + "px";
    //
    //             if (end){
    //
    //                 if (finalOffsetX < 0){
    //                     finalOffsetX += a;
    //                     if (finalOffsetX > 0) finalOffsetX = 0;
    //                 } else if (finalOffsetX > 0){
    //                     finalOffsetX -= a;
    //                     if (finalOffsetX < 0) finalOffsetX = 0;
    //                 }
    //                 if (finalOffsetY < 0){
    //                     finalOffsetY += a;
    //                     if (finalOffsetY > 0) finalOffsetY = 0;
    //                 } else if (finalOffsetY > 0){
    //                     finalOffsetY -= a;
    //                     if (finalOffsetY < 0) finalOffsetY = 0;
    //                 }
    //                 a += 0.1; // powrót (daje wygladzone przejscie, zwiekszenie zwieksza szybkosc animacji przy outmouse)
    //
    //                 if(Math.abs(slowedOffsetY) < 0.2 && Math.abs(slowedOffsetX) < 0.2) {
    //                     movingElement.style.left = 0;
    //                     movingElement.style.top = 0;
    //                     clearInterval(loop)
    //                 }
    //             }
    //         }, 15); // powtarzalnosc akcji (zmniejszenie zwieksza szybkosc animacji)
    //     }
    // });

    var imageCenteringArray = document.getElementsByClassName("imageCentering");
    Array.prototype.forEach.call(imageCenteringArray, function (element){ imageCentering(element)});
    function imageCentering(element){
        var imgArray = element.getElementsByTagName("img");
        Array.prototype.forEach.call(imgArray, function (img) {
            img.style.position = "absolute";

            function foo(){
                var imgRatio = img.naturalWidth / img.naturalHeight;
                var elementRatio = element.offsetWidth / element.offsetHeight;
                if (imgRatio < elementRatio){
                    img.style.height = "auto";
                    img.style.width = element.offsetWidth + "px";
                } else {
                    img.style.height = element.offsetHeight + "px";
                    img.style.width = element.offsetHeight * imgRatio + "px";
                }
            }
            foo();
            window.addEventListener('resize', function() {
                foo();
            });

        });


    }
}
