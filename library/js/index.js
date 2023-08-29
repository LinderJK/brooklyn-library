// const tasks = [{
//     number: 1,
//     maxscore: 26,
//     myscore: 26,
//     description: 'Вёрстка соответствует макету. Ширина экрана 768px'
// }, {
//     number: 2,
//     maxscore: 12,
//     myscore: 12,
//     description: 'Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки'
// }, {
//     number: 3,
//     maxscore: 12,
//     myscore: 12,
//     description: 'На ширине экрана 768рх реализовано адаптивное меню +12'
// }, ]

// function grade() {
//     let scoreSumm = 0;
//     for (let task of tasks) {
//         console.log(`№${task.number} - ${task.myscore}/${task.maxscore} - ${task.description}`);
//         scoreSumm = scoreSumm + task.myscore;
//     }
//     return (
//         console.log('Максимально возможные баллы - 50'),
//         console.log('Баллы самопроверки - ' + scoreSumm));
// }
// grade();


// Через класс?
//   class User {
//     constructor(firstName, lastName, email, password, id) {
//         this.userid = id;
//         this.userFirstName = firstName;
//         this.userSecondName = lastName;
//         this.userEmail = email;
//         this.userPassword = password;
//         this.userCardNumber = this.createCard();


//     }

//     createCard () {
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
//         let cardNumber ='';
//         let length = 8;
//         for (let i = 0; i < length; i++) {
//             const randomIndex = Math.floor(Math.random() * characters.length);
//             cardNumber += characters.charAt(randomIndex);
//           }
//           console.log (cardNumber);
//           return cardNumber;
//     }

//   }

// const instanceName = formData.firstName + formData.lastName;
// users[instanceName] = new User(formData.firstName, formData.lastName, formData.email, formData.password, id);
// users.users[instanceName];
//   const newUser = new User(1, "Иван", "Иванов", "ivan@example.com");


//Без класса

//Генератор уникального номера карты
function createCard() {
  const min = 100000000;
  const max = 999999999;

  let cardNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  cardNumber = cardNumber.toString(16);
  
  return cardNumber;
}

// Обработчик на форму регистрации
const signupButton = document.getElementById('signup-button');

signupButton.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.form__modal input');
  console.log (inputs);
  const formData = {};
  const users = JSON.parse(localStorage.getItem('users')) || [];
  console.log (users);
  console.log (formData);

  //Проверка на валидацию
  if (validation(inputs) === false){
    return;
  }

  inputs.forEach(input => {
    formData[input.name] = input.value.trim();
  });
  const userEmail = formData.email.trim().toLowerCase();
  formData.email = userEmail;

  // проверка существования пользователя
  const flag = checkUser(userEmail, users);
  if (flag === true) {
    console.log ('Пользователь не создан', flag);
    return;
  }

  if (flag === false) {
    console.log ('Пользователь создан', flag);
    
    formData.CardNumber = createCard();
    
    users.push(formData);
    console.log ('после push')
    console.log (users)
    local(users);

    //если ок закрываем регистрацию открываем логин
    setTimeout(() => {
      modalClose(document.querySelector('.modal--active'));
      modalOpen(document.getElementById('login-modal'));
    }, 1000);
    
  }

});

//запись в локал
function local(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

//**TODO FIX BUG
// фукция проверки существования пользователя
function checkUser(email, users) {
  let flag = false;

  users.forEach(user => {
    if (user.email === email) {
      
      flag = true;
      console.log("Этот пользватель существует", flag, user.email);

    }
    
  });
  console.log ('функция проверки', flag)
  return flag;

}


// функция валидации
function validation (inputs) {
    let isValid = true;
    inputs.forEach( (input)=> {
      if (input.checkValidity() === false){
        isValid = false;
        console.log ('NOT Valid');
      }
    });
    return isValid;
  }
