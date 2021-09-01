
//Global variables
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;


/*-------------------------------MAIN GAME CODE -----------------------------------*/

//start the game with a keypress
$(document).keypress(function(event){
    
    //need to check that game has started so only call nextSequence once 
    if(!started){
        $("h1").text("Level " + level);
        nextSequence();
        started  = true;

    }
        
});

//Game stays on until uesr gets pattern wrong. Don't have to create loop, game loops itself 
/* basic flow:

start game -> show sequence -> append sequnece to gamePattern array
after sequence shown, wait for user answer -> user answers -> check answer if matching gamePattern 

if (match): continue game -> next sequence
else : stop game, startover 

*/




//click handler that detects for user clicks
$(".btn").click(function(event){
    console.log(event);

    var userChosenColor = event.target.id
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

    console.log(userChosenColor);
    console.log(userClickedPattern);
    console.log(gamePattern);
    

});




//This function should start the squences of colors that are chosen at random for the user to pick 
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4); // should give a number from 0- 3
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" +randomChosenColor).fadeOut(250).fadeIn(250);
    playSound(randomChosenColor);

    //erase the what the user made 
    userClickedPattern = [] 
    level++;
    $("h1").text("Level " + level);


}
//this function is going to be used to play the sounds 
function playSound(name){
    var sound = new Audio("sounds/"+ name +".mp3")
    sound.play()
}
//this function will handle animations of the user clicking buttons
function animatePress(currentColor){
    $("#" +currentColor).addClass("pressed");
    
    setTimeout(function(){
        $("#" +currentColor).removeClass("pressed");
    },100);

}
//this function is used in order to handle checking the user answer with the game answer
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
        console.log("success");
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        console.log("wrong");
        startOver()
    }
}
function startOver(){
    level = 0;
    started = false
    gamePattern = []
}







