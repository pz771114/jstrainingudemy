/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//define the variables

var currentScore,activePlayer;

//initial the values
currentScore = 0;
activePlayer = 0;


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

	//show the dice image
	var dice = document.querySelector('.dice');	
	dice.style.display='block';

	//set random number 
	var currentDice = Math.floor(Math.random() * 6 ) + 1;
	console.log(currentDice);
	dice.src='dice-'+currentDice+'.png';

	//check current player if player 1 or player 2
	activePlayer === 0 ? console.log('player 1') :console.log('player 2') ;

	if(currentDice !==1){
		//roll the dice
		//updat the score for current player
		var current_dice_value = document.querySelector('#current-'+activePlayer);
		var current_score = document.querySelector('#score-'+activePlayer);
		
		var current_element = document.querySelector('#current-' + activePlayer);
		currentScore += currentDice;
				
		current_element.textContent = currentScore;

	}else{
		//end turn and switch player
		activePlayer === 0 ?activePlayer = 1 : activePlayer =0;
		
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
	}
}
document.querySelector('.btn-roll').addEventListener('click',rollHandler);

