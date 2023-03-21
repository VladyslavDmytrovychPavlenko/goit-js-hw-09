import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
// Функція createPromise приймає два параметри: position та delay.
// Вона створює проміс, який випадковим чином вирішує, чи має він бути вирішеним успішно (resolve) чи з помилкою (reject) після затримки, переданої у параметрі delay.
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function submitHandler(e) {
  e.preventDefault();
  // Отримуються значення delay, step, та amount зі введених даних форми.
  let delay = Number(e.currentTarget.delay.value);
  let step = Number(e.currentTarget.step.value);
  let amount = Number(e.currentTarget.amount.value);
  // За допомогою циклу for, створюється amount промісів, збільшуючи затримку delay з кроком step для кожного нового промісу.
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
}
// Кожен проміс здійснюється за допомогою методів then та catch, які повідомляють користувача про успішне або невдале виконання промісу, використовуючи бібліотеку notiflix-notify-aio.
form.addEventListener('submit', submitHandler);
