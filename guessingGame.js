/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var winningNumber;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
    var winningNumber=Math.random();
    if (winningNumber===0) winningNumber++;
    else winningNumber=Math.floor(winningNumber*100);
    return winningNumber;
}

// Fetch the Players Guess
var guesses=[];
var counter=0;

function playersGuessSubmission(){
    if (counter==0){ $(this).append('<audio src="addons/insert-coin.mp3" autoplay="autoplay"> </audio>')}
    $('#hint').remove()

    var playersGuess= Math.floor($('#guess').val());
    
    if (isNaN(playersGuess)=== true){
        $(this).prev().remove();
        $(this).parent().prepend($("<p class='advice'> That one wasn't a number! </p>"));
        $('#guess').val('');
        return
    }
    else if (playersGuess<0 || playersGuess>100){
        $(this).prev().remove();
        $(this).parent().prepend($("<p class='advice'> A little out of range on that one! </p>"));
        $('#guess').val('');
        return
    }
    if (guesses.indexOf(playersGuess)!=-1){
        $(this).prev().remove();
        $(this).parent().prepend($("<p class='advice'> You already guessed that one! </p>"));
        $('#guess').val('');
        return
    }
    else{
    guesses[counter]=playersGuess;
    counter++;
    }
    if (counter===1){
        winningNumber=generateWinningNumber();
    }
    
    if (playersGuess===winningNumber){
        $(this).prev().remove();
        $(this).parent().prepend($("<p class='advice'> CONGRATULATIONS, YOU'VE DONE IT!!!</p>"))
    }
        else if (counter===3){
            $(this).prev().remove();
            $(this).parent().prepend($("<p id='gameOver'> GAME OVER!!! </p>"));
            guesses=[];
            return
        }
        else if (playersGuess>winningNumber-5 && playersGuess<winningNumber+5){
            $(this).prev().remove();
            $(this).parent().prepend($('<p class="advice"> So Close!!!</p>'));
        }
        else if (playersGuess>winningNumber-10 && playersGuess<winningNumber+10){
            $(this).prev().remove();
            $(this).parent().prepend($('<p class="advice"> Not Quite!!!</p>'));
        }
        else{
            $(this).prev().remove();
            $(this).parent().prepend($('<p class="advice"> Not Even Close!!!</p>'));
        }
    
    $('#guess').val('');
}


// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
    if (guesses[counter-1]<winningNumber){
        $(this).next().remove();
        $(this).parent().append($('<p id="hint"> Too Low!!!</p>'));
    }
    else if (guesses[counter-1]>winningNumber){
        $(this).next().remove();
        $(this).parent().append($('<p id="hint"> Too High!!!</p>'));
    }
}

// Allow the "Player" to Play Again

playAgain=function playAgain(){
    $('#gameOver').remove();
    $('.advice').remove();
    $('#guess').val('');
    $('#hint').remove();
    counter=0;
    guesses=[];
    $(this).append('<audio src="addons/insert-coin.mp3" autoplay="autoplay" id="sound"> </audio>');

}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
                  $('#play').on('click', playersGuessSubmission);
                  $('#playagain').on('click',playAgain);
                  $('#help').on('click', provideHint);
                  
});











