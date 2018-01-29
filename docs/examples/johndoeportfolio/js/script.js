document.addEventListener('DOMContentLoaded', function() {

    //TOGGLE MENU NAV
    var menu = document.getElementsByClassName("menu");
    var i;
    for (i = 0; i < menu.length; i++) {
        menu[i].onclick = function(){
            this.classList.toggle("expanded");
        }
    }

    //FIXED NAV LINKS TOGGLE MENU NAV
    var fixednavlinks = document.querySelectorAll(".fixed nav a");
    var j;
    for (j = 0; j < fixednavlinks.length; j++) {
        fixednavlinks[j].onclick = function(){
        	var fixedmenu = document.querySelectorAll(".fixed .menu");
        	var k;
		    for (k = 0; k < fixedmenu.length; k++) {
		        fixedmenu[k].classList.remove("expanded");
		    }
        }
    }

})
