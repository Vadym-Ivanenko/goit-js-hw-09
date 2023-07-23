import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  inputEl: document.querySelector('.form input'),
};

refs.formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const formData = checkDate(event);
  generatePromises(formData);
}

function checkDate(event) {
  const formElements = event.currentTarget.elements;
  const delay = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);
  if (delay < 0 || step < 0 || amount < 0) {
    Notiflix.Notify.failure('Enter a value greater than 0');
    return;
  } else {
    return {
      delay,
      step,
      amount,
    };
  }
}

function generatePromises(formData) {
  let delayTime = formData.delay;
  for (let i = 1; i <= formData.amount; i += 1) {
    createPromise(i, delayTime)
      .then(result => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${result.position} in ${result.delayTime}ms`
        );
      })
      .catch(eror => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${eror.position} in ${eror.delayTime}ms`
        );
      });
    delayTime = delayTime + formData.step;
  }
}

function createPromise(position, delayTime) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delayTime });
      } else {
        reject({ position, delayTime });
      }
    }, delayTime);
  });
}
