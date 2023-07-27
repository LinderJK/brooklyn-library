const tasks = [{
    number: 1,
    maxscore: 10,
    myscore: 10,
    description: 'Вёрстка валидная'
}, {
    number: 2,
    maxscore: 16,
    myscore: 16,
    description: 'Вёрстка семантическая'
}, {
    number: 3,
    maxscore: 54,
    myscore: 54,
    description: 'Вёрстка соответствует макету'
}, {
    number: 4,
    maxscore: 20,
    myscore: 20,
    description: 'Общие требования к верстке'
}]

function grade() {
    let scoreSumm = 0;
    for (let task of tasks) {
        console.log(`№${task.number} - ${task.myscore}/${task.maxscore} - ${task.description}`);
        scoreSumm = scoreSumm + task.myscore;
    }
    return (
        console.log('Максимально возможные баллы - 100'),
        console.log ('Баллы самопроверки - ' + scoreSumm));
}
grade ();
