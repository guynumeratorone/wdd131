const form = document.querySelector('.card-form');
const errors = document.querySelector('.errors');

form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    const firstInvalid = form.querySelector(':invalid');
    firstInvalid?.focus();
    errors.textContent = firstInvalid?.validationMessage || 'Please fix the highlighted fields.';
  } else {
    errors.textContent = '';
  }
});
