document.addEventListener("DOMContentLoaded", function () {

    //STICKY NAV LINKS TOGGLE MENU NAV
    var stickynavlinks = document.querySelectorAll(".sticky nav a");
    var j;
    for (j = 0; j < stickynavlinks.length; j++) {
        stickynavlinks[j].onclick = function () {
            var stickymenu = document.querySelectorAll(".sticky .menu-button");
            var k;
            for (k = 0; k < stickymenu.length; k++) {
                stickymenu[k].classList.remove("expanded");
            }
        };
    }
});