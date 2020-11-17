let start = document.getElementById("startButton");
let canvas = document.getElementById("matchItCanvas");
let countryName = document.getElementById("country");
let guessButton = document.getElementById("guessSubmitButton");
let playAgainButton = document.getElementById("resetGame");
let capital = document.getElementById("capital");

let countDownDate = new Date();
countDownDate.setMinutes(countDownDate.getMinutes() + 2);

function startTimer() {
    let now = new Date().getTime();
    let timeDistance = countDownDate - now;

    var minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDistance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s";

    if (timeDistance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
        playAgainButton.disabled = false;
        guessButton.disabled = true;
    }
};

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
        setInterval(startTimer, 1000);
    });

    guessForm.addEventListener("submit", function (e) {
        e.preventDefault();
        guessInput = document.getElementById("guessInput");
        game.guess(guessInput.value);
        capital.innerHTML = game.getWordHolderText();
        guessInput.value = "";
        if(game.isOver == true){
          guessButton.disabled = true;
          guessInput.disabled = true;
          resetGame.style.display = "block";
          if(game.didWin == true){
            alert("Congratulations! You won.");
          } else{
            alert("Game Lost.");
          }
        }
      });


} catch (error) {
    console.error(error);
    alert(error);
}
