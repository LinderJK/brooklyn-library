const authButton = document.querySelector('.auth-icon__link');
const authPopup = document.querySelector('.popup-auth');


// authButton.addEventListener('click' , ()=>{
//     if(authPopup.classList.contains('popup-active')) {
//         authPopup.classList.add('popup-active');
//         console.log('click');
//     }
//     else return;
// })

document.addEventListener ('click', function(event) {
    if(event.target.closest('.auth-icon__link')) {
        return;
    }
    else {
        authPopup.classList.remove('popup-active');
    }
})

authButton.addEventListener('click' , ()=>{
    authPopup.classList.toggle('popup-active');
    console.log('click');
   

})

//fix
const profileButton = document.querySelector('.profile-icon__link');
const profilePopup = document.querySelector('.popup-profile');


// profileButton.addEventListener('click' , ()=>{
//     if(profilePopup.classList.contains('popup-active')) {
//         profilePopup.classList.remove('popup-active');
//     console.log('click', profilePopup, profileButton);
//     }
//     else return;
// })

document.addEventListener ('click', function(event) {
    if(event.target.closest('.profile-icon__link')) {
        return;
    }
    else {
        profilePopup.classList.remove('popup-active');
    }
})

profileButton.addEventListener('click' , ()=>{
    profilePopup.classList.toggle('popup-active');
    console.log('click');
   

})



