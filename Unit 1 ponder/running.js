const apples = 5;
const oranges = 3;
let total = apples + oranges;
console.log("total:", total);

// This will show on the page too - because reasons
document.addEventListener('DOMContentLoaded', () => {
  document.body.textContent = `total: ${total}`;
});