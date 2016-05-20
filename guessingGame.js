//IIFE Function
(function(){


var winningNumber;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
    var winningNumber=Math.random();
    if (winningNumber===0) winningNumber++;
    else winningNumber=Math.floor(winningNumber*100);
    return winningNumber;
}


var guesses=[];
var counter=0;
var initialSubmitCount=0;
var youveDoneItMaybe=0;
 
 /////////////// Function for displaying guesses to 'player'
 function displayTheGuess(){
 para=document.createElement('p');
 strGuess="You've already guessed: ";
 for (var i=0; i<guesses.length; i++){
 strGuess+=guesses[i] + " ";
 }
 para.textContent = strGuess;
 $(para).addClass('display');
 }
///////////////
 
// Fetch the Players Guess and Checks it
 
 function playersGuessSubmission(){
 if (counter>3 || youveDoneItMaybe!=0) return;
 
 
 $('.numGuesses').remove();
 $('#hint').remove();
 $('.display').remove();
 
    var playersGuess= Math.floor($('#guess').val());
    
    if (isNaN(playersGuess)=== true || playersGuess===''){
        $(this).prev().remove();
        $(this).parent().prepend($("<p class='advice'> That one wasn't a number! </p>"));
        $('#guess').val('');
        ///////Display the guesses to player so they do not dissapear when these "invalid guess" messages show up"
        displayTheGuess()
        $(this).parent().parent().last().append($(para));
 
        $('#guess').val('');
 
        if (counter===1 && youveDoneItMaybe==0) $(this).parent().parent().last().append($('<p class="numGuesses"> You got 2 more shots!</p>'));
        else if (counter===2 && youveDoneItMaybe==0){ $(this).parent().parent().last().append($('<p class="numGuesses"> You got 1 more shot!</p>'))};
 

        return
    }
    else if (playersGuess<0 || playersGuess>100){
        $(this).prev().remove();
        $(this).parent().prepend($("<p class='advice'> A little out of range on that one! </p>"));
        $('#guess').val('');
 ///////Display the guesses to player so they do not dissapear when these "invalid guess" messages show up"
        displayTheGuess()
        $(this).parent().parent().last().append($(para));
 
        $('#guess').val('');
 
        if (counter===1 && youveDoneItMaybe==0) $(this).parent().parent().last().append($('<p class="numGuesses"> You got 2 more shots!</p>'));
        else if (counter===2 && youveDoneItMaybe==0){ $(this).parent().parent().last().append($('<p class="numGuesses"> You got 1 more shot!</p>'))};
 

        return
    }
    if (counter==0 && initialSubmitCount==0){ $(this).append('<audio src="addons/insert-coin.mp3" autoplay="autoplay"> </audio>');
        initialSubmitCount++;}
    if (guesses.indexOf(playersGuess)!=-1){
        $(this).prev().remove();
        $(this).parent().prepend($("<p class='advice'> You already guessed that one! </p>"));
        $('#guess').val('');
 ///////Display the guesses to player so they do not dissapear when these "invalid guess" messages show up"
        displayTheGuess()
        $(this).parent().parent().last().append($(para));
 
        $('#guess').val('');
 
        if (counter===1 && youveDoneItMaybe==0) $(this).parent().parent().last().append($('<p class="numGuesses"> You got 2 more shots!</p>'));
        else if (counter===2 && youveDoneItMaybe==0){ $(this).parent().parent().last().append($('<p class="numGuesses"> You got 1 more shot!</p>'))};
 
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
        $(this).parent().prepend($("<p> <img  src='addons/carnivalPrize.jpg' style='height:150px;width:150px' id='prizePic'> </p>"))
        $(this).parent().prepend($("<p id='prize'> Choose your prize!! </p>"));
        $(this).parent().prepend($("<p id='winner'> CONGRATULATIONS, YOU'VE DONE IT!!!</p>"));
        $(this).append('<audio src="addons/winner.mp3" autoplay="autoplay"> </audio>')

               youveDoneItMaybe=1;
    }
        else if (counter===3){
            $(this).prev().remove();
            $(this).parent().prepend($("<p id='gameOver'> GAME OVER!!! </p>"));
            youveDoneItMaybe=1;
 
        }
        else if (playersGuess>winningNumber-5 && playersGuess<winningNumber+5){
            $(this).prev().remove();
            $(this).parent().prepend($('<p class="advice"> So Close!!!</p>'));
        }
        else if (playersGuess>winningNumber-15 && playersGuess<winningNumber+15){
            $(this).prev().remove();
            $(this).parent().prepend($('<p class="advice"> Not Quite There!!!</p>'));
        }
        else{
            $(this).prev().remove();
            $(this).parent().prepend($('<p class="advice"> Not Even Close!!!</p>'));
        }
 
 //display the guesses to 'player'
 displayTheGuess()
 $(this).parent().parent().last().append($(para));

    $('#guess').val('');
 
 if (counter===1 && youveDoneItMaybe==0) $(this).parent().parent().last().append($('<p class="numGuesses"> You got 2 more shots!</p>'));
 else if (counter===2 && youveDoneItMaybe==0){ $(this).parent().parent().last().append($('<p class="numGuesses"> You got 1 more shot!</p>'))};
 
}


// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
    if (counter>3 || youveDoneItMaybe!=0) return;
    if (guesses[counter-1]<winningNumber){
        $(this).next().remove();
        $(this).parent().append($('<p id="hint"> Too low on that last one!!!</p>'));
    }
    else if (guesses[counter-1]>winningNumber){
        $(this).next().remove();
        $(this).parent().append($('<p id="hint"> Too high on that last one!!!</p>'));
    }
}

// Allow the "Player" to Play Again

function playAgain(){
//////////////////
  $('.display').remove();
 /////////////////
 
    $('.numGuesses').remove();
    $('#gameOver').remove();
    $('.advice').remove();
    $('#winner').remove();
    $('#guess').val('');
    $('#hint').remove();
    $('#prizePic').remove();
    $('#prize').remove();
    counter=0;
    guesses=[];
    $(this).append('<audio src="addons/insert-coin.mp3" autoplay="autoplay"> </audio>');
    youveDoneItMaybe=0;
}

/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
                  $('#play').on('click', playersGuessSubmission);
                  $('#guess').keyup(function(event){
                            if(event.keyCode == 13){
                            $('#play').click();
                            }
                            });
                  $('#playagain').on('click',playAgain);
                  $('#help').on('click', provideHint);
                  
});


})();









