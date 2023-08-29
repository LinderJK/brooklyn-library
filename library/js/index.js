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
