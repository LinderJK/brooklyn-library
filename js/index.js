//Конструктор пользователя
class User {
  constructor({
    email,
    firstName,
    lastName,
    password,
    bonus = 0,
    books = [],
    visits = 1,
    cardNumber = 0,
    isLoggedIn = true,
    abonement = false,
    paymentInfo = {
      payNumber: null,
      expirationCodeOne: null,
      expirationCodeTwo: null,
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
    } else {
      this.cardNumber = cardNumber;
    }


  }

  login() {
    this.updateIcon();
    this.iconFullName();
    this.updatePopupProfile();
    this.isLoggedIn = true;
    this.updateProfileInfo();
    this.updateButtonsView();
    this.updateLibraryCards();
    this.updateLibraryCardsInfo()

  }

  newVisit() {
    this.visits++;
  }

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

  updateProfileInfo() {
    const self = this;

    function update(param, value) {
      param.forEach((elem) => {
        elem.textContent = value;
      })
    }
    const visits = document.querySelectorAll('.card-profile__visits');
    update(visits, self.visits);
    const bonus = document.querySelectorAll('.card-profile__bonus');
    update(bonus, self.bonus);
    const name = document.querySelector('.profile__name p');
    name.textContent = this.firstName + ' ' + this.lastName;
    const svg = document.querySelector('.profile__avatar .user-svg text');
    svg.textContent = (this.firstName[0] + this.lastName[0]).toUpperCase();
    const cardNumber = document.querySelector('.user-card-number');
    cardNumber.textContent = this.cardNumber;
    const booksList = document.querySelector('.books-list ul');

    this.books.forEach((elem) => {
      let newLi = document.createElement('li');
      newLi.innerHTML = `${elem.title + ', ' + elem.autor}`;
      booksList.append(newLi);
    })

    if (this.books.length < 1) {
      let newLi = document.createElement('li');
      newLi.innerHTML = 'No books added';
      booksList.append(newLi);
    }

    const booksCounter = document.querySelectorAll('.card-profile__books');
    update(booksCounter, self.books.length);
    booksCounter.textContent = this.books.length;
  }

  findBook(autor, title) {
    let a = this.books.some(elem => elem.autor === autor);
    let b = this.books.some(elem => elem.title === title);
    return a && b;

  }

  updateButtonsView() {
    const buyBookButtons = document.querySelectorAll('.book__button button');

    buyBookButtons.forEach((button) => {
      const book = button.closest('.book');
      const description = book.querySelector('.description').textContent;
      const name = description.trim().split('\n');
      const title = name[0].trim();
      const autor = name[1].trim();

      const isOwned = this.findBook(autor, title);

      if (isOwned) {
        button.classList.add('button-low--press');
        button.textContent = 'Own';
      } else {
        button.classList.remove('button-low--press');
        button.textContent = 'Buy';
      }
    });
  }

  updateLibraryCards() {
    const buttonFindCard = document.querySelector('.find-card__button');
    buttonFindCard.classList.add('d-none');
    const profile = document.querySelector('.card-profile-low');
    profile.classList.remove('d-none');

  }

  hideibraryCards() {
    const buttonFindCard = document.querySelector('.find-card__button');

    buttonFindCard.classList.remove('d-none');
    const profile = document.querySelector('.card-profile-low');
    profile.classList.add('d-none');

  }

  updateLibraryCardsInfo() {
    const text = document.querySelectorAll('.get-card__text p');
    const buttons = document.querySelectorAll('.get-card__buttons button');

    buttons.forEach((elem) => {
      elem.classList.add('d-none');
    })
    buttons[buttons.length - 1].classList.remove('d-none');

    text[0].textContent = 'Visit your profile';
    text[1].textContent = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';
  }

}

const users = userList();

function userList() {
  const userDataList = JSON.parse(localStorage.getItem('users')) || [];
  return userDataList.map(userData => {
    return new User(userData);
  });
}

const signupButton = document.getElementById('signup-button');
signupButton.addEventListener('click', (evt) => {
  const inputs = document.querySelectorAll('#register-form input');

  if (!validation(inputs)) {
    return;
  }

  const formData = {};
  inputs.forEach(input => {
    formData[input.name] = input.value.trim();
  });

  const userEmail = formData.email.trim().toLowerCase();
  formData.email = userEmail;

  const userObj = findUser(userEmail);
  if (userObj !== undefined) {
    console.log('Пользователь уже существует');
    evt.preventDefault();
    return;
  }

  modalClose(evt.target.closest('.modal'));
  evt.preventDefault();
  const user = new User(formData);
  users.push(user);
  localSet(users);
  loggedInUser = user;
  loggedInUser.newVisit();
  loggedInUser.login();


});

function localSet(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function findUser(mail) {
  return users.find(user => user.email === mail);
}

function findCard(card) {
  return users.find(user => user.cardNumber === card);
}

function findIndex(email) {
  return users.findIndex(user => user.email === email)
}

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

function updateUsersData(user) {
  const userIndex = findIndex(user.email);
  if (userIndex !== -1) {
    users[userIndex] = user;
    localSet(users);
    user.updateProfileInfo();

  }

}

const loginButton = document.getElementById('login-button');
loginButton.addEventListener('click', (evt) => {
  const inputs = document.querySelectorAll('#login-form input');
  const inputAuthData = inputs[0].value;
  const inputPass = inputs[1].value;

  let userObj = findUser(inputAuthData);
  if (userObj === undefined) {
    userObj = findCard(inputAuthData);
    console.log('Такого пользователя не существует');
  }

  if (!validation(inputs)) {
    return;
  }

  if (userObj && userObj.password === inputPass) {
    userObj.isLoggedIn = true;
    userObj.newVisit();
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

const checkCardButton = document.querySelector('.find-card__button');
checkCardButton.addEventListener('click', function () {

  const inputs = document.querySelectorAll('.find-card__input input');
  const inputName = inputs[0].value.trim();
  const inputCard = inputs[1].value;
  const findUser = findCard(inputCard);
  if (!findUser) {
    return;
  }
  const fullName = findUser.firstName + ' ' + findUser.lastName;

  if (findUser !== undefined && fullName === inputName) {
    findUser.updateProfileInfo();
    findUser.updateLibraryCards();

    setTimeout(() => {
      findUser.hideibraryCards();
      inputs.forEach((elem) => {
        elem.value = '';
      })
    }, 10000);
  }
  return;
});

let loggedInUser;

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

const logOutButton = document.querySelector('.logoutButton');
logOutButton.addEventListener('click', function (evt) {
  users.forEach((user) => {
    if (user.isLoggedIn === true) {
      user.isLoggedIn = false;
      localSet(users);
      document.location.reload();
    }
  })
});

function addBooks(button) {
  const book = button.closest('.book');
  const description = book.querySelector('.description').textContent;
  const name = description.trim().split('\n');
  const title = name[0].trim();
  const autor = name[1].trim();

  if (loggedInUser.findBook(autor, title)) {
    button.classList.add('button-low--press');
    button.textContent = 'Own';
    return;
  }

  const bookInfo = {
    autor: autor,
    title: title
  };

  if (!loggedInUser.findBook(autor, title)) {
    loggedInUser.books.push(bookInfo);
    button.classList.add('button-low--press');
    button.textContent = 'Own';
    updateUsersData(loggedInUser);

  }

}

function buyAbonement() {
  const buyButton = document.getElementById('abonemetbuy-button');
  const inputs = document.querySelectorAll('.abonement__form input');
  buyButton.setAttribute('disabled', true);
  buyButton.style.pointerEvents = 'none';
  const inputsNumberType = Array.from(inputs).slice(0, 4);
  const formData = {};

  inputs.forEach((elem) => {
    elem.addEventListener('input', (evt) => {
      if (!validation(inputs)) {
        buyButton.setAttribute('disabled', true);
        buyButton.style.pointerEvents = 'none';
        return;
      } else {
        buyButton.removeAttribute('disabled', true);
        buyButton.style.pointerEvents = '';
      }
    })
  })

  buyButton.addEventListener('click', (evt) => {
    inputs.forEach((elem) => {
      formData[elem.name] = elem.value.trim();
    })
    loggedInUser.paymentInfo = formData;
    loggedInUser.abonement = true;
    updateUsersData(loggedInUser);
    evt.preventDefault();
    modalClose(evt.target.closest('.modal'));
  });

  inputsNumberType.forEach((elem) => {
    elem.addEventListener('input', (evt) => {
      elem.value = elem.value.replace(/[^0-9\s]/g, '');
    })
  })

}
