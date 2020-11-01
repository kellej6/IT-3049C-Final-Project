let start = document.getElementById("startButton");
let canvas = document.getElementById("matchItCanvas");
let countryName = document.getElementById("country");


try{


    let game = new MatchIt(canvas)

    start.addEventListener("click", function(){
        event.preventDefault();
        game.start().then(()=>{
        countryName.innerHTML = "Country name: " + game.country;
        });
    });

} catch(error){
    console.error(error);
    alert(error);
}