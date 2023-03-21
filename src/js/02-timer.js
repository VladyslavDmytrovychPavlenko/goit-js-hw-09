import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const timerhtml = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');
let intervalId = null;
let targetData = null;

startBtn.disabled = true;
// Об'єкт "options" містить конфігурацію flatpickr календаря.
// Він включає параметри, такі як формат часу, інтервали часу, доступні для вибору, і функцію, яка буде викликана при закритті вибору дати в календарі.
// Якщо обрана дата є неправильною, то виводиться повідомлення про помилку та кнопка старту таймера вимикається.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
      return;
    }
    targetData = selectedDates[0];
    startBtn.disabled = false;
    startBtn.addEventListener('click', () => {
      timer.start();
    });
  },
};
// flatpickr календар відображається в DOM за допомогою виклику "flatpickr(datePicker, options)".
flatpickr(datePicker, options);

// Функція "start()" виконується при кліку на кнопку "Старт".
// Вона створює інтервал, який буде виконувати функцію "updateClock()" щосекунди до тих пір, поки поточний час не буде дорівнювати цільовій даті.
// Константи та змінні для зберігання елементів DOM, які необхідні для зміни тексту, колірного стилю та заборони кнопки старту таймера.
const timer = {
  start() {
    intervalId = setInterval(() => {
      const deltaTime = targetData.getTime() - Date.now();
      const time = convertMs(deltaTime);
      if (deltaTime >= 0) {
        timerhtml.style.color = 'blue';
        updateClock(time);
      } else {
        timerhtml.style.color = 'black';
        clearInterval(intervalId);
      }
    }, 1000);
    startBtn.disabled = true;
  },
};

// Функція "updateClock()" оновлює значення днів, годин, хвилин і секунд на сторінці згідно з поточним часом.

function updateClock({ days, hours, minutes, seconds }) {
  daysField.textContent = `${days}`;
  hoursField.textContent = `${hours}`;
  minutesField.textContent = `${minutes}`;
  secondsField.textContent = `${seconds}`;
}
// Функція "addLeadingZero()" додає "0" перед числом меншим за 10, щоб уникнути помилок у відображенні часу.
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// Функція "convertMs()" конвертує мілісекунди, що залишилися до цільової дати, у значення днів, годин, хвилин і секунд.
// Ця функція використовується у функції "start()".
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
