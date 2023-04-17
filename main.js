// Loader
const loader = document.querySelector('.loader-container');
function loadLoader(delay = 3){
  loader.classList.add('show');
  setTimeout(() => {
   loader.classList.remove('show');
  }, 1000 * delay);
}

// Message
function loadMessage(message){
  const messageText = document.createElement('div');
  messageText.innerText = message;
  messageText.classList.add('message');
  document.body.append(messageText);
  setTimeout(() => {
    messageText.remove();
  },1000 * 3);
}

// First page elements 
const firstPage = document.querySelector('.first-page');
const newGame = document.querySelector('#new-game');
/* ============================================================================= */

// Second page elements
const secondPage = document.querySelector('.second-page');
const namesForm = document.querySelector('.second-page #name-form');
const firstPlayerProfile = document.querySelector('#player-image-1');
const firstPlayerImageInput = document.querySelector('#player-image-input-1');
const firstPlayerImageLabel = document.querySelector('#player-image-label-1');
const firstPlayerNameInput = document.querySelector('#player-name-input-1');

const secondPlayerContainer = document.querySelector('.player.player-2');
const secondPlayerProfile = document.querySelector('#player-image-2');
const secondPlayerImageInput = document.querySelector('#player-image-input-2');
const secondPlayerImageLabel = document.querySelector('#player-image-label-2');
const secondPlayerNameInput = document.querySelector('#player-name-input-2');

const maxPlayer = document.querySelector('#max-player');

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

const boardTilesContainer = document.querySelector('.board-container');
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

const scoreName1 = document.querySelector('#score-name-1');
const scoreWin1 = document.querySelector('#score-win-1');
const scoreTie = document.querySelector('#score-tie');
const scoreName2 = document.querySelector('#score-name-2');
const scoreWin2 = document.querySelector('#score-win-2');

/* ============================================================================= */

/* ========================= Global variables ============================== */
let currentPlayerSymbol = 'X';
let isTie = false;
let isGameOver = false;
let maxStatus = false;

let globalFirstPlayerName = 'Player-1';
let globalFirstPlayerProfileSrc = '';
let globalFirstPlayerWinCount = 0;

let globalSecondPlayerName = 'Player-2';
let globalSecondPlayerProfileSrc = '';
let globalSecondPlayerWinCount = 0;

let winHeader = 'Congratulations';
let winPlayerName = '';
let winPlayerImg = '';
let winGreetings = 'Congratulations on your victory in this Tic Tac Toe game! You should be proud of yourself for playing strategically and outsmarting your opponent.';

let tieHeader = 'Well Done Guys!';
let tieName = 'Match tie';
let tieMatchImg = 'matchTie.png';
let tieGreetings = ['Well played! It\'s always impressive to see two players evenly matched.','Congratulations on a great game! It\'s amazing how evenly matched you two are.','Wow, what a close match! You both played incredibly well.','That was an exciting game, you both deserve recognition for your skills.','Great effort from both sides! A tie was the perfect result for such a close match.'];
let tieCount = 0;

/* ============================================================================= */




/* =========================  Second page loader ============================== */
function loadSecondPage(){
  firstPage.classList.remove('show');
  lastPage.classList.remove('show');
  loadLoader();
  resetGame();
  resetScores();
  secondPage.classList.add('show');
}

newGame.addEventListener('click',loadSecondPage);

/* ======================= Form functions ============================== */

function loadImage(input, profile) {
  if (!input || input.length === 0) {
    profile.classList.remove('show');
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
    profile.classList.remove('show');
  };
}

firstPlayerImageInput.addEventListener('change',() => {
  loadImage(firstPlayerImageInput.files,firstPlayerProfile);
});

secondPlayerImageInput.addEventListener('change', () => {
  loadImage(secondPlayerImageInput.files,secondPlayerProfile);
});

