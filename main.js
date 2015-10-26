//game object setup
var game = {};
game.simonArr = [];
game.players = [];
game.winner = {};
game.playerTurn = false;
game.counter = 0;

//global variables
var randomNumber;
var colors = ['yellow', 'blue', 'red', 'green'];
var maxScore = 2;

var player1 = {         //player 1 object
      name: "player1",
      playerArr: [],
      highestArr: [],
      score: 0
}

var player2 = {       //player 2 object
      name: "player2",
      playerArr: [],
      highestArr: [],
      score: 0
}

var playSound = function(clip){				//plays the sound that corresponds to the pad chosen
		var sound= $('.sound'+clip)[0];
		console.log(sound);
		console.log($('.sound'+clip));
		//sound.currentTime=0;				//resets audio position to the start of the clip
		sound.play();						//play the sound
	}

function restart(){
  player1.score = 0;
  $('#player1Score').text("Player 1 Score: " + player1.score);
  player2.score = 0;
  $('#player2Score').text("Player 2 Score: " + player2.score);
  animationCounter = 0;
  game.simonArr = [];
  game.counter = 0;
  player1.playerArr = [];
  player2.playerArr = [];
  countDown();
}

function countDown() {
  //timerSeconds
  var timerSeconds = 4;
  var countDownClock = setInterval(function(){
    $('.countDown').text(--timerSeconds);
    if (timerSeconds===0){
      clearInterval(countDownClock);
      startGame();
      $('.countDown').text(game.playerTurn.name + ' Go!');
    }
  },1000)
};

// flash function this will make simon create flash for players to follow
var animationCounter = 0;
function flash(){
  if (animationCounter < game.simonArr.length){
    $('.box.'+ colors[game.simonArr[animationCounter]]).addClass('flash');
//this gets the animation counter and the position within simonArr and calls
//the sound based on the position
    $('.sound')[game.simonArr[animationCounter]].play();
    window.setTimeout(function(){
        $('.box.'+ colors[game.simonArr[animationCounter]]).removeClass('flash');
        animationCounter++;
        window.setTimeout(flash, 300);
    }, 500 - game.playerTurn.score * 50);
  };
};

// switch player turn
function switchTurn() {
  if(game.playerTurn == player1) {
    game.playerTurn = player2;
  } else {
    game.playerTurn = player1;
  }
  console.log(game.playerTurn);
  //game.playerTurn.name;
}

function checkAnswer(sArr, pArr, player){
          //checking if arrays match
         if(sArr.toString() == pArr.toString()){
           console.log('You scored a point!');
           player.score += 1;
           game.counter +=1;
           if(player == player1){
             $('#player1Score').text("Player 1 Score: " + player.score);
           }else if (player == player2) {
             $('#player2Score').text("Player 2 Score: " + player.score);
           }
           if(player.score == maxScore){
             alert("Game over, player: " + player.name + " wins!");
             return;
           }
           player1.playerArr = [];
           player2.playerArr = [];
           reset();
         } else {
           console.log('Answer incorrect');
           player1.playerArr = [];
           player2.playerArr = [];
           reset();
         }
}

//reset simon
function reset(){
  switchTurn();
  animationCounter = 0;
  countDown();
}

//start game. This will start in the beginning of game.
function startGame(){
  $('.box').off();
  game.simonArr = [];
  //begining start simon logic
  var upTo = 4 + game.counter;
  console.log("Game Started");
  for (i=0; i < upTo; i++){
    var randomNumber = Math.floor(Math.random()*4);
    game.simonArr.push(randomNumber);
    //plug play sound function here?
    console.log(colors[randomNumber]);
  }
  //if game.playerTurn is not set yet, default it to player1
  game.playerTurn = game.playerTurn ? game.playerTurn : player1;
  animationCounter = 0;
  flash();
  // playSound();
  //when .box divs are pushed, this will push clicks into the player array
  //and compare them to simon's array. Then it will call the checkanswer func.
  $('.box').click(function(){
    console.log("player turn:", game.playerTurn.name);
    game.playerTurn.playerArr.push(Number($(this).attr('data-num')));
    //sound here
    $('.sound')[game.playerTurn.playerArr[game.playerTurn.playerArr.length - 1]].play();
    if(game.simonArr.length == game.playerTurn.playerArr.length){
      checkAnswer(game.simonArr, game.playerTurn.playerArr, game.playerTurn);
    }else{
        console.log("player array", game.playerTurn.playerArr);
        }
  });
}

//Press this button to start game!!
$('.goButton').on( "click", function(){
  console.log("clicked start button");
  countDown();
})

$('.restartButton').on("click", function(){
  console.log("clicked restart button");
  restart();
});
