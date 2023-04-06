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
const playerContainer1 = document.querySelector('.player-display');
const playerProfile1 = document.querySelector('#player-profile-1');
const playerName1 = document.querySelector('#player-name-1');

const playerContainer2 = document.querySelector('.player-display.player-2');
const playerProfile2 = document.querySelector('#player-profile-2');
const playerName2 = document.querySelector('#player-name-2');

const playerTurnIndicator = document.querySelector('#player-turn-display');
const boardTiles = Array.from(document.querySelectorAll('.tile'));
/* ========================= Global variables ============================== */
let currentPlayerSymbol = 'X';
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

function loadImage(input,profile){
  let imageSrc = input[0];
  profile.classList.add('show');
  profile.src = URL.createObjectURL(imageSrc);
}

firstPlayerImageInput.addEventListener('change',() => {
  loadImage(firstPlayerImageInput.files,firstPlayerProfile);
});

secondPlayerImageInput.addEventListener('change', () => {
  loadImage(secondPlayerImageInput.files,secondPlayerProfile);
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

/* ============================ LastPage functions ================================================= */
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

/* ==========================  Game functions =================================================== */

function handleTile(tile,symbol){
  if(!tile.classList.contains('active')){

    tile.classList.add('active');
    tile.innerText = symbol;
   
    if(checkForWin()){
      alert(currentPlayerSymbol,'wins');
      setTimeout(() => {
        resetGame();
      },1000);
      return '';
    }else if(checkForTie()){
      alert("tie");
      setTimeout(() => {
        resetGame();
      },1000);
      return '';
    }
   
    currentPlayerSymbol = symbol === 'X' ? 'O' : 'X';
   
    if(currentPlayerSymbol === 'X'){
     playerContainer1.classList.add('active');
     playerContainer2.classList.remove('active');
    } 
    else {
     playerContainer2.classList.add('active');
     playerContainer1.classList.remove('active');
    }
    
    playerTurnIndicator.innerText = currentPlayerSymbol + '-Turn';
  }
}
function checkForWin(){
  return checkRows() || checkColumns() || checkDiagnols();
}
function checkRows(){
  for(let index = 1; index <= 9 ; index += 3){
    if(checkMatchof(index,index + 1, index + 2)) return true;
  }
}
function checkColumns(){
  for(let index = 1; index <= 3 ; index++){
    if(checkMatchof(index,index + 3, index + 6)) return true;
  }
}

function checkDiagnols(){
   return checkMatchof(1,5,9) || checkMatchof(3,5,7);
}
function checkMatchof(i,j,k){
  return boardTiles[i-1].innerText === currentPlayerSymbol && boardTiles[j-1].innerText === currentPlayerSymbol && boardTiles[k-1].innerText === currentPlayerSymbol;
}

function checkForTie(){
  for(let i = 0; i < boardTiles.length; i++){
    if(!boardTiles[i].classList.contains('active')){
      return false;
    }
  }
  return true;
}

function resetGame(){
  boardTiles.forEach(tile => {
    tile.classList.remove('active');
    tile.innerText = '';
  });
  currentPlayerSymbol = 'X';
  playerTurnIndicator.innerText = currentPlayerSymbol + '-Turn';
  playerContainer1.classList.add('active');
  playerContainer2.classList.remove('active');
}
boardTiles.forEach(tile => {
  tile.addEventListener('click',() => {
    handleTile(tile,currentPlayerSymbol);
  });
});

/* ============================================================================= */
