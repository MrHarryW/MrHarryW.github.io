function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}


window.onscroll = function() {myFunction()};

var header = document.getElementById("headerDIV");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}