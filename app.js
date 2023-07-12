const startBtn = document.querySelector('#start');
const restartBtn = document.querySelector('.restart-btn');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#FF0000', '#FFA500', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#800080', '#FF00FF', '#FF4500', '#FF8C00', '#FFD700', '#ADFF2F', '#7FFF00', '#00FF7F', '#00CED1', '#1E90FF', '#8A2BE2', '#FF1493', '#FF69B4', '#DDA0DD'];

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        if (time < 10) {
            time = `0${time}`;
        }
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

restartBtn.addEventListener('click', () => {
    screens[1].classList.remove('up');
    board.innerHTML = ' ';
    score = 0;
    timeEl.parentNode.classList.remove('hide');
    restartBtn.style.display = 'none';
})

function startGame() {
    let counter = time;
    const intervalId = setInterval(() => {
        decreadeTime();
        counter -= 1;
        if (counter === 0) {
            clearInterval(intervalId);
            decreadeTime();
        }
    }, 1000);

    createRandomCircle();
    setTime(time);
}

function decreadeTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Игра окончена. Ваш счет <span class="primary">${score}</span></h1>`;
    restartBtn.style.display = 'block';
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(20, 70);
    const color = getRandomNumber(0, colors.length - 1);
    const { width, height } = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = `${colors[color]}`;
    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
