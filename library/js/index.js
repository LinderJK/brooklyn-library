//Конструктор пользователя
class User {
  constructor({
    email,
    firstName,
    lastName,
    password,
    bonus = 0,
    books = [],
    visits = 0,
    cardNumber = 0,
    isLoggedIn = true,
    abonement = false,
    paymentInfo = {
      payNumber: null,
      expirationCodeOne:null,
      expirationCodeTwo:null,
      CVC: null,
      cardholderName: null,
      postalCode: null,
      cityTown: null,
    },
  }) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password
    this.visits = visits;
    this.bonus = bonus;
    this.books = books;
    this.cardNumber = cardNumber;
    this.isLoggedIn = isLoggedIn;
    this.abonement = abonement;
    this.paymentInfo = paymentInfo;

    if (!cardNumber) {
      this.cardNumber = this.createCard();
    }
    else {
      this.cardNumber = cardNumber;
    }
    

  }

  //метод обновления страницы при входе
  login() {
    this.updateIcon();
    this.iconFullName();
    this.updatePopupProfile();
    this.isLoggedIn = true;
    this.visits ++;
    this.updateProfileInfo();

  }

  //счетчик посещений  FIX!
  // newVisit() {
  //   this.visits++;
  //   console.log(this.visits);
  //   const userIndex = users.findIndex(user => user.email === this.email);
  //   if (userIndex !== -1) {
  //     users[userIndex].visits = this.visits;
  //     localSet(users);
  //   }

  // }

  
  iconFullName() {
    const profileLink = document.querySelector('.profile-icon__link');
    const fullName = this.firstName + ' ' + this.lastName;
    profileLink.setAttribute('title', fullName);
  }

  updatePopupProfile() {
    const popupText = document.querySelector('.popup-profile p b');
    popupText.textContent = this.cardNumber;
  }

  createCard() {
    const min = 100000000;
    const max = 999999999;
    let cardNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    cardNumber = cardNumber.toString(16).toUpperCase();
    return cardNumber;
  }

  updateIcon() {
    const symbol = (this.firstName[0] + this.lastName[0]).toUpperCase();
    const svgCurrentUser = document.querySelector('.user-svg');
    const authLink = document.querySelector('.auth-icon__link');
    const profileLink = document.querySelector('.profile-icon__link');


    authLink.classList.add('auth-icon__link-hide');
    profileLink.classList.add('profile-icon__link-active');

    let text = svgCurrentUser.querySelector('text');
    text.textContent = `${symbol}`;

  }

  updateProfileInfo () {
    const visits = document.querySelector('.visits');
    visits.textContent = this.visits;
    const bonus = document.querySelector('.bonus');
    bonus.textContent = this.bonus;
    console.log(visits);
    const name = document.querySelector('.profile__name p');
    name.textContent = this.firstName + ' ' + this.lastName;
    const svg = document.querySelector('.profile__avatar .user-svg text');
    svg.textContent = (this.firstName[0] + this.lastName[0]).toUpperCase();
    const cardNumber = document.querySelector('.card-number div');
    cardNumber.textContent = this.cardNumber;



    console.log(cardNumber);

    console.log(this.books);

    



  }
  
}

const users = userList();
console.log('это users', users);

//забираем даннные из локал и преобразуем в экземпляр класса
function userList() {
  const userDataList = JSON.parse(localStorage.getItem('users')) || [];
  return  userDataList.map(userData => {
    return new User(userData);
  });
}

// Обработчик на кнопку регистрации
const signupButton = document.getElementById('signup-button');
signupButton.addEventListener('click', (evt) => {
  const inputs = document.querySelectorAll('#register-form input');

  //Вызов функции валидации
  if (!validation(inputs)) {
    return;
  }

  //генерируем новый обьект из полей формы
  const formData = {};
  inputs.forEach(input => {
    formData[input.name] = input.value.trim();
  });

  //делаем нормальный email
  const userEmail = formData.email.trim().toLowerCase();
  formData.email = userEmail;

  // вызов функции поиска существующего пользоватля
  const userObj = findUser(userEmail);
  if (userObj !== undefined) {
    console.log('Пользователь уже существует');
    evt.preventDefault();
    return;
  }
  
  modalClose(evt.target.closest('.modal'));
  //запрет перезагрузки страницы
  evt.preventDefault();

  //создаем экземпляр добавляем в массив
  const user = new User(formData);
  users.push(user);
  //обновляем хранилище
  localSet(users);
  //меняем вид страницы
  user.login();

});

//запись в локал пользователя
function localSet(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// фукция поиска пользователя по почте и возврат обьекта
function findUser(mail) {
  return users.find(user => user.email === mail);
}

// фукция поиска пользователя по карте и возврат обьекта
function findCard(card) {
  return users.find(user => user.cardNumber === card);
}

function findIndex(email) {
  return users.findIndex(user => user.email === email)
}

// функция валидации
function validation(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false;
      console.log('NOT Valid');
    }
  });
  return isValid;
}


//update users data 
function updateUsersData (user) {
  const userIndex = findIndex(user.email);
    if (userIndex !== -1) {
      users[userIndex] = user;
      // обновляем данные в Local Storage по индексу
      localSet(users);
    }

}