function handleMaxPlayerClick() {
  maxStatus = maxPlayer.checked;
  if (maxStatus) {
    loadMessage('Removed Second player');
    secondPlayerContainer.classList.add('disabled');
    secondPlayerNameInput.disabled = true;
  } else {
    loadMessage('Added Second player');
    secondPlayerContainer.classList.remove('disabled');
    secondPlayerNameInput.disabled = false;
  }
}
maxPlayer.addEventListener('change',handleMaxPlayerClick);



function assignPlayerDetails(firstImg,firstName,secondImg,secondName){
  globalFirstPlayerProfileSrc = isLocalUrl(firstImg.src) ? '' : firstImg.src;
  globalFirstPlayerName = firstName.value;
  
  globalSecondPlayerProfileSrc = isLocalUrl(secondImg.src) ? '' : secondImg.src;
  globalSecondPlayerName = secondName.value;
}
function isLocalUrl(url) {
  return url !== null && url !== undefined && !url.includes('blob:http') && !url.includes('maxpark.png');
}

namesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  if(maxPlayer.checked){
    assignPlayerDetails(firstPlayerProfile,firstPlayerNameInput,{ src : 'maxpark.png'},{ value : maxPlayer.name});
    loadMessage('Max is playing with ' + globalFirstPlayerName);
  }else{
    assignPlayerDetails(firstPlayerProfile,firstPlayerNameInput,secondPlayerProfile,secondPlayerNameInput);
  }
  loadLastPage();
});



/* ============================================================================= */

/* ============================ LastPage functions ================================================= */
function loadLastPage(){
  secondPage.classList.remove('show');
  firstPage.classList.remove('show');
  loadLoader(2);
  lastPage.classList.add('show');
  setGamePlayerDetails();
}

async function getImage(playerName){
  let formatPaths = [
      '5.x/identicon',
      '5.x/bottts',
      '4.x/pixel-art',
      '5.x/pixel-art-neutral',
      '5.x/adventurer',
      '5.x/thumbs',
      '5.x/icons',
      '5.x/adventurer-neutral',
      '5.x/avataaars',
      '5.x/avataaars-neutral',
      '5.x/big-ears',
      '5.x/big-ears-neutral',
      '5.x/big-smile',
      '5.x/bottts-neutral',
      '5.x/croodles',
      '5.x/croodles-neutral',
      '5.x/fun-emoji',
      '5.x/lorelei',
      '5.x/lorelei-neutral',
      '5.x/shapes'
    ];
  let random = Math.floor(Math.random() * formatPaths.length);
  let response = await fetch(`https://api.dicebear.com/${formatPaths[random]}/svg?seed=${playerName}`);
  let blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  return imageUrl;
}



