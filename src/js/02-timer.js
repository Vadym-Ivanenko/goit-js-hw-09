import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const TIME_DELAY = 1000;
let selectedData = null;
let diffData = 0;
const refs = {
  btnStartEl: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};
refs.btnStartEl.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    } else {
      refs.btnStartEl.disabled = false;
      return (selectedData = selectedDates[0]);
    }
  },
};

flatpickr('#datetime-picker', options);

refs.btnStartEl.addEventListener('click', onTargetButtonStartClick);

function onTargetButtonStartClick() {
  refs.btnStartEl.disabled = true;
  countDownTimeEvent();
  startTimer();
}

function countDownTimeEvent() {
  diffData = selectedData - Date.now();
  fillTimer(convertMs(diffData));
}

function startTimer() {
  const intervalId = setInterval(() => {
    countDownTimeEvent();
    stoptTimer(intervalId);
  }, TIME_DELAY);
}

function stoptTimer(intervalId) {
  if (diffData < 1000) {
    clearInterval(intervalId);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function fillTimer({ days, hours, minutes, seconds }) {
  refs.spanDays.textContent = addZero(days);
  refs.spanHours.textContent = addZero(hours);
  refs.spanMinutes.textContent = addZero(minutes);
  refs.spanSeconds.textContent = addZero(seconds);
}

function addZero(number) {
  return String(number).padStart(2, 0);
}
