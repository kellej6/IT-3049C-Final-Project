let start = document.getElementById("startButton");
let canvas = document.getElementById("matchItCanvas");
let countryName = document.getElementById("country");
let guessButton = document.getElementById("guessSubmitButton");
let playAgainButton = document.getElementById("resetGame");
let capital = document.getElementById("capital");

var timer;  // the timer function
var twoMinutesFromNow; // the time two minutes from now
var win_count = 0; //  the count of times the player has won

function countdown() {
  // the time as of right now
  var rightnow = new Date().getTime();

  // the time differential between right now and two minutes from now
  var distance = twoMinutesFromNow - rightnow;
  console.log(distance);

  // the time expansion into units of time
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // format the time that will display on the board
  var text = minutes + "m " + seconds + "s ";
  document.getElementById("timer").innerHTML = text;

  // if the timer runs out, display "expired" and stop the timer
  if (distance < 0) {
    document.getElementById("timer").innerHTML = "EXPIRED";
    clearInterval(timer);
  }
}

// set the variable "twoMinutesFromNow" to two minutes and two seconds from right now
function setTimer() {
  twoMinutesFromNow = new Date();
  twoMinutesFromNow.setMinutes(twoMinutesFromNow.getMinutes() + 2);
  twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() + 2);

  console.log(win_count);

  // decrement the timer by 30 seconds for each 10 additional wins
  switch (win_count) {
    case 10:
      twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() - 30);
      break;

    case 20:
      twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() - 60);
      break;

    case 30:
      twoMinutesFromNow.setSeconds(twoMinutesFromNow.getSeconds() - 90);

    default:
      break;
  }
}

// start the timer
function startTimer() {
  setTimer();
  timer = setInterval(countdown, 1000);
}

// stop the timer
function stopTimer() {
  clearInterval(timer);
  win_count++;
}

try {

  let game = new MatchIt(canvas)


  start.addEventListener("click", function (event) {
    event.preventDefault();
    game.start().then(() => {
      countryName.innerHTML = "Country name: " + game.country;
      start.disabled = true;
      capital.innerHTML = game.getWordHolderText();
      guessButton.disabled = false;
    });

    // start the timer 
    startTimer();

  });

  guessForm.addEventListener("submit", function (e) {
    e.preventDefault();
    guessInput = document.getElementById("guessInput");
    game.guess(guessInput.value);
    capital.innerHTML = game.getWordHolderText();
    guessInput.value = "";

    if (game.isOver == true) {

      stopTimer();
      guessSubmitButton.disabled = true;
      guessInput.disabled = true;
      resetGame.style.display = "block";
      if (game.didWin == true) {
        alert("Congratulations! You won.");
      } else {
        alert("Game Lost.");
      }
    }
  });

  function resetGame() {
    location.reload();

  }

} catch (error) {

  console.error(error);
  alert(error);
}
