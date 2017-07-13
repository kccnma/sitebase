document.addEventListener('DOMContentLoaded', function() {

    //TOGGLE MENU NAV
    var menu = document.getElementsByClassName("menu");
    var i;
    for (i = 0; i < menu.length; i++) {
        menu[i].onclick = function(){
            this.classList.toggle("expanded");
        }
    }

})
