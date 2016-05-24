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
var youveDoneItMaybe=0; //if this is always only 1 or 0, you could use true/false instead
 
 /////////////// Function for displaying guesses to 'player'
 function displayTheGuess(){
 para=document.createElement('p'); 
 /*
 it looks like you're creating variables inside this function
 it's true that you can use them on the parent scope by creating them in here,
 but it's not really a recommended methodology, as they can get hard to keep track of.

 better would be to define them on lines 23 and 24 with the rest of your variables
 */

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
    
                //isNaN already returns a boolean, so no need to check for truthy here
    if (isNaN(playersGuess)=== true || playersGuess===''){
        $(this).prev().remove();
        $(this).parent().prepend($("<p class='advice'> That one wasn't a number! </p>"));
        $('#guess').val('');
        ///////Display the guesses to player so they do not dissapear when these "invalid guess" messages show up"
        displayTheGuess() //nice job putting all the displayTheGuess code in one place
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
/* you could probably make a function abstract away all that copy and pasting!
    function handleGuess(){
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
*/

/*and because you do the advice bit on its own later on, that could be its own thing too
    function giveFeedback(advice){
        $(this).prev().remove();
        $(this).parent().prepend($('<p class="advice">' + advice + '</p>'));
    }

    giveFeedback('So Close!')
    giveFeedback('Not Quite There!'), etc
*/

/*that could then further reduce the length of the handleguess function!! */

/*better yet, you could use template strings from the new ES6 syntax
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
*/

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

        /*this is super trivial and nitpicky, but may come up later as a trivia question
        instead of jQuerying for $(this) 5 times, you can do it once and then save it as a variable
        var $this = $(this)
        
        mostly, it will make the code more performant because you won't have to traverse through the DOM
        5 times for the same element! but i think on this scale, it's fine */

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
                            $('#play').click(); //this is fun
                            }
                            });
                  $('#playagain').on('click',playAgain);
                  $('#help').on('click', provideHint);
                  
}); //this is nice and neat


})();


/* overall comments!!
try and keep your functions short, and abstract as much repeated code as possible into new functions
you might have heard of DRY, or Don't Repeat Yourself, which will get drilled into your head
over the course of the curriculum.

oh also the indentation was a little bit crazy but you can fix that with sublime's reindent feature (in the Edit > Line menu)

but you were super thorough and covered a lot of edge cases, which is good 👍
*/

/*one more thing,
it might be nice for the end user to have the input disabled if there is no value entered.
that way if you accidentally hit return without having typed, it wont give you a 0 guess.

apparently, Math.floor('') === 0, because JS is funny in that way
*/



