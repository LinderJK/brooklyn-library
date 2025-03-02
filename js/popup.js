const authButton = document.querySelector('.auth-icon__link');
const authPopup = document.querySelector('.popup-auth');


document.addEventListener('click', function (event) {
  if (event.target.closest('.auth-icon__link')) {
    return;
  } else {
    authPopup.classList.remove('popup-active');
  }
})

authButton.addEventListener('click', () => {
  authPopup.classList.toggle('popup-active');

})

const profileButton = document.querySelector('.profile-icon__link');
const profilePopup = document.querySelector('.popup-profile');


document.addEventListener('click', function (event) {
  if (event.target.closest('.profile-icon__link')) {
    return;
  } else {
    profilePopup.classList.remove('popup-active');
  }
})

profileButton.addEventListener('click', () => {
  profilePopup.classList.toggle('popup-active');

})
