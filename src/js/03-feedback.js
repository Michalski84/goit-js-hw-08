import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

const restoreFormState = () => {
  const state = JSON.parse(localStorage.getItem(storageKey)) || {};
  emailInput.value = state.email || '';
  messageInput.value = state.message || '';
};

const updateLocalStorage = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}, 500);

const handleFormSubmit = event => {
  event.preventDefault();
  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
  console.log('Form submitted:', {
    email: emailInput.value,
    message: messageInput.value,
  });
};

emailInput.addEventListener('input', updateLocalStorage);
messageInput.addEventListener('input', updateLocalStorage);
form.addEventListener('submit', handleFormSubmit);

restoreFormState();









