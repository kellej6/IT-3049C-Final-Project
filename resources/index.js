let start = document.getElementById("startButton");
let canvas = document.getElementById("matchItCanvas");
let countryName = document.getElementById("country");

// timer
let countDownDate = new Date();
countDownDate.setMinutes(countDownDate.getMinutes() + 2);

let countDown = setInterval(function () {

    let now = new Date().getTime();
    let timeDistance = countDownDate - now;

    var minutes = Math.floor((timeDistance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDistance % (1000 * 60)) / 1000) * minutes;

    document.getElementById("timer").innerHTML = seconds + "s";

    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
    }

}, 1000);

try {


    let game = new MatchIt(canvas)

    start.addEventListener("click", function () {
        event.preventDefault();
        game.start().then(() => {
            countryName.innerHTML = "Country name: " + game.country;
        });
    });

} catch (error) {
    console.error(error);
    alert(error);
}
