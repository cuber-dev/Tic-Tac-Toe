// Loader
const loader = document.querySelector('.loader-container');

// First page elements 
const firstPage = document.querySelector('.first-page');
const newGame = document.querySelector('#new-game');
const scores = document.querySelector('#scores');

// Second page elements
const secondPage = document.querySelector('.second-page');

newGame.addEventListener('click',() => {
  firstPage.classList.remove('show');
  loader.classList.add('show');
  setTimeout(() => {
    loader.classList.remove('show');
    secondPage.classList.add('show');
  },1000 * 3);
});


