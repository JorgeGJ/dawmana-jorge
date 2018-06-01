let efectoCartel = function () {
    setTimeout(function () {
        $("#cartel img").show("fold", 2000, function () {
            $("#cartel").delay(3000).hide("slide", 2000, function () {
                $("#contenidoPrincipalPadre").show("slide", 1000);
            });
        });
    }, 200);
};
$(function () {
    efectoCartel();
});
