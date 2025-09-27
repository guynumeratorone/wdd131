// mission.js
document.addEventListener('DOMContentLoaded', () => {
  // select the dropdown element out of the HTML
  const themeSelector = document.querySelector('#theme-select');
  const logo = document.getElementById('ms-logo');

  // filenames for logos (place images in same folder)
  const LOGO_LIGHT = 'byui-logo_blue.png';
  const LOGO_DARK  = 'byui-logo_white.png';

  // function that toggles theme and swaps logo
  function changeTheme() {
    // the current value is in themeSelector.value
    const val = themeSelector.value;

    if (val === 'dark') {
      // add the dark class to the body
      document.body.classList.add('dark');
      // change the source of the logo img to the white logo
      if (logo) logo.src = LOGO_DARK;
    } else {
      // remove the dark class
      document.body.classList.remove('dark');
      // change the logo src back to blue logo
      if (logo) logo.src = LOGO_LIGHT;
    }
  }

  // initialize select if body already has .dark during development
  if (document.body.classList.contains('dark')) {
    themeSelector.value = 'dark';
  } else {
    themeSelector.value = 'light';
  }
  // apply initial theme so page state matches select on load
  changeTheme();

  // add an event listener to the themeSelector
  themeSelector.addEventListener('change', changeTheme);
});
