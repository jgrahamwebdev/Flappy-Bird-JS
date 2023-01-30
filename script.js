
const bird = document.querySelector('.bird');
const gameDisplay = document.querySelector('.game-container');
const ground = document.querySelector('.ground');
const newGameBtn = document.querySelector('.newGame-btn');

const playOne = document.querySelector('.player-one');
const playTwo = document.querySelector('.player-two');
const playThree = document.querySelector('.player-three');
const playFour = document.querySelector('.player-four');
const playFive = document.querySelector('.player-five');
const playSix = document.querySelector('.player-six');

const charOne = document.querySelector('.character-one');
const charTwo = document.querySelector('.character-two');
const charThree = document.querySelector('.character-three');
const charFour = document.querySelector('.character-four');
const charFive = document.querySelector('.character-five');
const charSix = document.querySelector('.character-six');

let birdLeft = 220;
let birdBottom = 100;
let gravity = 2;
let isGameOver = false;
let gap = 450;


//This creates the Bird's starting position at the beginning of every game
function startGame () {
  birdBottom -= gravity;
  bird.style.bottom = birdBottom + 'px';
  bird.style.left = birdLeft + 'px';
}
//This makes the Bird fall if the player does not hit a button to make it go up
let timerId = setInterval(startGame, 20);


//This makes the Bird jump ONLY when the player hits the Space Bar
//The 'e' is for Event
function control (e) {
  if (e.keyCode === 32) {
    jump();
    //Called the 'startTimer' Function to begin when the user clicks the Space Bar
    startTimer();  
  }
}


//This is the Function for how much the Bird will jump
function jump () {
  birdBottom += 50;
  bird.style.bottom = birdBottom + 'px';
}
//Here we call our Control Function that ONLY the Space Bar will make the Bird jump   
document.addEventListener('keyup', control);


//This creates our Obstacles   
function generateObstacle () { 
  let obstacleLeft = 500; 
  //This creates the random heights of our Obstacles
  let randomHeight = Math.random() * 60;
  let obstacleBottom = randomHeight;

  const obstacle = document.createElement ('div');
  const topObstacle = document.createElement ('div');

  if(!isGameOver) { 
    obstacle.classList.add('obstacle');
    topObstacle.classList.add('topObstacle');
  }
  gameDisplay.appendChild(obstacle); 
  gameDisplay.appendChild(topObstacle); 

  obstacle.style.left = obstacleLeft + 'px';
  topObstacle.style.left = obstacleLeft + 'px';

  obstacle.style.bottom = obstacleBottom + 'px';
  topObstacle.style.bottom = obstacleBottom + gap + 'px';

  //Here is how we make the Obstacle move like it's on a conveyor belt 
  function moveObstacle () {
    obstacleLeft -= 2;
    obstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.left = obstacleLeft + 'px';

    if(obstacleLeft === -110) {
      clearInterval(timerId);
      gameDisplay.removeChild(obstacle);      
      gameDisplay.removeChild(topObstacle); 
    } 
    if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && (birdBottom < obstacleBottom + 155 || birdBottom > obstacleBottom + gap -200) || birdBottom === 0) {
      gameOver()
      clearInterval(timerId);
    }
  }
  let timerId = setInterval(moveObstacle, 20);

  //This generates new Obstacles every so often (milliseconds)
  if(!isGameOver) setTimeout(generateObstacle, 3000);
}
generateObstacle();


function gameOver () {
  clearInterval(timerId);
  isGameOver = true;
  document.removeEventListener('keyup', control);
  //Called the 'stopTimer' Function when anything happens that causes the game to be over
  stopTimer();
}



//STOPWATCH
const timer = document.querySelector('.stopwatch');

let hr = 0;
let min = 0;
let sec = 0;
let stoptime = true;    

function startTimer() {
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}

function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
    timer.innerHTML = '00:00:00';
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}


//CHARACTER SELECTION

const playerOne = function () {
  playOne.classList.remove('hidden');
  playTwo.classList.add('hidden');
  playThree.classList.add('hidden')
  playFour.classList.add('hidden');
  playFive.classList.add('hidden');
  playSix.classList.add('hidden');
}
const playerTwo = function () {
  playOne.classList.add('hidden');
  playTwo.classList.remove('hidden');
  playThree.classList.add('hidden')
  playFour.classList.add('hidden');
  playFive.classList.add('hidden');
  playSix.classList.add('hidden');
}
const playerThree = function () {
  playOne.classList.add('hidden');
  playTwo.classList.add('hidden');
  playThree.classList.remove('hidden')
  playFour.classList.add('hidden');
  playFive.classList.add('hidden');
  playSix.classList.add('hidden');
}
const playerFour = function () {
  playOne.classList.add('hidden');
  playTwo.classList.add('hidden');
  playThree.classList.add('hidden')
  playFour.classList.remove('hidden');
  playFive.classList.add('hidden');
  playSix.classList.add('hidden');
}
const playerFive = function () {
  playOne.classList.add('hidden');
  playTwo.classList.add('hidden');
  playThree.classList.add('hidden')
  playFour.classList.add('hidden');
  playFive.classList.remove('hidden');
  playSix.classList.add('hidden');
}
const playerSix = function () {
  playOne.classList.add('hidden');
  playTwo.classList.add('hidden');
  playThree.classList.add('hidden')
  playFour.classList.add('hidden');
  playFive.classList.add('hidden');
  playSix.classList.remove('hidden');
}

charOne.addEventListener('click', playerOne);
charTwo.addEventListener('click', playerTwo);
charThree.addEventListener('click', playerThree);
charFour.addEventListener('click', playerFour);
charFive.addEventListener('click', playerFive);
charSix.addEventListener('click', playerSix);