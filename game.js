
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = new Array();
var userClickedPattern = [];
let firstPress = true;

var level = 0;

$(document).on('keypress',function(e){

    if(firstPress)
    {
        firstPress = false;
        $("#level-title").text("Level "+level);
        nextSequence();
    }

    // console.log("Key Pressed : ",e.key);

});

const nextSequence = () =>
{
    userClickedPattern = [];

    const randomNumber = Math.floor(Math.random()*4);
    // console.log("Random Number : ",randomNumber);
    const randomChosenColor = buttonColors[randomNumber];
    // console.log("Random Color : ",randomChosenColor);
    gamePattern.push(randomChosenColor);
    // console.log("Game Pattern : ",gamePattern);

    level++;
    $("#level-title").text("Level "+level);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}

$(".btn").click(function(){


        const userChosenColor = $(this).attr("id");
        // console.log("User Chosen Color : ",userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        userClickedPattern.push(userChosenColor);
        // console.log("User Clicked Pattern : ",userClickedPattern);

        checkAnswer(userClickedPattern.length - 1);

    });

const checkAnswer = (currentLevel) =>{

    console.log("Current Level : ",currentLevel);
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length == gamePattern.length)
            setTimeout(nextSequence,1000);
    }
    else
    {
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over"),200
        });

        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        startOver();
    }

}

const startOver = () =>{

    level = 0;
    gamePattern = new Array();
    userClickedPattern = [];
    firstPress = true;

}

const playSound = (name) =>{

        $('#'+name).fadeOut(100).fadeIn(100);
        var audio = new Audio('./sounds/'+name+'.mp3');
        audio.play();

}

const animatePress = (currentColor) =>{

        console.log("Current Color : ",currentColor);
        $("#"+currentColor).addClass("pressed");

        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed")
        },100);
}

// nextSequence();
