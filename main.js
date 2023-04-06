// Loader
const loader = document.querySelector('.loader-container');

// First page elements 
const firstPage = document.querySelector('.first-page');
const newGame = document.querySelector('#new-game');
const scores = document.querySelector('#scores');
/* ============================================================================= */

// Second page elements
const secondPage = document.querySelector('.second-page');
const namesForm = document.querySelector('.second-page #name-form');
const firstPlayerProfile = document.querySelector('#player-image-1');
const firstPlayerImageInput = document.querySelector('#player-image-input-1');
const firstPlayerImageLabel = document.querySelector('#player-image-label-1');
const firstPlayerNameInput = document.querySelector('#player-name-input-1');

const secondPlayerProfile = document.querySelector('#player-image-2');
const secondPlayerImageInput = document.querySelector('#player-image-input-2');
const secondPlayerImageLabel = document.querySelector('#player-image-label-2');
const secondPlayerNameInput = document.querySelector('#player-name-input-2');

const formSubmitBtn = document.querySelector('#start-game');
/* ============================================================================= */

// Last page elements 
const lastPage = document.querySelector('.last-page');
const playerProfile1 = document.querySelector('#player-profile-1');
const playerName1 = document.querySelector('#player-name-1');

const playerProfile2 = document.querySelector('#player-profile-2');
const playerName2 = document.querySelector('#player-name-2');

const playerTurnIndicator = document.querySelector('#player-turn-display');
const borderTiles = document.querySelectorAll('.tile');
/* ========================= Global variables ============================== */
let currentPlayer = 'X';
let globalFirstPlayerName = '';
let globalFirstPlayerProfileSrc = '';

let globalSecondPlayerName = '';
let globalSecondPlayerProfileSrc = '';

/* ============================================================================= */




/* =========================  Second page loader ============================== */
function loadSecondPage(){
  firstPage.classList.remove('show');
  loader.classList.add('show');
  secondPage.classList.add('show');
  setTimeout(() => {
    loader.classList.remove('show');
  }, 1000 * 3);
}

newGame.addEventListener('click',loadSecondPage);

/* ======================= Form functions ============================== */

function loadImage(input,profile,label){
  let imageSrc = input[0];
  profile.classList.add('show');
  label.classList.add('hide');
  profile.src = URL.createObjectURL(imageSrc);
}

firstPlayerImageInput.addEventListener('change',() => {
  loadImage(firstPlayerImageInput.files,firstPlayerProfile,firstPlayerImageLabel);
});

secondPlayerImageInput.addEventListener('change', () => {
  loadImage(secondPlayerImageInput.files,secondPlayerProfile,secondPlayerImageLabel);
});

function assignPlayerDetails(firstImg,firstName,secondImg,secondName){
  globalFirstPlayerProfileSrc = firstImg;
  globalFirstPlayerName = firstName;
  
  globalSecondPlayerProfileSrc = secondImg;
  globalSecondPlayerName = secondName;
}

namesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  assignPlayerDetails(firstPlayerProfile.src,firstPlayerNameInput.value,secondPlayerProfile.src,secondPlayerNameInput.value);
  loadLastPage();
});
/* ============================================================================= */

/* ============================ ThirdPage functions ================================================= */
function loadLastPage(){
  secondPage.classList.remove('show');
  loader.classList.add('show');
  lastPage.classList.add('show');
  setTimeout(() => {
    loader.classList.remove('show');
  }, 1000 * 3);
  setGamePlayerDetails();
}

function setGamePlayerDetails(){
  if(globalFirstPlayerProfileSrc !== ''){
    playerProfile1.src = globalFirstPlayerProfileSrc;
  } 
  if(globalSecondPlayerProfileSrc !== ''){
    playerProfile2.src = globalSecondPlayerProfileSrc;
  }
  
  playerName1.innerText = globalFirstPlayerName;
  playerName2.innerText = globalSecondPlayerName;
}


/* ============================================================================= */
