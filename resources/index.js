let start = document.getElementById("startButton");
let canvas = document.getElementById("matchItCanvas");
let countryName = document.getElementById("country");
let guessButton = document.getElementById("guess");
let playAgainButton = document.getElementById("resetGame");
//var interval = setInterval(startTimer, 1000);
let countDownDate = new Date();
countDownDate.setMinutes(countDownDate.getMinutes() + 2);
//var interval;
function startTimer() {
    let now = new Date().getTime();
    let timeDistance = countDownDate - now;

    var minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDistance % (1000 * 60)) / 1000);
    
    document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s";

    if (timeDistance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "EXPIRED";
    }

};

var hangman = {
  alphabetArray: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  wordList: ["pretty", "gorgeous", "beautiful"],       // array of words
  assestsLoaded: 0,   // game assets
  theWord: "",        // selected from the fetch api
  guessWord: [],      // array of letters in theWord
  newGuessWord: "",    // string the user needs to guess (shown as ????)
  theCanvas: $("#hangmancanvas").get(0),
  numWrong: 0,
  gameOver: false
}

function createGuessWord() {
  hangman.guessWord = new Array();
  var randomWord = Math.floor(Math.random() * hangman.wordList.length);
  hangman.theWord = hangman.wordList[randomWord];

  if (hangman.theWord.length < 3 || hangman.theWord.length > 12) {
      createGuessWord();
  }

  alert(hangman.theWord);
  console.log(hangman.theWord);

  for (var i = 0; i < hangman.theWord.length; i++) {
      if (hangman.theWord.charAt(i) == "-") {
          hangman.guessWord[i] = "-";
      }
      else {
          hangman.guessWord[i] = "?";
      }
  }

  hangman.newGuessWord = hangman.guessWord.join("");
}

function drawCanvas() {
  clearCanvas(ctx, hangman.theCanvas);
  ctx.font = "bold 35px serif";
  ctx.fillStyle = "#0000FF";
  ctx.fillText(hangman.newGuessWord, 50, 27);

  if (hangman.gameOver) {
      disableButtons();
      setTimeout(doGameOver, 1500);
  }
}

for (var i = 0; i < hangman.alphabetArray.length; i++) {
  $('<button/>', {
      text: hangman.alphabetArray[i],
      id: 'btn_' + hangman.alphabetArray[i],
      width: "30px",
      click: function (event) {
          checkGuess(event, false);
      }
  }).appendTo("#buttondiv");
}

function getWordHolderText() {
 
  let wordHolder = "";
  var checkCase = /^[A-Za-z]+$/;
  for (let i = 0; i < this.word.length; i++){
  if(this.word[i] == this.guesses[this.guesses.length -1]){
  wordHolder += this.word[i];
  }
  else{
  wordHolder += "_";
  }
  }
  
  if(this.wordHolderCounter == 0){
  this.previousGuessedWord.push(wordHolder);
  this.wordHolderCounter++;
  }
  
  let previousGuessed = this.previousGuessedWord[this.previousGuessedWord.length - 1].split("");
  let i = 0;
  while(i < this.word.length){
  if(previousGuessed[i] == "_" && wordHolder[i].match(checkCase)){
  previousGuessed[i] = wordHolder[i];
  }
  i++;
  }
  this.previousGuessedWord[this.previousGuessedWord.length - 1] = previousGuessed.join("");
  return previousGuessed.join("");
  
  }

function disableButtons() {
  $("#buttondiv button").attr("disabled", "disabled");
}

// disableButtons();

function enableButtons() {
  $("#buttondiv button").removeAttr("disabled");
}

function checkGuess(event, isKeyPress) {

  console.log(event)

  var currentButton;
  var theLetter;
  var correctGuess = false;

  currentButton = $(event.target);
  $(currentButton).attr("disabled", "disabled");

  theLetter = $(currentButton).text().toLowerCase();
  // alert(theLetter);

  for (var i = 0; i < hangman.theWord.length; i++) {
      if (hangman.theWord.charAt(i) == theLetter) {
          hangman.guessWord[i] = theLetter;
          correctGuess = true;
      }
  }

  hangman.newGuessWord = hangman.guessWord.join("");

  if (!correctGuess) {
      hangman.numWrong++
  }

  if (hangman.newGuessWord == hangman.theWord) {
      // alert("You WIN!");
      disableButtons();
      setTimeout(doWin, 1500);
  }

  if (hangman.numWrong == 6) {
      // alert("You LOSE!");
      hangman.gameOver = true;
  }

  drawCanvas();
}
;

try {

    let game = new MatchIt(canvas)

    start.addEventListener("click", function (e) {
        event.preventDefault();
        game.start().then(() => {
            countryName.innerHTML = "Country name: " + game.country;
          
            start.disabled = true;
            guessButton.disabled = false;
            playAgainButton.disabled = false;

            

        // start the timer
        
        setInterval(startTimer, 1000)
    })   
    });     

    resetGame.addEventListener('click', function (e){
            
        countryName.innerHTML = "";        
        start.disabled = false;
        guessButton.disabled = true;
        playAgainButton.disabled = true;
        
    });


     } catch (error) {
    console.error(error);
    alert(error);
}
 

