//3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow" .
var buttonColours = ["red", "blue", "green", "yellow"];


var gamePattern = [];
var userClickedPattern = [];


var level = 0;
var started = false;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  
})


$(".btn").click(function(){
  // level++;

  // $("#level-title").text("Level " + level);
  var userChosenColour = $(this).attr("id")
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);

  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1)
  
})


function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

    console.log("success");
    
    if(userClickedPattern.length === gamePattern.length){

      setTimeout(function (){
        nextSequence();
      },1000);
    }
    
  }
  else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    
    $("#level-title").text("Game Over, Press Any key to Restart");

    startOver();
  }

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){
    $("." + currentColour).removeClass("pressed");
}, 100);
}

function nextSequence() {
  

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour)

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}





