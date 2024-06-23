import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const currentTime = Date.now();
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < currentTime) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        messageColor: 'white',
      });
      btnElement.disabled = true;
    } else {
      btnElement.disabled = false;
    }
  },
};
const myInput = document.querySelector('#datetime-picker');
const fp = flatpickr(myInput, options);

const timerEl = {
  dayEl: document.querySelector('[data-days]'),
  hourEl: document.querySelector('[data-hours]'),
  minEl: document.querySelector('[data-minutes]'),
  secEl: document.querySelector('[data-seconds]'),
};

const btnElement = document.querySelector('button');
btnElement.addEventListener('click', () => {
  btnElement.disabled = true;
  myInput.disabled = true;
  const setIntervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDate - currentTime;
    const timeObj = convertMs(diff);
    updateTimerDisplay(timeObj);
  }, 1000);
  setTimeout(() => {
    clearInterval(setIntervalId);
  }, userSelectedDate - Date.now());
});

function updateTimerDisplay(timeObj) {
  timerEl.dayEl.textContent = addLeadingZero(timeObj.days);
  timerEl.hourEl.textContent = addLeadingZero(timeObj.hours);
  timerEl.minEl.textContent = addLeadingZero(timeObj.minutes);
  timerEl.secEl.textContent = addLeadingZero(timeObj.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
