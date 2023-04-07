// Loader
const loader = document.querySelector('.loader-container');
function loadLoader(delay = 3){
  loader.classList.add('show');
  setTimeout(() => {
   loader.classList.remove('show');
  }, 1000 * delay);
}


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
const wholeGameContainer = document.querySelector('.whole-game-container');
const playerContainer1 = document.querySelector('.player-display');
const playerProfile1 = document.querySelector('#player-profile-1');
const playerName1 = document.querySelector('#player-name-1');

const playerContainer2 = document.querySelector('.player-display.player-2');
const playerProfile2 = document.querySelector('#player-profile-2');
const playerName2 = document.querySelector('#player-name-2');

const playerTurnIndicator = document.querySelector('#player-turn-display');
const boardTiles = Array.from(document.querySelectorAll('.tile'));

const navOpenBtn = document.querySelector('#nav-btn');
const navBar = document.querySelector('.nav-bar');
const navCloseBtn = document.querySelector('#back-nav-btn');
const navOptions = document.querySelectorAll('.nav-bar ul li');

const matchIndicatorContainer = document.querySelector('.match-indicator-container');
const matchIndicatorHeader = document.querySelector('#match-indicator-header');
const matchPlayerImage = document.querySelector('#match-player-img');
const matchPara = document.querySelector('#match-para');
const matchPlayerName = document.querySelector('#match-player-name');
/* ============================================================================= */

/* ========================= Global variables ============================== */
let currentPlayerSymbol = 'X';
let globalFirstPlayerName = 'Player-1';
let globalFirstPlayerProfileSrc = 'player.png';

let globalSecondPlayerName = 'Player-2';
let globalSecondPlayerProfileSrc = 'player.png';

let winHeader = 'Congratulations';
let winPlayerName = '';
let winPlayerImg = '';
let winGreetings = 'Congratulations on your victory in this Tic Tac Toe game! You should be proud of yourself for playing strategically and outsmarting your opponent.';

let tieHeader = 'Well Done Guys!';
let tieName = 'Match tie';
let tieMatchImg = 'matchTie.png';
let tieGreetings = ['Well played! It\'s always impressive to see two players evenly matched.','Congratulations on a great game! It\'s amazing how evenly matched you two are.','Wow, what a close match! You both played incredibly well.','That was an exciting game, you both deserve recognition for your skills.','Great effort from both sides! A tie was the perfect result for such a close match.'];
/* ============================================================================= */




/* =========================  Second page loader ============================== */
function loadSecondPage(){
  firstPage.classList.remove('show');
  lastPage.classList.remove('show');
  loadLoader();
  secondPage.classList.add('show');
}

newGame.addEventListener('click',loadSecondPage);

/* ======================= Form functions ============================== */

function loadImage(input, profile) {
  if (!input || input.length === 0) {
    profile.classList.add('show');
    profile.src = 'player.png';
    return;
  }

  let imageSrc = input[0];
  let img = new Image();
  img.src = URL.createObjectURL(imageSrc);
  img.onload = () => {
    profile.src = URL.createObjectURL(imageSrc);
    profile.classList.add('show');
  };
  img.onerror = () => {
    profile.src = 'player.png';
    profile.classList.add('show');
  };
}

firstPlayerImageInput.addEventListener('change',() => {
  loadImage(firstPlayerImageInput.files,firstPlayerProfile);
});

secondPlayerImageInput.addEventListener('change', () => {
  loadImage(secondPlayerImageInput.files,secondPlayerProfile);
});

function assignPlayerDetails(firstImg,firstName,secondImg,secondName){
  globalFirstPlayerProfileSrc = isLocalUrl(firstImg.src) ? 'player.png' : firstImg.src;
  globalFirstPlayerName = firstName.value;

  globalSecondPlayerProfileSrc = isLocalUrl(secondImg.src) ? 'player.png' : secondImg.src;
  globalSecondPlayerName = secondName.value;
}
function isLocalUrl(url) {
  return url !== null && url !== undefined && !url.includes('blob:http');
}

namesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  assignPlayerDetails(firstPlayerProfile,firstPlayerNameInput,secondPlayerProfile,secondPlayerNameInput);
  loadLastPage();
});
/* ============================================================================= */

/* ============================ LastPage functions ================================================= */
function loadLastPage(){
  secondPage.classList.remove('show');
  firstPage.classList.remove('show');
  loadLoader();
  lastPage.classList.add('show');
  setGamePlayerDetails();
}

function setGamePlayerDetails(){
  playerProfile1.src = globalFirstPlayerProfileSrc;
  playerProfile2.src = globalSecondPlayerProfileSrc;
  
  playerName1.innerText = globalFirstPlayerName;
  playerName2.innerText = globalSecondPlayerName;
}

