let start = document.getElementById("startButton");
let canvas = document.getElementById("matchItCanvas");
let countryName = document.getElementById("country");

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
    }
};

try {

    let game = new MatchIt(canvas)

    start.addEventListener("click", function () {
        event.preventDefault();
        game.start().then(() => {
            countryName.innerHTML = "Country name: " + game.country;

        });

        // start the timer
        setInterval(startTimer, 1000);
    });

} catch (error) {
    console.error(error);
    alert(error);
}