async function setGamePlayerDetails(){
  if(globalFirstPlayerProfileSrc !== ''){
    playerProfile1.src = globalFirstPlayerProfileSrc;
  }else{
    playerProfile1.src = await getImage(globalFirstPlayerName);
  }
  
  if(globalSecondPlayerProfileSrc !== ''){
    playerProfile2.src = globalSecondPlayerProfileSrc;
  }else{
    playerProfile2.src = await getImage(globalSecondPlayerName);
  }
  
  playerName1.innerText = globalFirstPlayerName;
  playerName2.innerText = globalSecondPlayerName;
}
/* ==========================  Max functions =================================================== */
function fireUpMax() {
  let topLeft = boardTiles[0];
  let bottomLeft = boardTiles[2];
  let topRight = boardTiles[6];
  let bottomRight = boardTiles[8];

  let topCenter = boardTiles[1];
  let leftCenter = boardTiles[3];
  let bottomCenter = boardTiles[7];
  let rightCenter = boardTiles[5];

  let center = boardTiles[4];
  
  // Check if there are two X's in a row and place an O to block the opponent
  if (topLeft.innerText === 'X' && bottomLeft.innerText === 'X' && !leftCenter.classList.contains('active')) {
    setTimeout(() => leftCenter.click(), 400);
  } else if (topRight.innerText === 'X' && bottomRight.innerText === 'X' && !rightCenter.classList.contains('active')) {
    setTimeout(() => rightCenter.click(), 400);
  } else if (topLeft.innerText === 'X' && topRight.innerText === 'X' && !topCenter.classList.contains('active')) {
    setTimeout(() => topCenter.click(), 400);
  } else if (bottomLeft.innerText === 'X' && bottomRight.innerText === 'X' && !bottomCenter.classList.contains('active')) {
    setTimeout(() => bottomCenter.click(), 400);
  } else if (topLeft.innerText === 'X' && bottomRight.innerText === 'X' && !center.classList.contains('active')) {
    setTimeout(() => center.click(), 400);
  } else if (topRight.innerText === 'X' && bottomLeft.innerText === 'X' && !center.classList.contains('active')) {
    setTimeout(() => center.click(), 400);
  }
  // Check if there are two O's in a row and place the third O to win
  else if (topLeft.innerText === 'O' && bottomLeft.innerText === 'O' && !leftCenter.classList.contains('active')) {
    setTimeout(() => leftCenter.click(), 400);
  } else if (topRight.innerText === 'O' && bottomRight.innerText === 'O' && !rightCenter.classList.contains('active')) {
    setTimeout(() => rightCenter.click(), 400);
  } else if (topLeft.innerText === 'O' && topRight.innerText === 'O' && !topCenter.classList.contains('active')) {
    setTimeout(() => topCenter.click(), 400);
  } else if (bottomLeft.innerText === 'O' && bottomRight.innerText === 'O' && !bottomCenter.classList.contains('active')) {
    setTimeout(() => bottomCenter.click(), 400);
  } else if (topLeft.innerText === 'O' && bottomRight.innerText === 'O' && !center.classList.contains('active')) {
    setTimeout(() => center.click(), 400);
  } else if (topRight.innerText === 'O' && bottomLeft.innerText === 'O' && !center.classList.contains('active')) {
    setTimeout(() => center.click(), 400);
  }



  else if (topLeft.innerText === 'O' && bottomLeft.innerText === 'O' && bottomRight.innerText === 'O') {
    if (!leftCenter.classList.contains('active')) {
      setTimeout(() => leftCenter.click(), 400);
    } else if (!bottomCenter.classList.contains('active')) {
      setTimeout(() => bottomCenter.click(), 400);
    } else {
      setTimeout(() => center.click(), 400);
    }
  } else if (topRight.innerText === 'O' && bottomLeft.innerText === 'O' && bottomRight.innerText === 'O') {
    if (!rightCenter.classList.contains('active')) {
      setTimeout(() => rightCenter.click(), 400);
    } else if (!bottomCenter.classList.contains('active')) {
      setTimeout(() => bottomCenter.click(), 400);
    } else {
      setTimeout(() => center.click(), 400);
    }
  } else if (topRight.innerText === 'O' && topLeft.innerText === 'O' && bottomRight.innerText === 'O') {
    if (!topCenter.classList.contains('active')) {
      setTimeout(() => topCenter.click(), 400);
    } else if (!rightCenter.classList.contains('active')) {
      setTimeout(() => rightCenter.click(), 400);
    } else {
      setTimeout(() => center.click(), 400);
    }
  } else if (topRight.innerText === 'O' && topLeft.innerText === 'O' && bottomLeft.innerText === 'O') {
    if (!leftCenter.classList.contains('active')) {
      setTimeout(() => leftCenter.click(), 400);
    } else if (!topCenter.classList.contains('active')) {
      setTimeout(() => topCenter.click(), 400);
    } else {
      setTimeout(() => center.click(), 400);
    }
  } else {
    if (!topLeft.classList.contains('active')) {
      setTimeout(() => topLeft.click(), 400);
    } else if (!bottomLeft.classList.contains('active')) {
      setTimeout(() => bottomLeft.click(), 400);
    } else if (!topRight.classList.contains('active')) {
      setTimeout(() => topRight.click(), 400);
    } else {
      setTimeout(() => bottomRight.click(), 400);
    }
  }

  setTimeout(() => wholeGameContainer.classList.remove('disabled'), 400);
}





