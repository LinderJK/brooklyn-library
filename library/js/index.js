const users = userList();
console.log(users);

//забираем даннные из локал
function userList() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

//генератор уникального номера карты
function createCard() {
  const min = 100000000;
  const max = 999999999;

  let cardNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  cardNumber = cardNumber.toString(16).toUpperCase();

  return cardNumber;
}

const signupButton = document.getElementById('signup-button');

// Обработчик на кнопку регистрации
signupButton.addEventListener('click', (evt) => {
  const inputs = document.querySelectorAll('.form__modal input');

  //Вызов функции валидации
  if (validation(inputs) === false) {
    return;
  }

  const formData = {};
  inputs.forEach(input => {
    formData[input.name] = input.value.trim();
  });

  const userEmail = formData.email.trim().toLowerCase();
  formData.email = userEmail;

  // вызов функции поиска существующего пользоватля
  let flag = checkUser(userEmail, users);
  if (flag === true) {
    console.log('Пользователь уже существует', flag);
    evt.preventDefault();
    return;
  }

  // для тестов можно удалить потом
  if (flag === false) {
    console.log('Пользователь создан', flag);
  }

  //генерируем карту и добавляем в локал если все ок
  formData.CardNumber = createCard();
  users.push(formData);
  local(users);


  setTimeout(() => {
    modalClose(document.querySelector('.modal--active'));
    // modalOpen(document.getElementById('login-modal'));
  }, 1000);

});


//запись в локал пользователя
function local(users) {
  localStorage.setItem('users', JSON.stringify(users));
}


// фукция проверки существования пользователя
function checkUser(mail, users) {
  let flag = false;

  users.forEach(user => {
    if (user.email === mail) {
      flag = true;
      console.log("Этот пользватель существует", flag, user.email);

    }

  });

  return flag;

}


// функция валидации
function validation(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    if (input.checkValidity() === false) {
      isValid = false;
      console.log('NOT Valid');
    }
  });
  return isValid;
}


// Изменене иконки после входа
function updateIcon() {

  const svgObj = document.getElementById('user-svg').getSVGDocument();
  console.log(svgObj);
  const icon = document.querySelector('.auth-icon__img');
  icon.setAttribute('src', './icons/user-icon.svg');

}

updateIcon()


// check card -- Digital Library Cards
function checkCard() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  // const name = document.querySelector('')
  // const number = document.querySelector('')
  const inputs = document.querySelectorAll('.find-card__input input');
  const button = document.querySelectorAll('.find-card__button');
  console.log(inputs);
  console.log(button);
  console.log(users);

}
