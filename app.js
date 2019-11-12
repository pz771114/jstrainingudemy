/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//define the variables

var roundScore,activePlayer,scores,gamePlaying;

//initial the values
roundScore = 0;
activePlayer = 0;
scores = [0, 0];

init();

//reset the interface values to zero

document.querySelector('#score-0').textContent = 0;
document.querySelector('#score-1').textContent = 0;

document.querySelector('#current-0').textContent = 0;
document.querySelector('#current-1').textContent = 0;

//hide the dice image
document.querySelector('.dice').style.display = 'none';

//attach the event the rolldice button
function rollHandler(e){
	e.preventDefault();
	if(gamePlaying)
	{
		//show the dice image
	document.querySelector('.dice').style.display='block';

	//set random number 
	var dice = Math.floor(Math.random() * 6 ) + 1;
	console.log(dice);
	dice.src='dice-'+dice+'.png';

	//check current player if player 1 or player 2
	activePlayer === 0 ? console.log('player 1') :console.log('player 2') ;

	if(dice !==1){
		//roll the dice
		//updat the score for current player
		roundScore += dice;
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
		
	}else{
		//end turn and switch player

			nextPlayer();

		}
	}
	

}


function nextPlayer(){
		activePlayer === 0 ?activePlayer = 1 : activePlayer =0;
		roundScore = 0;

		document.querySelector('#current-0').textContent = 0;
		document.querySelector('#current-1').textContent = 0;
		
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display='none';
}

//attach click event to hold button
//when clich hold button, the round score will update the player's score 
//reset the current player round score to zero, switch to the next player 
function holdHandler(e){
	e.preventDefault();
	if(gamePlaying)
	{
		//add current score to GLOBAL score
	scores[activePlayer] += roundScore;

	//update the current player socre
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

	//check if which player reaches the 100 points is the winner
	if(scores[activePlayer] >= 20){
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
		gamePlaying = false;
		//hide the current player indicator and the dice image
		document.querySelector('.dice').style.display='none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

	}else{
			nextPlayer();
		}
	}
	
	
}

document.querySelector('.btn-roll').addEventListener('click',rollHandler);

document.querySelector('.btn-hold').addEventListener('click',holdHandler);

document.querySelector('.btn-new').addEventListener('click',init);

function init()
{
	//start a new game and reset all the scores;
	gamePlaying = true;
	scores=[0,0];
	roundScore = 0;
	activePlayer = 0;
	document.querySelector('#score-0').textContent = '0';
	document.querySelector('#score-1').textContent = '0';
	
	document.querySelector('#current-0').textContent = '0';
	document.querySelector('#current-1').textContent = '0';
	
	//reset the player name
	document.querySelector('#name-0').textContent='Player 1';
	document.querySelector('#name-1').textContent='Player 2';
	
	//remove the winner class
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	//hide the dic image
	document.querySelector('.dice').style.display = 'none';
	
	//reset the active player indicater to player 1
	if(!document.querySelector('.player-0-panel').classList.contains('active'))
	{
		document.querySelector('.player-1-panel').classList.toggle('active');
		document.querySelector('.player-0-panel').classList.toggle('active');
	}
}	

