const min = 1;
const max = 10;
const winningNum = getRandNum();
let guessesLeft = 3;

const game = document.querySelector('#game');
const minNum = document.querySelector('#min-num');
const maxNum = document.querySelector('#max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

function getRandNum() {
  return Math.floor(Math.random() * max) + min;
}

function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

game.addEventListener('mouseup', (e) => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

function gameOver(won, msg) {
  const color = won === true ? 'green' : 'red';

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;

  guessBtn.className += 'play-again';
  guessBtn.value = 'Play Again?';

  setMessage(msg, color);
}

guessBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value, 10);

  // Validation
  if (Number.isNaN(guess) || guess < min || guess > max) {
    return setMessage(`Guess must be between ${min} and ${max}.`, 'red');
  }

  // Win
  if (guess === winningNum) {
    return gameOver(true, `${guess} is correct, YOU WIN!`);
  }

  guessesLeft -= 1;

  // Lose
  if (guessesLeft === 0) {
    guessInput.disabled = true;

    return gameOver(false, `You ran out of guesses! The correct number was ${winningNum}.`);
  }

  guessInput.value = '';

  // Next Turn
  return setMessage(`${guess} is incorrect. ${guessesLeft} guesses left.`, 'red');
});