//обработчик на кнопку входа
const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', (evt) => {
  const inputs = document.querySelectorAll('#login-form input');
  const inputAuthData = inputs[0].value;
  const inputPass = inputs[1].value;

  //ищем пользователя по карте или почте
  let userObj = findUser(inputAuthData);
  if (userObj === undefined) {
    userObj = findCard(inputAuthData);
    console.log('Такого пользователя не существует');
  }

  if (!validation(inputs)) {
    return;
  }

  if (userObj && userObj.password === inputPass) {
    // меняем флаг
    userObj.isLoggedIn = true;
    
    // ищем позицию данного пользователя
    // const userIndex = findIndex(userObj.email);
    // if (userIndex !== -1) {
    //   users[userIndex] = userObj;

    //   // обновляем данные в Local Storage по индексу
    //   localSet(users);
    // }
    updateUsersData(userObj);

    modalClose(evt.target.closest('.modal'));
    userObj.login();
    evt.preventDefault();
    document.location.reload();
    

  } else {
    console.log('Пользователь с таким email не найден или пароль неверный');
    evt.preventDefault();
    return;
  }

})


// const checkCardButton = document.querySelector('.find-card__button');
// checkCardButton.addEventListener('click', checkCard);

// function checkCard() {
//   const inputs = document.querySelectorAll('.find-card__input input');
//   const inputName = inputs[0].value.trim();
//   const inputCard = inputs[1].value;
//   console.log(inputName);



//   for (const user of users) {
//     // console.log(user);
//     // console.log(user.cardNumber);
//     if (user.cardNumber === inputCard) {
//       let ar = user.lastName + user.firstName;
//       return console.log('sucsess card', user.cardNumber, user.lastName, user.firstName, ar);
//     }

//     if ((user.firstName + user.lastName) === inputName) {
//       let ar = user.firstName + user.lastName;
//       return console.log('sucsess name', user.cardNumber, user.lastName, user.firstName, ar);
//     }

//   }

// }


// переменная для хранения текущего залогиненого пользователя
let loggedInUser;
// функция логина даже после обновления страницы в зависимости от флага
function logInStarus() {
  users.forEach((user) => {
    if (user.isLoggedIn === true) {
      loggedInUser = user;
      user.login();
      
    }
    return;
  });
}
logInStarus();
console.log('logged user',loggedInUser);

// обработчик на кнопку выхода из аккаунта
const logOutButton = document.querySelector('.logoutButton');
logOutButton.addEventListener('click', function (evt) {
  users.forEach ((user)=> {
    if (user.isLoggedIn === true) {
      user.isLoggedIn = false;
      localSet(users);
      document.location.reload();
    }
  })
});






function addBooks (button) {
  
  // const book = button.parentElement;
  // const book1 = book.closest('.description');
  // const book2 = book1.parentElement;

//   const descriptionElement = document.querySelector('.book .description');
//   console.log(descriptionElement);

// // Найти кнопку <button class="button-low">Buy</button>
//   const buyButton = document.querySelector('.book__button .button-low');
//   console.log(buyButton);
button.classList.add ('.button-low--press');
const book = button.closest('.book');
const description = book.querySelector('.description').textContent;
const name = description.trim().split('\n');
const title = name[0].trim();
const autor = name[1].trim();

console.log(autor, title);
const bookInfo = {autor: autor, title: title};
loggedInUser.books.push(bookInfo);
console.log(loggedInUser.books);
console.log(typeof loggedInUser.books);
  

console.log('user thith books', loggedInUser);
// console.log(bookList);




  // console.log(book2);
  // console.log(book1);
  // console.log(button);
  // console.log(book);

  // return bookList;

}



// const buyButton = document.getElementById('abonemetbuy-button');
// console.log(buyButton);

function buyAbonement () {
  const buyButton = document.getElementById('abonemetbuy-button');
  const inputs = document.querySelectorAll('.abonement__form input');
  buyButton.setAttribute('disabled', true);
  buyButton.style.pointerEvents = 'none';
  const inputsNumberType = Array.from(inputs).slice(0, 4);
  const formData = {};

  inputs.forEach((elem)=> {
    elem.addEventListener('input', (evt)=> {
      if (!validation(inputs)) {
        buyButton.setAttribute('disabled', true);
        buyButton.style.pointerEvents = 'none';
        return;
      }
      else {
        buyButton.removeAttribute('disabled', true);
        buyButton.style.pointerEvents = '';
      }
    })
  })

  buyButton.addEventListener('click', (evt) => {
    // modalClose(evt.target.closest('.modal'));
    inputs.forEach((elem)=>{
      formData[elem.name] = elem.value.trim();
    })
    loggedInUser.paymentInfo = formData;
    loggedInUser.abonement = true;
    updateUsersData(loggedInUser);
    console.log(formData);
    console.log('updater ',loggedInUser);
    evt.preventDefault();
  });

  inputsNumberType.forEach ((elem)=> {
    elem.addEventListener('input', (evt)=>{
      elem.value = elem.value.replace(/[^0-9\s]/g, '');
    })
  })



}







// function updateProfileInfo () {
//   const visits = document.querySelector('.visits');
//   visits.textContent = this.visits;
//   const bonus = document.querySelector('.bonus');
//   bonus.textContent = this.bonus;
//   console.log(visits);

  
  


// }

// updateProfileInfo();