/* ==========================  Game functions =================================================== */

function handleTile(tile,symbol){
  if(!tile.classList.contains('active')){

    tile.classList.add('active');
    tile.innerText = symbol;
   
    if(checkForWin()){
    wholeGameContainer.style.pointerEvents = 'none';
      setTimeout(() => {
        resetGame();
        winPlayerImg = symbol === 'X' ? playerProfile1.src : playerProfile2.src;
        winPlayerName = symbol === 'X' ? playerName1.innerText : playerName2.innerText;
        loadMatchContainer(winHeader,winPlayerImg,winPlayerName,winGreetings);
        // For updating the turn when a player wons the match
        isCurrentPlayer(symbol);
      },2000);
      return '';
    }else if(checkForTie()){
      wholeGameContainer.style.pointerEvents = 'none';
      addWinClass(...boardTiles);
      setTimeout(() => {
        resetGame();
        loadMatchContainer(tieHeader,tieMatchImg,tieName,tieGreetings[Math.floor(Math.random() * tieGreetings.length)]);
      },2000);
      return '';
    }
   
    currentPlayerSymbol = symbol === 'X' ? 'O' : 'X';
    // For updating instantly when turn changed
    isCurrentPlayer(currentPlayerSymbol);
  }
}
function isCurrentPlayer(passedSymbol){
  if(passedSymbol === 'X'){
    playerContainer1.classList.add('active');
    playerContainer2.classList.remove('active');
   } 
   else {
    playerContainer2.classList.add('active');
    playerContainer1.classList.remove('active');
   }
   playerTurnIndicator.innerText = passedSymbol + '-Turn';
   currentPlayerSymbol = passedSymbol;
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
  if (boardTiles[i-1].innerText === currentPlayerSymbol && boardTiles[j-1].innerText === currentPlayerSymbol && boardTiles[k-1].innerText === currentPlayerSymbol) {
    addWinClass(boardTiles[i-1],boardTiles[j-1],boardTiles[k-1]);
    return true;
  }
  return false;
}

function checkForTie(){
  for(let i = 0; i < boardTiles.length; i++){
    if(!boardTiles[i].classList.contains('active')){
      return false;
    }
  }
  return true;
}
function addWinClass(...tiles) {
  tiles.forEach(tile => {
    tile.classList.add('matched');
  });
  player = currentPlayerSymbol === 'X' ? playerContainer1 : playerContainer2;
  if(checkForTie()) return;
  player.classList.add('won');
}

function loadMatchContainer(header,image,name,greetings){
  wholeGameContainer.classList.remove('show');

  matchIndicatorHeader.innerText = header;
  matchPlayerImage.src = image;
  matchPlayerName.innerText = name;
  matchPara.innerText = greetings;
  
  matchIndicatorContainer.classList.add('show');
  setTimeout(() => {
    matchIndicatorContainer.classList.remove('show');
    wholeGameContainer.classList.add('show');
  },1000 * 5);
}

function resetGame(){
  wholeGameContainer.style.pointerEvents = 'visible';
  playerContainer1.classList.remove('won');
  playerContainer2.classList.remove('won');

  boardTiles.forEach(tile => {
    tile.classList.remove('active','matched');
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


/* ================================== NavBar functions ========================================== */
function openNavBar(){
  navBar.classList.add('show');
}
navOpenBtn.addEventListener('click',openNavBar);

function closeNavBar() {
  navBar.classList.remove('show');
}
navCloseBtn.addEventListener('click',closeNavBar);


function loadDynamicPage(page){
    page.classList.add('show');
    loader.classList.add('show');
    lastPage.classList.remove('show');
    setTimeout(() => {
      loader.classList.remove('show');
    }, 1000 * 3);
}

function checkIds(e){
  let children = e.target;
  if(children.matches('li')){
    switch(children.id){
      case 'home':
        loadDynamicPage(firstPage);
        break;
      case 'edit':
        loadDynamicPage(secondPage);
        break;
      case 'reset':
        resetGame();
        break;
      default :
        return;
    }
  }
}
navBar.addEventListener('click',checkIds);


function checkNotNavClick(e){
  let children = e.target;
  if(!children.matches('nav') && !children.matches('i')){
    navBar.classList.remove('show');
  }
}
document.addEventListener('click',checkNotNavClick);
/* ============================================================================= */


function loadDefaultPage(){
  firstPage.classList.add('show');
  secondPage.classList.remove('show');
  lastPage.classList.remove('show');
}

window.addEventListener('load',() => {
  loadDefaultPage();
  loadLoader(2);
});