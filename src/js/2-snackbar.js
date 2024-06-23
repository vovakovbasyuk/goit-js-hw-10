import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = formEl.elements.delay.value;
  const stateInput = formEl.elements.state.value;
  const delayINT = parseInt(delayInput, 10);

  createPromise(delayINT, stateInput)
    .then(result => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delayINT}ms`,
        backgroundColor: 'green',
        messageColor: 'white',
      });
    })
    .catch(error => {
      iziToast.show({
        message: `❌ Rejected promise in ${delayINT}ms`,
        backgroundColor: 'red',
        messageColor: 'white',
      });
    });
});

function createPromise(delayINT, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delayINT);
      } else {
        reject(delayINT);
      }
    }, delayINT);
  });
}
