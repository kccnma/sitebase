document.addEventListener("DOMContentLoaded", function() {
  
  //TOGGLE MENU NAV VIA ADDING/REMOVING A DATA-ATTRIBUTE
  const menubutton = document.querySelector('.menu-button');
  const menunav = document.querySelector('.toggle-nav'); 
  menubutton.addEventListener('click', function() {
    if (menunav.getAttribute('data-navstate') === 'open') {
        menunav.setAttribute('data-navstate', 'closed');
    } else {
        menunav.setAttribute('data-navstate', 'open');
    }
  });

});
