/**
 * Created by Bartek on 15/08/2017.
 */
$(function() {
    var warring = $("#incorrectPassword").children("span");


    $("#goButton").click(function(){
        var password = $("#pass").val();
        console.log(password);

        $.post("privateLoad.php", {'boxIndex': boxIndex, 'password': password},
            function (data) {
                console.log(data);
                if (data == "false") {
                    warring.text("Nieprawidłowe hasło.");
                    warring.fadeIn("fast");
                } else if (data == "nullfalse") {
                    warring.text("Hasło nie zostało utworzone.");
                    warring.fadeIn("fast");
                } else {
                    closePasswordDiv();

                    scrList = data.split(/\n/);
                    scrList.pop();

                    $("header").stop(true).animate({
                        top: 52
                    }, 450);

                    $("main").load("privateIn.php");
                }
//                     closePasswordDiv();
//                     console.log(data);
//                     scrList = data.split(/\n/);
//                     console.log(scrList);
//
//                     scrList.pop();
//                     console.log(scrList);
//
//                     scrList.sort((function(a, b){
//                         console.log(a,b);
//                         var a2 = a.lastIndexOf("\\");
//                         var b2 = b.lastIndexOf("\\");
//                         a = a.slice(a2, a.length);
//                         b = b.slice(b2, b.length);
//                         console.log(a,b);
//
//                         a = a.replace(/\D/g,'');
//                         b = b.replace(/\D/g,'');
//                         console.log(a,b);
//
//                         return a-b
//                     });
//                     console.log(scrList);
//
// //                        $("main").load("galeryPrivateIn.php");
//                 }
            });

    });

    $("button#backButton").click(function () {
        closePasswordDiv();
    });
    // coverPasswordDiv.click(function () {
    //     closePasswordDiv();
    // });
    function closePasswordDiv() {
        $("#passwordBackground").fadeOut(200);
        setTimeout(function () {
            $("#pass").val("");
            warring.css("display", "none");
        }, 200);
    }

});