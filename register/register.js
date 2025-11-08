// Import the required functions from Templates.js
import { totalFees, successTemplate, participantTemplate } from './Templates.js';

document.addEventListener('DOMContentLoaded', () => {
  const fieldset = document.querySelector('fieldset.participants');
  const addBtn = document.getElementById('add');
  if (!fieldset || !addBtn) return;

  // Start from however many participant <section>s exist in the DOM now
  let participantCount = fieldset.querySelectorAll('section').length;

  // Add Participant
  addBtn.addEventListener('click', () => {
    // 1) increment the count
    participantCount++;

    // 2) build new participant HTML from the template
    const newParticipantHTML = participantTemplate(participantCount);

    // 3) insert before the Add button (so order stays 1..N)
    addBtn.insertAdjacentHTML('beforebegin', newParticipantHTML);
  });

  // --- Form Submission Logic ---
  const form = document.getElementById('regForm');
  const summary = document.getElementById('summary');
  if (summary) summary.classList.add('hide');

  if (form && summary) {
    // Listen for submit
    form.addEventListener('submit', submitForm);

    function submitForm(event) {
      // Prevent page reload
      event.preventDefault();

      // 1) total fees (imported helper)
      const fees = totalFees();

      // 2) count participants
      const count = form.querySelectorAll('fieldset.participants section').length;

      // 3) adult name
      const adultName = (form.querySelector('#adult_name')?.value || '').trim();

      // 4) hide form, show summary
      form.classList.add('hide');
      summary.classList.remove('hide');

      // 5) render success line (imported template)
      summary.innerHTML = successTemplate({
        name: adultName || 'Adult Contact',
        participants: count,
        total: fees
      });
    }
  }
});
