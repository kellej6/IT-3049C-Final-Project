class MatchIt {
    constructor(_canvas) {
        if (!_canvas) {
            throw new Error("invalid canvas provided");
        }
        this.country = "";
        this.capital = "";
        this.guessCounter = 0;
        this.guessArray = [];
        this.didWin;
        this.gameOver;
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
                    return data.name;
                });
        } catch {
            console.error(error);
            alert(error);
        }
    }

    async start() {
        var countriesIsoCode = ["AF",
            "AX",
            "AL",
            "DZ",
            "AS",
            "AD",
            "AO",
            "AI",
            "AQ",
            "AG",
            "AR",
            "AM",
            "AW",
            "AU",
            "AT",
            "AZ",
            "BS",
            "BH",
            "BD",
            "BB",
            "BY",
            "BE",
            "BZ",
            "BJ",
            "BM",
            "BT",
            "BO",
            "BQ",
            "BA",
            "BW",
            "BV",
            "BR",
            "IO",
            "BN",
            "BG",
            "BF",
            "BI",
            "KH",
            "CM",
            "CA",
            "CV",
            "KY",
            "CF",
            "TD",
            "CL",
            "CN",
            "CX",
            "CC",
            "CO",
            "KM",
            "CG",
            "CD",
            "CK",
            "CR",
            "CI",
            "HR",
            "CU",
            "CW",
            "CY",
            "CZ",
            "DK",
            "DJ",
            "DM",
            "DO",
            "EC",
            "EG",
            "SV",
            "GQ",
            "ER",
            "EE",
            "ET",
            "FK",
            "FO",
            "FJ",
            "FI",
            "FR",
            "GF",
            "PF",
            "TF",
            "GA",
            "GM",
            "GE",
            "DE",
            "GH",
            "GI",
            "GR",
            "GL",
            "GD",
            "GP",
            "GU",
            "GT",
            "GG",
            "GN",
            "GW",
            "GY",
            "HT",
            "HM",
            "VA",
            "HN",
            "HK",
            "HU",
            "IS",
            "IN",
            "ID",
            "IR",
            "IQ",
            "IE",
            "IM",
            "IL",
            "IT",
            "JM",
            "JP",
            "JE",
            "JO",
            "KZ",
            "KE",
            "KI",
            "KP",
            "KR",
            "XK",
            "KW",
            "KG",
            "LA",
            "LV",
            "LB",
            "LS",
            "LR",
            "LY",
            "LI",
            "LT",
            "LU",
            "MO",
            "MK",
            "MG",
            "MW",
            "MY",
            "MV",
            "ML",
            "MT",
            "MH",
            "MQ",
            "MR",
            "MU",
            "YT",
            "MX",
            "FM",
            "MD",
            "MC",
            "MN",
            "ME",
            "MS",
            "MA",
            "MZ",
            "MM",
            "NA",
            "NR",
            "NP",
            "NL",
            "AN",
            "NC",
            "NZ",
            "NI",
            "NE",
            "NG",
            "NU",
            "NF",
            "MP",
            "NO",
            "OM",
            "PK",
            "PW",
            "PS",
            "PA",
            "PG",
            "PY",
            "PE",
            "PH",
            "PN",
            "PL",
            "PT",
            "PR",
            "QA",
            "RS",
            "RE",
            "RO",
            "RU",
            "RW",
            "BL",
            "SH",
            "KN",
            "LC",
            "MF",
            "PM",
            "VC",
            "WS",
            "SM",
            "ST",
            "SA",
            "SN",
            "CS",
            "SC",
            "SL",
            "SG",
            "SX",
            "SK",
            "SI",
            "SB",
            "SO",
            "ZA",
            "GS",
            "SS",
            "ES",
            "LK",
            "SD",
            "SR",
            "SJ",
            "SZ",
            "SE",
            "CH",
            "SY",
            "TW",
            "TJ",
            "TZ",
            "TH",
            "TL",
            "TG",
            "TK",
            "TO",
            "TT",
            "TN",
            "TR",
            "XT",
            "TM",
            "TC",
            "TV",
            "UG",
            "UA",
            "AE",
            "GB",
            "US",
            "UM",
            "UY",
            "UZ",
            "VU",
            "VE",
            "VN",
            "VG",
            "VI",
            "WF",
            "EH",
            "YE",
            "ZM",
            "ZW"];

        var randValue = (Math.random() * 253);
        var isoCode = countriesIsoCode[Math.floor(randValue)];
        const randomCountry = await this.getRandomCountry(isoCode);
        this.country = randomCountry;
        return;
    }

    //This function will call only when the player will guess the wrong letter for the capital. 
    //If the user enter the letter which includes in the capital name then the checkWin function will be called
    onWrongGuess() {
        this.guessCounter++;
        if (this.guessCounter == 1) {
            // function for draw base of hangman
        } else if (this.guessCounter == 2) {
            //function for draw stand
        } else if (this.guessCounter == 3) {
            // function for draw top
        } else if (this.guessCounter == 4) {
            //function for draw hook to hang hangman
        } else if (this.guessCounter == 5) {
            //function for draw head   
        } else if (this.guessCounter == 6) {
            //function for draw body
        } else if (this.guessCounter == 7){
            //function for draw left arm
        } else if (this.guessCounter == 8){
            //function for draw right arm
        } else if (this.guessCounter == 9){
            //function for draw left leg
        } else if (this.guessCounter == 10){
            //function for draw right leg
            this.didWin = false;
            this.gameOver = true;
        }
    }

    checkWin(){
        
    }

}


