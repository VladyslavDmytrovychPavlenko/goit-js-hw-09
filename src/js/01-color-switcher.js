// Оголошуємо константи, щоб зберегти в змінних кнопки та тіло сторінки
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
// Оголошуємо змінну, яка буде містити ідентифікатор інтервалу
let intervalId = null;
// Функція для генерації випадкового HEX-кольору
function getRandomHexColor() {
  // Генеруємо випадкове число від 0 до 16777215 та перетворюємо його у HEX-стрічку
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// Функція для зміни кольору тіла сторінки
function changeBackgroundColor() {
  // Встановлюємо випадковий HEX-колір як кольорове значення фону тіла сторінки
  body.style.backgroundColor = getRandomHexColor();
}
// Функція для запуску автоматичної зміни кольору
function startColorSwitcher() {
  // Деактивуємо кнопку "Start"
  startBtn.disabled = true;
  // Запускаємо інтервал зміни кольору з частотою 1 секунда та зберігаємо його ідентифікатор у змінній
  intervalId = setInterval(changeBackgroundColor, 1000);
}
// Функція для зупинки автоматичної зміни кольору
function stopColorSwitcher() {
  // Зупиняємо інтервал зміни кольору
  clearInterval(intervalId);
  // Активуємо кнопку "Start"
  startBtn.disabled = false;
  // Встановлюємо фоновий колір тіла сторінки в значення за замовчуванням (пусту стрічку)
  body.style.backgroundColor = '';
}
// Додаємо обробники подій для кнопок "Start" та "Stop"
startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);
