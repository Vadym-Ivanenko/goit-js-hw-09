const bodyEl = document.body;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const TIME_DELAY = 1000;
let intervalId = null;

btnStart.addEventListener('click', onTargetButtonStartClick);
btnStop.addEventListener('click', onTargetButtonStopClick);

function onTargetButtonStartClick(event) {
  bodyEl.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, TIME_DELAY);
  btnStart.disabled = true;
  btnStop.disabled = false;
}

function onTargetButtonStopClick(event) {
  clearInterval(intervalId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
