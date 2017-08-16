<?php ?>


<script>


    $(function () {

        scrList.forEach(function (e, i) {
            console.log(e);
            $("#test").append("<img width='200px' src=\"" + e + "\">")
        });

        // 1. Initialize fotorama manually.
        var $fotoramaDiv = $('#test').fotorama();

        // 2. Get the API object.
        fotorama = $fotoramaDiv.data('fotorama');

        // 3. Inspect it in console.
        console.log(fotorama);
        a = true;

        //########### resize ###########

        function resizeFotorama(){
            var fotoramaHeight = window.innerHeight - $("header").height() - 69 ; // thumbs height
            fotorama.resize({
                height: fotoramaHeight
            });
        }

        resizeFotorama();

        $(window).resize(function () {
            console.log("dzialam");
            resizeFotorama();
        });


    });
</script>

<div id="private">
    <div id="test" class="fotorama" data-autoplay="3000"  data-loop="true" data-allowfullscreen="native" data-keyboard="true" data-nav="thumbs" data-width="100%">


    </div>

</div>


<script>




</script>