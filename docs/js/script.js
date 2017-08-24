document.addEventListener('DOMContentLoaded', function() {

    //TOGGLE MENU NAV
    var menubutton = document.getElementsByClassName("menu-button");
    var i;
    for (i = 0; i < menubutton.length; i++) {
        menubutton[i].onclick = function(){
            this.classList.toggle("expanded");
        }
    } 
})
