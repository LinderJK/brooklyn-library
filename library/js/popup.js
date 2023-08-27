const authButton = document.querySelector('.auth-icon__link');
const authPopup = document.querySelector('.auth-popup');

const loginButton= document.querySelector('#login');


const registerButton = document.querySelector('#register');

console.log(authButton);
console.log(login);
console.log(register);

authButton.addEventListener('click' , ()=>{
    authPopup.classList.toggle('auth-popup--active');
    console.log('click');
   

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


function goPop ()