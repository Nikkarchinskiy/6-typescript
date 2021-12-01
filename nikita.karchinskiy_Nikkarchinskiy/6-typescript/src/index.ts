const letterBox = document.querySelector<HTMLDivElement>('[data-letter-task]')!;
const scoreBox = document.querySelector<HTMLDivElement>('[data-score]')!;
const scoreCircle = document.querySelector<HTMLDivElement>('[data-circle]')!;
const mainWrapper = document.querySelector<HTMLDivElement>('[data-main-wrapper]')!;
const lineProgress = document.querySelector<HTMLDivElement>('[data-line-progress]')!;

let score: number = 100;
let letter: string;
let timer: number;
scoreBox.innerText = '100';

let i: number = 0;
function move() {
  if (i == 0) {
    i = 1;
    let width: number = 1;
    let id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        lineProgress.style.width = width + "%";
      }
    }
  }
}

function getRandom(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function lostCase(): void {
    scoreBox.innerText = 'Lost';
    letterBox.innerText = '';
    mainWrapper.classList.add('main-wrapper__lost');
}

function winCase(): void {
    scoreBox.innerText = 'WIN';
    letterBox.innerText = '';
    mainWrapper.classList.add('main-wrapper__win');
}

function showLetter(): void {
    letter = String.fromCharCode(getRandom(65, 90));
    letterBox.innerText = letter;
    timer = window.setTimeout(() => {
        let randomEmpty: number;
        move();
        randomEmpty = getRandom(10, 15);
        score = score - randomEmpty;
        scoreBox.textContent = String(score);
        scoreCircle.innerText = '-' + String(randomEmpty);
        if (score > 0) {
        showLetter();
    } else
        lostCase();
        return
    }, 2000);
}

showLetter()
document.addEventListener('keydown', (e) => {
    clearTimeout(timer);
    if (e.key.toUpperCase() === letter) {
        let randomPlus: number;
        randomPlus = getRandom(5, 10);
        score = score + randomPlus;
        scoreBox.innerText = String(score);
        scoreCircle.innerText = '+' + String(randomPlus);
    }
    if (e.key.toUpperCase() !== letter) {
        let randomMinus: number;
        randomMinus = getRandom(20, 25);
        score = score - randomMinus;
        scoreBox.innerText = String(score);
        scoreCircle.innerText = '-' + String(randomMinus);
    }
    if ( score <= 0 ) {
        lostCase();
    } else if (score >= 200 )  {
        winCase();
    } else
    showLetter();
});