// Loader
const loader = document.querySelector('.loader-container');
function loadLoader(){
  loader.classList.add('show');
  setTimeout(() => {
   loader.classList.remove('show');
  }, 1000 * 3);
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
let globalFirstPlayerName = '';
let globalFirstPlayerProfileSrc = '';

let globalSecondPlayerName = '';
let globalSecondPlayerProfileSrc = '';

let winHeader = 'Congratulations';
let winGreetings = 'Congratulations on your victory in this Tic Tac Toe game! You should be proud of yourself for playing strategically and outsmarting your opponent.';
let tieHeader = 'Well Done Guys!';
let tieName = 'Match tie';
let tieGreetings = ['Well played! It\'s always impressive to see two players evenly matched.','Congratulations on a great game! It\'s amazing how evenly matched you two are.','Wow, what a close match! You both played incredibly well.','That was an exciting game, you both deserve recognition for your skills.','Great effort from both sides! A tie was the perfect result for such a close match.'];
let tieMatchImg = 'tieMatch.png';
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

function loadImage(input,profile){
  if(!input) return;

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
  firstPage.classList.remove('show');
  loadLoader();
  lastPage.classList.add('show');
  setGamePlayerDetails();
}

function setGamePlayerDetails(){
  if(!globalFirstPlayerProfileSrc.includes('index.htm')){
    playerProfile1.src = globalFirstPlayerProfileSrc;
  } 
  if(!globalSecondPlayerProfileSrc.includes('index.htm')){
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
      setTimeout(() => {
        resetGame();
        let winPlayerImg = symbol === 'X' ? playerProfile1.src : playerProfile2.src;
        let winPlayerName = symbol === 'X' ? playerName1.innerText : playerName2.innerText;
        loadMatchContainer(winHeader,winPlayerImg,winPlayerName,winGreetings);
      },1000);
      return '';
    }else if(checkForTie()){
      setTimeout(() => {
        resetGame();
        loadMatchContainer(tieHeader,tieMatchImg,tieName,tieGreetings[Math.floor(Math.random() * tieGreetings.length)]);
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
      case 'scores':
        loadDynamicPage('scores-page');
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
  /*firstPage.classList.add('show');
  secondPage.classList.remove('show');*/
  lastPage.classList.add('show');
}

window.addEventListener('load',() => {
  loadDefaultPage();
});