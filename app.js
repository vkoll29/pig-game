var scores, gamePlaying, roundScore, activePlayer, winningScore;
init();
var prevDice;

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //generate a random number between 1 and 6.
        //You can't multiply by 7 directly because you need a minimum value of 1
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);

        var diceDOM1 = document.querySelector('#dice-1');
        var diceDOM2 = document.querySelector('#dice-2');

        //display the dice, the dice should sise should corresponf to the generated number
        diceDOM1.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM1.src = 'dice-' +dice1+ '.png';
        diceDOM2.src = 'dice-' +dice2+ '.png';

        if(dice1 !== 1 && dice2 !== 1){
            //add the total of the two dices to make the current value of the roundScore
            roundScore += dice1 + dice2;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        }else{
            nextPlayer();
        }

        //Uncomment this to activate the no two six rolled in a row rule
        /*
        if(dice === 6 && prevDice === 6){
            console.log("Two sixes rolled");
            scores[activePlayer] = 0;
            document.getElementById('score-' +activePlayer).textContent = scores[activePlayer];
            nextPlayer();
        }else{
            if(dice !== 1){
                //add the current scores
                roundScore += dice;
                //display the generated number on the current score
                document.getElementById('current-' +activePlayer).textContent = roundScore;

                prevDice = dice;
            }else{
                nextPlayer();
            }

        }
        */


    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        //add the roundScore of the current player to his total score
        scores[activePlayer] += roundScore;
        //display the total score on the UI
        document.getElementById('score-' +activePlayer).textContent = scores[activePlayer];

        //check if player has reached target
        winningScore = document.querySelector('.set-score').value;

        if(scores[activePlayer] >= winningScore){
            //update the UI to indicate he's won
            document.getElementById('name-' +activePlayer).textContent = "WINNER";
            document.querySelector('.player-' +activePlayer+ '-panel').classList.remove('active');
            document.querySelector('.player-' +activePlayer+ '-panel').classList.add('winner');
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            gamePlaying = false;

        }else{
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', init);




function init(){
    scores = [0, 0];
    gamePlaying = true;
    activePlayer = 0;
    roundScore = 0;
    prevDice = 0;

    //haven't used getElementsByClassName because it returns something of an array that you have to loop through
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //removing winner and active class from whoever won  in the last game
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //set player 0 to start the game
    document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer(){
    //ternary operator: if the activePlayer is 0 then change the activeplayer to 1 else change the activePlayer to 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //reset the roundscore
    roundScore = 0;
    prevDice = 0;

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    //remove the active class from the current player and add it to the next player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //remove the dice
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

}
