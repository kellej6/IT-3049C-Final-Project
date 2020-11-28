let start = document.getElementById("startButton");
let canvas = document.getElementById("matchItCanvas");
let countryName = document.getElementById("country");
let guessButton = document.getElementById("guessSubmitButton");
let playAgainButton = document.getElementById("resetGame");
let capital = document.getElementById("capital");
let gameScore = document.getElementById("gameScore");

let timer;  // the timer function
let twoMinutesFromNow; // the time two minutes from now
let win_count = 0; //  the count of times the player has won
let distance;

let game = new MatchIt(canvas)

function countdown() {
  // the time as of right now
  let rightnow = new Date().getTime();

  // the time differential between right now and two minutes from now
  distance = twoMinutesFromNow - rightnow;
  console.log(distance);

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

  function startFunction(){

    game.start().then(() => {
      document.getElementById("countryFlag").src = "https://img.geonames.org/flags/x/" + game.isoCode.toLowerCase() + ".gif";
      document.getElementById("countryFlag").style.display = "block";
      countryName.innerHTML = "Country name: " + game.country;
      start.disabled = true;
      capital.innerHTML = game.getWordHolderText();
      guessButton.disabled = false;
      playAgainButton.disabled=true;

    });
  }

  function passToGuessInput(id){
    document.getElementById("guessInput").value = id;
    guessInput = document.getElementById("guessInput"); //h
    document.getElementById(guessInput.value).disabled = true;
    
  }

  guessForm.addEventListener("submit", function (e) {
    e.preventDefault();
    guessInput = document.getElementById("guessInput"); //h
    //document.getElementById(guessInput.value).disabled = true;
    game.guess(guessInput.value);
    capital.innerHTML = game.getWordHolderText();
    guessInput.value = "";
    if(game.isOver == true){
      
      if(game.userGuessedCapital == true && distance > 0){
        let buttons = document.getElementsByClassName("letter btn btn-primary");
        for(var counter = 0; counter < buttons.length; counter++){
          buttons[counter].disabled = false;
          }
        game.resetGameData();
        capital.innerHTML = "";
        countryName.innerHTML = "Country name: ";
        win_count++;
        gameScore.innerHTML = "Your Score is: " + game.score;
        startFunction();
      } else if (game.userGuessedCapital == false){
        guessSubmitButton.disabled = true;
        guessInput.disabled = true;
        playAgainButton.disabled = false;
        gameScore.innerHTML = "Your Score is: " + game.score;
        stopTimer();
        alert("Unfortunately! You did not guess.");
      }    
    }   
});       

  
  function resetGame() {
    location.reload()

  };
 try{  
} catch (error) {
  console.error(error);
  alert(error);
}   
 // }
//}
