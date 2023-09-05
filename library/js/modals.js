const modalLinks = document.querySelectorAll('a.modal-link');
// console.log(modalLinks);

const modalButton = document.querySelectorAll('button.modal-link');
console.log('miodal button ', modalButton);

modalButton.forEach ((elem)=> {
  elem.addEventListener('click', (evt)=> {
    const modalName = elem.getAttribute('name');
    const currentModal = document.getElementById(modalName);
    modalOpen(currentModal);
    evt.preventDefault();
  })
})


for (let index = 0; index < modalLinks.length; index++) {
  const link = modalLinks[index];
  link.addEventListener('click', (evt) => {
    const modalName = link.getAttribute('href').replace('#', '');
    const currentModal = document.getElementById(modalName);
    modalOpen(currentModal);
    evt.preventDefault();
  })

}

const modalCloseButtons = document.querySelectorAll('.modal__close-button')
// console.log(modalCloseButtons);
for (let index = 0; index < modalCloseButtons.length; index++) {
  const button = modalCloseButtons[index];
  button.addEventListener('click', (evt) => {
    const thisModal = button.closest('.modal');
    console.log(thisModal);
    modalClose(thisModal);
    evt.preventDefault();
  })

}

function modalOpen(modal) {

  const active = document.querySelector('.modal--active');
  console.log(active);
  if (active) {
    modalClose(active);
  } else {
    disableScroll();
  }

  modal.classList.add('modal--active');
  modal.addEventListener('click', (evt) => {
    if (!evt.target.closest('.modal__body')) {
      modalClose(evt.target.closest('.modal'));
    }
  })
  disableScroll();

}


function modalClose(modal) {
  modal.classList.remove('modal--active');
  enableScroll()
}


function disableScroll() {
  document.body.style.overflowY = 'hidden';
  document.documentElement.style.overflowY = 'hidden';
  document.body.style.paddingRight = '15px';
}

function enableScroll() {
  document.body.style.overflowY = '';
  document.documentElement.style.overflowY = '';
  document.body.style.paddingRight = '';
}


//
const buyBookButton = document.querySelectorAll('.book__button button');
console.log(buyBookButton);

buyBookButton.forEach((button) => {
  
  button.addEventListener('click', (evt)=>{
    if (loggedInUser === undefined) {
      modalOpen(document.getElementById('login-modal'));
    }
    else if (loggedInUser.abonement === false) {
      modalOpen(document.getElementById('abonement-modal'));
      buyAbonement();
    }
    else if (loggedInUser.abonement === true) {
      addBooks(button);
    }
    
    
  })
})