/* ==========================  Game functions =================================================== */


function handleTile(tile,symbol){
  if(!tile.classList.contains('active')){

    tile.classList.add('active');
    tile.innerText = symbol;
   
    if(checkForWin()){
      wholeGameContainer.classList.add('disabled');
      setTimeout(() => {
        resetGame();
        winPlayerImg = symbol === 'X' ? playerProfile1.src : playerProfile2.src;
        winPlayerName = symbol === 'X' ? playerName1.innerText : playerName2.innerText;
        loadMatchContainer(winHeader,winPlayerImg,winPlayerName,winGreetings);
        loadScoreTable(symbol);
        
        // For updating the turn when a player wons the match
        isCurrentPlayer(symbol);
      },2000);
      return '';
    }else if(checkForTie()){
      wholeGameContainer.classList.add('disabled');
      isTie = true;
      addWinClass(...boardTiles);
      setTimeout(() => {
        resetGame();
        tieCount++;
        loadScoreTable('');
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
    if(maxStatus) checkGameOver(isGameOver);
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
    isTie = false;
    addWinClass(boardTiles[i-1],boardTiles[j-1],boardTiles[k-1]);
    isGameOver = true;
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
 
  setTimeout(() => {
    tiles.forEach(tile => {
      tile.classList.remove('matched');
    });
    player.classList.remove('won');
  },2000);

  if(isTie) return;
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
    isGameOver = false;
    if(globalSecondPlayerName === 'Max' && currentPlayerSymbol === 'O') checkGameOver(false);
  },1000 * 5);
}
function checkGameOver(gameOver){
  if(!gameOver){
    wholeGameContainer.classList.add('disabled');
    fireUpMax();
  }
}

function resetGame(){
  wholeGameContainer.classList.remove('disabled');
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
function loadScoreTable(passedSymbol){
  scoreName1.innerText = globalFirstPlayerName;
  scoreName2.innerText = globalSecondPlayerName;
  if(passedSymbol === 'X') globalFirstPlayerWinCount++;
  else if(passedSymbol === 'O') globalSecondPlayerWinCount++;

  scoreWin1.innerText = globalFirstPlayerWinCount;
  scoreWin2.innerText = globalSecondPlayerWinCount;
  
  scoreTie.innerText = tieCount;
}
function resetScores(){
  globalFirstPlayerWinCount = 0;
  globalSecondPlayerWinCount = 0;
  tieCount = 0;
  scoreWin1.innerText = globalFirstPlayerWinCount;
  scoreWin2.innerText = globalSecondPlayerWinCount;
  
  scoreTie.innerText = tieCount;
}

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
    loadLoader(2);
    lastPage.classList.remove('show');
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



function addClickLabel(e){
  let div = document.createElement('div');
  div.classList.add('touchLabel');
  div.style.left = e.clientX + 'px';
  div.style.top = e.clientY + 'px';
  document.body.append(div);
  setTimeout(() => {
    let allLabels = document.querySelectorAll('.touchLabel');
    allLabels[0].remove();
  },200);
  
}

function playMelodySound(e){
  let children = e.target;
  let possibleElemnts = ['button','label','li'];
  if(possibleElemnts.includes(children.tagName.toLowerCase()) || children.matches('.tile')){
    document.querySelector('audio').remove();
    const audio = document.createElement('audio');
    audio.src = 'melodyClick.mp3';
    audio.addEventListener('timeupdate', () => {
      if(audio.currentTime >= 0.5){
        audio.pause();
      }
    });
    document.body.append(audio);
    audio.play();
  }
}

document.addEventListener('click',(e) => {
  addClickLabel(e);
  playMelodySound(e);
});


function loadDefaultPage(){
  firstPage.classList.add('show');
  secondPage.classList.remove('show');
  lastPage.classList.remove('show');
}

window.addEventListener('DOMContentLoaded', () => {
  loadDefaultPage();
  //loadLoader(4);
});


