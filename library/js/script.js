const navbarTogglerButton = document.querySelector('.navbar-toggler');    
const navListToggler = document.querySelector('.nav__list');


navbarTogglerButton.addEventListener('click', function () {
        navbarTogglerButton.classList.toggle('navbar-toggler--active');
        navListToggler.classList.toggle('nav__list--active');
    })

document.addEventListener ('click', function(event) {
    if(event.target.closest('.navbar-toggler')) {
        return;
    }
    else {
        navbarTogglerButton.classList.remove('navbar-toggler--active');
        navListToggler.classList.remove('nav__list--active');
    }


})

