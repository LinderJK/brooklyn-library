const tasks = [{
    number: 1,
    maxscore: 50,
    myscore: 50,
    description: 'Этап 1: Пользователь не зарегистрирован \n 1.1 Ограниченная карусель в блоке About 25/25 \n 1.2 Слайдер в блоке Favorites 25/25 '
  }, {
    number: 2,
    maxscore: 49,
    myscore: 49,
    description: 'Этап 2: Пользователь на этапе регистрации'
  }, {
    number: 3,
    maxscore: 29,
    myscore: 29,
    description: 'Этап 3: Пользователь на этапе входа в учётную запись после регистрации'
  },
  {
    number: 4,
    maxscore: 76,
    myscore: 76,
    description: 'Этап 4: Пользователь после входа в учётную запись \n 4.1 Меню профиля при нажатии на иконку с инициалами пользователя - 16/16 \n 4.2 Модальное окно MY PROFILE  - 25/25 \n 4.3 Блок Favorites - 6/6 \n 4.4 Модальное окно BUY A LIBRARY CARD - 29/29'
  }
]

function grade() {
  let scoreSumm = 0;
  for (let task of tasks) {
    console.log(`№${task.number} - ${task.myscore}/${task.maxscore} - ${task.description}`);
    scoreSumm = scoreSumm + task.myscore;
  }
  return (
    console.log('Максимально возможные баллы - 200'),
    console.log('Баллы самопроверки - ' + scoreSumm));
}
grade();
