let start = document.getElementById("startButton");
let canvas = document.getElementById("matchItCanvas");
let countryName = document.getElementById("country");
let guessButton = document.getElementById("guessSubmitButton");
let playAgainButton = document.getElementById("resetGame");
let capital = document.getElementById("capital");
let gameScore = document.getElementById("gameScore");
let overallScore = document.getElementById("overAllScore");
let buttonArray = new Array();
let timer;  // the timer function
let twoMinutesFromNow; // the time two minutes from now
let win_count = 0; //  the count of times the player has won
let overAllGuesses = 0;
let distance; // the time distance between twoMinutesFromNow and rightnow


try { 
  let game = new MatchIt(canvas)

function countdown() {
  // the time as of right now
  let rightnow = new Date().getTime();

  // the time differential between right now and two minutes from now
  distance = twoMinutesFromNow - rightnow;

  // the time expansion into units of time
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // format the time that will display on the board
  let text = minutes + "m " + seconds + "s ";
  document.getElementById("timer").innerHTML = text;

  // if the timer runs out, display "expired" and stop the timer
  if (distance < 0) {
    document.getElementById("timer").innerHTML = "EXPIRED";
    clearInterval(timer);
    playAgainButton.disabled = false;
    guessSubmitButton.disabled = true;
    guessInput.disabled = true;
    gameScore.innerHTML = "Your Score is: " + game.score;
  }
}

// set the variable "twoMinutesFromNow" to two minutes and two seconds from right now
function setTimer() {
  twoMinutesFromNow = new Date();
  twoMinutesFromNow.setMinutes(twoMinutesFromNow.getMinutes() + 2);
  twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() + 2);
  win_count = sessionStorage.getItem("wincount");
  console.log(win_count)
  // decrement the timer by 30 seconds for each 10 additional wins
  if (win_count > 30) { twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() - 90); }
  else if (win_count > 20) { twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() - 60); }
  else if (win_count > 10) { twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() - 30); }
}

// start the timer
function startTimer() {
  setTimer();
  timer = setInterval(countdown, 1000);
}

// stop the timer
function stopTimer() {
  clearInterval(timer);
}


// decrement the timer by 30 seconds for each 10 additional wins
switch (win_count) {
  case 10:
    twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() - 30);
    break;
}

start.addEventListener("click", function (event) {
  event.preventDefault();
  startFunction();

  // start the timer
  startTimer();

});

function startFunction() {

  game.start().then(() => {
    document.getElementById("countryFlag").src = "https://img.geonames.org/flags/x/" + game.isoCode.toLowerCase() + ".gif";
    document.getElementById("countryFlag").style.display = "block";
    countryName.innerHTML = "Country name: " + game.country;
    start.disabled = true;
    capital.innerHTML = game.getWordHolderText();
    guessButton.disabled = false;
    playAgainButton.disabled = true;

  });
}

function passToGuessInput(id) {
  document.getElementById("guessInput").value = id;
  guessInput = document.getElementById("guessInput");
  document.getElementById("guessSubmitButton").focus();
}

guessForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // retrieve win count from session storage

  overAllGuesses = sessionStorage.getItem("OverAllCount");
  guessInput = document.getElementById("guessInput");
  buttonArray.push(guessInput.value);
  document.getElementById(guessInput.value).disabled = true;
  game.guess(guessInput.value);
  capital.innerHTML = game.getWordHolderText();
  guessInput.value = "";

  if (game.isOver == true) {
    overAllGuesses++;
    sessionStorage.setItem("OverAllCount", overAllGuesses);

    if (game.userGuessedCapital == true && distance > 0) {
      for (i = 0; i < buttonArray.length; i++) { document.getElementById(buttonArray[i]).disabled = false; }

      game.resetGameData();
      capital.innerHTML = "";
      countryName.innerHTML = "Country name: ";
      win_count++;
      console.log(win_count);

      // store win_count to session storage
      sessionStorage.setItem("wincount", win_count);
      gameScore.innerHTML = "Your Current Score is: " + game.score;
      overallScore.innerHTML = "Your Total Score is: " + win_count + "/" + overAllGuesses;
      startFunction();
    }
    else if (game.userGuessedCapital == false) {
      guessSubmitButton.disabled = true;
      guessInput.disabled = true;
      playAgainButton.disabled = false;
      capital.innerHTML = game.capital;
      gameScore.innerHTML = "Your Current Score is: " + game.score;
      overallScore.innerHTML = "Your Total Score is: " + win_count + "/" + overAllGuesses;
      stopTimer();
      alert("Unfortunately! You did not guess.");
    }
  }
});

function resetGame() {
  location.reload()
};

}
catch (error) {
  console.error(error);
  alert(error);
}
