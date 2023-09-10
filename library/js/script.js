const navbarTogglerButton = document.querySelector('.navbar-toggler');
const navListToggler = document.querySelector('.nav__list');


navbarTogglerButton.addEventListener('click', function () {
  navbarTogglerButton.classList.toggle('navbar-toggler--active');
  navListToggler.classList.toggle('nav__list--active');
})

document.addEventListener('click', function (event) {
  if (event.target.closest('.navbar-toggler')) {
    return;
  } else {
    navbarTogglerButton.classList.remove('navbar-toggler--active');
    navListToggler.classList.remove('nav__list--active');
  }


})

const favoritesBlock = document.querySelector('.favorites');
const radioBlock = document.querySelector('.radio-button-block');

window.addEventListener('scroll', function () {
  const favoritesRect = favoritesBlock.getBoundingClientRect();

  if (favoritesRect.top <= 0) {
    radioBlock.classList.add('radio-button-block--sticky');
  } else {
    radioBlock.classList.remove('radio-button-block--sticky');
  }

  if (favoritesRect.bottom <= 0 && radioBlock.classList.contains('radio-button-block--sticky')) {
    radioBlock.classList.remove('radio-button-block--sticky');
  }

});
