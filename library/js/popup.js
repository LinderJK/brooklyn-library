const authButton = document.querySelector('.auth-icon__link');
const authPopup = document.querySelector('.auth-popup');

authButton.addEventListener('click' , ()=>{
    if(authPopup.classList.contains('auth-popup--active')) {
        authPopup.classList.add('auth-popup--active');
    console.log('click');
    }
    else return;
})

document.addEventListener ('click', function(event) {
    if(event.target.closest('.auth-icon__link')) {
        return;
    }
    else {
        authPopup.classList.remove('auth-popup--active');
    }
})

authButton.addEventListener('click' , ()=>{
    authPopup.classList.toggle('auth-popup--active');
    console.log('click');
   

})


