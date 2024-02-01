/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer;
init();

document.querySelector(".dice").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function () {
  //1. Generate a random number from 1 to 6
  var dice = Math.floor(Math.random() * 6 + 1);

  // 2. Display the result
  document.querySelector(".dice").style.display = "block";
  var diceDom = document.querySelector(".dice");
  diceDom.src = "dice-" + dice + ".png";
  document.querySelector("#current-" + activePlayer).textContent = dice;

  // 3. Update the round score If the rolled score number was not a 1
  if (dice !== 1) {
    //add score
    roundScore += dice;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    //next player turn
    nextPlayer();
  }
});

var btnHold = document.querySelector(".btn-hold").addEventListener("click", function () {
            //    Add current score to Global score
            score[activePlayer] += roundScore;

            document.getElementById("score-" + activePlayer).textContent =
            score[activePlayer];

            // update the UI

            // Check if player won the game
            if (score[activePlayer] >= 10) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.display = "none";
            document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
            document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
            document.querySelector('.btn-hold').disabled = true;
            document.querySelector('.btn-roll').disabled = true;
            } else {
            nextPlayer();
            }
  });

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  score = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = 0;
  document.getElementById("score-1").textContent = 0;
  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector('.btn-hold').disabled = false;
  document.querySelector('.btn-roll').disabled = false;
}
