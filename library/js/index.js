const users = userList();
console.log(users);

//забираем даннные из локал
function userList() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

//генератор уникального номера карты
// function createCard() {
//   const min = 100000000;
//   const max = 999999999;

//   let cardNumber = Math.floor(Math.random() * (max - min + 1)) + min;
//   cardNumber = cardNumber.toString(16).toUpperCase();

//   return cardNumber;
// }

const signupButton = document.getElementById('signup-button');

// Обработчик на кнопку регистрации
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
  // const flag = checkUser(userEmail, users);
  const userObj = findUser(userEmail);
  if (userObj !== undefined) {
    console.log('Пользователь уже существует' );
    evt.preventDefault();
    return;
  }
  
  // для тестов можно удалить потом
  // if (flag === false) {
  //   console.log('Пользователь создан', flag);
  // }

  //генерируем карту
  // formData.CardNumber = createCard();
  console.log(formData)
  let user = new User (formData);
  users.push(user);
  //генерируем карту
  localSet(users);

});

//запись в локал пользователя
function localSet(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// фукция поиска пользователя по почте и возврат обьекта
function findUser (mail) {
  // let flag = false;
  return users.find(user => user.email === mail);
  // users.forEach(user => {
  //   if (user.email === mail) {
  //     flag = true;
  //     console.log("Этот пользватель существует", flag, user.email);
  //   }
  // });
  // return flag;
}


// фукция поиска пользователя по карте и возврат обьекта
function findCard (card) {
  return users.find(user => user.cardNumber === card);
}

// функция валидации
function validation (inputs) {
  let isValid = true;
  inputs.forEach((input)=> {
    if (!input.checkValidity()){
      isValid = false;
      console.log ('NOT Valid');
    }
  });
  return isValid;
}


const loginButton = document.getElementById('login-button');

//обработчик на кнопку входа
loginButton.addEventListener('click', (evt)=>{
  const inputs = document.querySelectorAll('#login-form input');
  const inputAuthData = inputs[0].value;
  const inputPass = inputs[1].value;

  let userObj = findUser(inputAuthData);
  if (userObj === undefined) {
  userObj = findCard(inputAuthData);
  }

    if (!validation(inputs)) {
    return;
  }
  if (userObj && userObj.password === inputPass) {
  // const currentUser = new User (userObj);
  const currentUser = new User (userObj);
  console.log(currentUser);
  // тут вызов функции переделки страницы
  
  currentUser.login();
  modalClose(evt.target.closest('.modal'));
  }
  else {
  console.log('Пользователь с таким email не найден или пароль неверный');
  evt.preventDefault();
  return;
  }
  
})


const checkCardButton = document.querySelector('.find-card__button');
checkCardButton.addEventListener('click', checkCard);

function checkCard() {
  const inputs = document.querySelectorAll('.find-card__input input');
  const inputName = inputs[0].value.trim();
  const inputCard = inputs[1].value;
  console.log(inputName);

  

  for (const user of users) {
    // console.log(user);
    // console.log(user.cardNumber);
    if (user.cardNumber === inputCard) {
      let ar = user.lastName+user.firstName;
      return console.log('sucsess card', user.cardNumber, user.lastName, user.firstName, ar);
    }

     if ((user.firstName + user.lastName) === inputName) {
      let ar = user.firstName+user.lastName;
      return console.log('sucsess name', user.cardNumber, user.lastName, user.firstName, ar);
    }

  }

}


//Конструктор пользователя
class User {
  constructor ({email, firstName, lastName, password, bonus = 0, books = {}, visits = 0}) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password  = password
    this.visits = visits;
    this.bonus = bonus;
    this.books = books;
    this.isLoggedIn = true;

    this.cardNumber = this.createCard();

  }

  login () {
    this.updateIcon();
    this.newVisit();
    
  }

  newVisit () {
    this.visits++;
    console.log(this.visits);
    const userIndex = users.findIndex(user => user.email === this.email);
    if (userIndex !== -1) {
    users[userIndex].visits = this.visits;
    localSet(users);
  }
  }




  createCard() {
    const min = 100000000;
    const max = 999999999;
    let cardNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    cardNumber = cardNumber.toString(16).toUpperCase();
    return cardNumber;
  }

  updateIcon () {
  // const symbol = (this.firstName[0] + this.lastName[0]).toUpperCase();
  // document.addEventListener('DOMContentLoaded', () => {
  //   const svgObj = document.getElementById('user-svg').getSVGDocument();
  //   console.log(svgObj);
  //   // svgObj.setAttribute('data','./icons/user-icon.svg');
  //   // console.log(svgObj);
  //   if (svgObj) {
  //   let text = svgObj.querySelector('text');
  //   text.textContent = `${symbol}`;
  //   }
  //   else{
  //     console.log('Ошибка загрузки свг');
  //   }
    
  // });

  
  

 }



}


function updateIcon (name1='ab', name2='cd') {
  const symbol = (name1[0] + name2[0]).toUpperCase();
  const svgCurrentUser = document.querySelector('.user-svg');
  const svgAllUser = document.querySelector('.auth-icon__img');

  svgAllUser.classList.add('auth-icon__img-hide');
  svgCurrentUser.classList.add('user-svg-active');

  let text = svgCurrentUser.querySelector('text');
  text.textContent = `${symbol}`;

 }


// const svgObj = document.addEventListener('DOMContentLoaded', () => {
//   return document.getElementById('user-svg').getSVGDocument();
//  });

//  console.log(svgObj);


// document.addEventListener('DOMContentLoaded', () => {
//   const svgObj = document.getElementById('user-svg').contentDocument;
//   const textElement = svgObj.querySelector('text');
//   if (textElement) {
//     const textContent = textElement.textContent;
//     console.log(textContent);
//   } else {
//     console.log('not found');
//   }
// });

// check card -- Digital Library Cards
// const checkCardButton = document.querySelector('.find-card__button');
// console.log(checkCardButton);
// checkCardButton.addEventListener('click', checkCard);

// function checkCard() {
//   const inputs = document.querySelectorAll('.find-card__input input');

//   console.log(inputs);
//   // console.log(button);

//   for (const user of users) {
//     console.log(user);
//     console.log(user.CardNumber);
//     if (user.CardNumber === inputs[1].value) {
//       console.log
//       return console.log('sucsess', user.CardNumber);
//     }

//   }

// }

// function updateIcon (name1, name2) {
//   let symbol = (name1[0] + name2[0]).toUpperCase();

//   document.addEventListener('DOMContentLoaded', function() {
//     let svgObj = document.getElementById('user-svg').getSVGDocument();
//     console.log(svgObj);
//     // svgObj.setAttribute('data','./icons/user-icon.svg');
//     // console.log(svgObj);
//     let text = svgObj.querySelector('text');
//     text.textContent = `${symbol}`;

//   });

//  }

// updateIcon('John', 'Rhamber');












// let user = usersList()[1];
// console.log('object', user);
// user.cardNumber = user.createCard;
// console.log(user.createCard);
// console.log('object', user);
// let newUser = new User (user); 
// let newUser2 = new User (user); 
// users.push(newUser);
// users.push(newUser2);
// console.log(users);

// console.log(newUser)
// console.log({ ...user });