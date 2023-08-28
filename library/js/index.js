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
let users = JSON.parse(localStorage.getItem('users')) || [];
if (!Array.isArray(users)) {
    users = [];
}

//Генератор уникального номера карты
function createCard() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let cardNumber = '';
  let length = 8;
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    cardNumber += characters.charAt(randomIndex);
  }
  return cardNumber;
}

// Обработчик на форму регистрации
const signupButton = document.getElementById('signup-button');
signupButton.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.form__modal input');
  const formData = {};
  inputs.forEach(input => {
    formData[input.name] = input.value;
  });

  formData.CardNumber = createCard();
  users.push(formData);
  checkUser ();
  local();
  
});

//запись в локал
function local() {
  localStorage.setItem('users', JSON.stringify(users));
}

//проверка существования пользователя
function checkUser () {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    const targetEmail = document.querySelector('#SET-email').value;
    console.log (typeof storedUsers);
    storedUsers.forEach(user => {
        if (user.email === targetEmail) {
          console.log("Этот пользватель существует", targetEmail);
          
        }
      });

}

console.log('Текущие пользователи:');
console.log(users);


