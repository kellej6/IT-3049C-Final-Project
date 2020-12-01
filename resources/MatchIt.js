class MatchIt {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error("invalid canvas provided");
    }
    this.country = "";
    this.capital = "";
    this.wordHolderCounter = 0;
    this.score = 0;
    this.guessCounter = 0;
    this.guesses = new Array();
    this.previousGuessedWord = new Array();
    this.isoCode;
    // this.didWin;
    // this.isOver;

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  async getRandomCountry(isoCode) {
    try {
      let url = "https://restcountries.eu/rest/v2/alpha/" + isoCode;
      return await fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.capital = data.capital.toLowerCase();

          // need a replace non-English characters function
          // a
          this.capital = this.capital.replace(String.fromCharCode(224), 'a')
          this.capital = this.capital.replace(String.fromCharCode(225), 'a')
          this.capital = this.capital.replace(String.fromCharCode(226), 'a')
          this.capital = this.capital.replace(String.fromCharCode(227), 'a')
          this.capital = this.capital.replace(String.fromCharCode(228), 'a')
          this.capital = this.capital.replace(String.fromCharCode(229), 'a')
          // c
          this.capital = this.capital.replace(String.fromCharCode(231), 'c')
          // e
          this.capital = this.capital.replace(String.fromCharCode(232), 'e')
          this.capital = this.capital.replace(String.fromCharCode(233), 'e')
          this.capital = this.capital.replace(String.fromCharCode(234), 'e')
          this.capital = this.capital.replace(String.fromCharCode(235), 'e')
          // i
          this.capital = this.capital.replace(String.fromCharCode(236), 'i')
          this.capital = this.capital.replace(String.fromCharCode(237), 'i')
          this.capital = this.capital.replace(String.fromCharCode(238), 'i')
          this.capital = this.capital.replace(String.fromCharCode(239), 'i')
          // n
          this.capital = this.capital.replace(String.fromCharCode(241), 'n')
          // o
          this.capital = this.capital.replace(String.fromCharCode(240), 'o')
          this.capital = this.capital.replace(String.fromCharCode(242), 'o')
          this.capital = this.capital.replace(String.fromCharCode(243), 'o')
          this.capital = this.capital.replace(String.fromCharCode(244), 'o')
          this.capital = this.capital.replace(String.fromCharCode(245), 'o')
          this.capital = this.capital.replace(String.fromCharCode(246), 'o')

          return data.name;
        });
    } catch {
      console.error(error);
      alert(error);
    }
  }

  async start() {
    const countriesIsoCode = ["AF", "AX", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BQ", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CW", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GG", "GN", "GW", "GY", "HT", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IM", "IL", "IT", "JM", "JP", "JE", "JO", "KZ", "KE", "KI", "KP", "KR", "XK", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MK", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "ME", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "AN", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RS", "RE", "RO", "RU", "RW", "BL", "SH", "KN", "LC", "MF", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "CS", "SC", "SL", "SG", "SX", "SK", "SI", "SB", "SO", "ZA", "GS", "SS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "XT", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW"];

    var randValue = (Math.random() * 252);
    this.isoCode = countriesIsoCode[Math.floor(randValue)];
    const randomCountry = await this.getRandomCountry(this.isoCode);
    this.country = randomCountry;
    this.clearCanvas();
    return;
  }

  guess(letter) {
    var checkCase = /^[A-Za-z]+$/;
    try {
      if (letter.length == 0) {
        throw new Error("Please provide a letter.");
      } else if (!(letter.match(checkCase)) && letter == " ") {
        throw new Error("Guess should be a letter.");
      } else if (letter.length > 1) {
        throw new Error("Please provide one letter.");
      } else {
        letter = letter.toLowerCase();
        if (this.guesses.includes(letter)) {
          throw new Error("Letter already exists, please provide a new one.");
        } else {
          this.guesses.push(letter);
        }
        if (this.capital.includes(letter)) {
          this.checkWin();
        } else {
          this.onWrongGuess();
        }
      }
    }
    catch (error) {
      // console.error(error);
      alert(error);
    }
  }

  //This function will call only when the player will guess the wrong letter for the capital. 
  //If the user enter the letter which includes in the capital name then the checkWin function will be called
  onWrongGuess() {
    this.guessCounter++;
    switch (this.guessCounter) {
      case 1:
        // function for draw base of hangman
        this.drawBase();
        break;
      case 2:
        //function for draw stand
        this.drawMainBeam();
        break;
      case 3:
        // function for draw top
        this.drawTop();
        break;
      case 4:
        //function for draw hook to hang hangman
        this.drawNoose();
        break;
      case 5:
        //function for draw head
        this.drawHead();
        break;
      case 6:
        //function for draw body
        this.drawBody();
        break;
      case 7:
        //function for draw left arm
        this.drawLeftArm();
        break;
      case 8:
        //function for draw right arm
        this.drawRightArm();
        break;
      case 9:
        //function for draw left leg
        this.drawLeftLeg();
        break;
      case 10:
        //function for draw right leg
        this.drawRightLeg();
        this.userGuessedCapital = false;

        this.isOver = true;
        break;
    }
  }

  checkWin() {
    const guessedWord = this.getWordHolderText();
    if (guessedWord === this.capital) {
      this.score++;
      this.userGuessedCapital = true;
      this.isOver = true;

    }
  }

  getWordHolderText() {

    let wordHolder = "";
    var checkCase = /^[A-Za-z]+$/;

    // console.log(this.capital);

    for (let i = 0; i < this.capital.length; i++) {
      if (this.capital[i] == this.guesses[this.guesses.length - 1]) { wordHolder += this.capital[i]; }
      else if (this.capital[i] === " ") { wordHolder += " " }
      else if (this.capital[i] === "-") { wordHolder += "-" }
      else { wordHolder += "_"; }
    }

    if (this.wordHolderCounter == 0) {
      this.previousGuessedWord.push(wordHolder);
      this.wordHolderCounter++;
    }

    let previousGuessed = this.previousGuessedWord[this.previousGuessedWord.length - 1].split("");
    let i = 0;

    while (i < this.capital.length) {
      if (previousGuessed[i] == "_" && wordHolder[i].match(checkCase)) {
        previousGuessed[i] = wordHolder[i];
      }
      i++;
    }
    this.previousGuessedWord[this.previousGuessedWord.length - 1] = previousGuessed.join("");
    return previousGuessed.join("");

  }

  resetGameData() {
    this.country = "";
    this.capital = "";
    this.wordHolderCounter = 0;
    this.guessCounter = 0;
    this.guesses = [];
    this.previousGuessedWord = [];
    this.isOver = false;
    this.userGuessedCapital = false;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBase() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(162.5, 290, 175, 10);
  }

  drawMainBeam() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(245, 10, 10, 280);
  }

  drawNoose() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(395, 10, 10, 50);
  }

  drawTop() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(245, 10, 150, 10);
  }

  drawHead() {
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(400, 100, 40, 0, 2 * Math.PI);
    this.ctx.stroke();
  }

  drawBody() {
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.moveTo(400, 140);
    this.ctx.lineTo(400, 270);
    this.ctx.stroke();
  }

  drawLeftArm() {
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.moveTo(400, 140);
    this.ctx.lineTo(320, 200);
    this.ctx.stroke();
  }

  drawRightArm() {
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.moveTo(400, 140);
    this.ctx.lineTo(490, 200);
    this.ctx.stroke();
  }

  drawLeftLeg() {
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.moveTo(400, 270);
    this.ctx.lineTo(320, 390);
    this.ctx.stroke();
  }

  drawRightLeg() {
    this.ctx.strokeStyle = 'white';
    this.ctx.beginPath();
    this.ctx.moveTo(400, 270);
    this.ctx.lineTo(490, 390);
    this.ctx.stroke();
  }
}
