$(document).ready(function(){
  $("#entry").on("keydown", keypressCheck);
  $("#entry").focus();
  untitledTypingGame();
});


var Player = function () {
this.name = "";
this.score = 0;
this.hp = 100;
};

Player.prototype.newPlayer = function() {
  this.name = prompt("Enter Name:");
};

var player1 = new Player();
//player1.newPlayer();
var wordList = ["DAD", "FALL", "LASS", "HALL", "GEAR", "SLEEP", "BARBER", "APPLE", "READY", "QUICK", "BILLED", "POPPED", "TOPAZ", "QUIPPED", "ZOOLOGY", "POX", "CIRCUMFLEX", "CONQUEROR", "QUIXOTICALLY", "EXQUISITENESSES", "VENTRILOQUIZING", "TRANQUILLIZERS", "QUANTIZATON", "LIQUIDIZED"];


var Enemy = function () {
  this.word = "";
  this.hp = 10;
  this.escaped = 0;
};

var enemy1 = new Enemy();
var enemyEscaped = false;

Enemy.prototype.splitWord = function () {
  var wordArray = this.word.split("");
  this.wordArray = wordArray;
  enemyEscaped = false;
};

var wordSpeed = 10000;

var wordTiming = function () {
  var timing = prompt("Choose speed by entering fast, normal, or slow");
  if (timing != null) {
  timing.toLowerCase();
}
  if (timing == "fast") {
    wordSpeed = 4000;
  } else if (timing == "slow") {
    wordSpeed = 12000;
  } else {
    wordSpeed = 10000;
  }
}

wordTiming();

var healWord = false;
var newWord = function(listOfWords) {
  var currentWord = listOfWords.shift();
  enemy1.word = currentWord;
  if (listOfWords.length % 7 === 0) {
    healWord = true;
    $("#word").css({"color": "blue"});
  } else {
    healWord = false;
    $("#word").css({"color": "white"});
  }
  $("#word").text(enemy1.word.toLowerCase());
  $("#enemy").animate({right: '1000px'}, {
    duration: wordSpeed,
    complete: function(){
      enemyEscaped = true;
      player1.hp -= 10;
      enemy1.escaped += 1;
      $("#enemy").css({"right": "0px"});
      $("#entry").val("");
      $("#score").text("Score: " + player1.score);
      $("#hp").text("HP: " + player1.hp);
      $("#escaped").text("Escaped: " + enemy1.escaped);
      keyUsed = [];
      gameOver();
    }});
};

var keyUsed = [];
var correctWord = false;

var keypressCheck = function (e) {
    if (e.which == "27") {
      player1.hp = 0;
      $("#enemy").stop();
      gameOver();
   } else if (e.which == "13") {
     wordMatch();
   } else {
   keyUsed.push(String.fromCharCode(e.which));
  }
 };


 var wordMatch = function (){
   for (var i = 0; i < enemy1.wordArray.length; i++)
   if (keyUsed[i] == enemy1.wordArray[i] && keyUsed.length == enemy1.wordArray.length) {
     correctWord = true;
   } else {
     correctWord = false;
   }
   scoring();
 };

var scoring = function() {

  if (correctWord === true) {
     player1.score += 10;
     enemy1.hp -= 10;
     $("#enemy").stop();
     $("#enemy").css({"right": "0px"});
     console.log(player1);
     console.log(enemy1);
     if (healWord === true) {
       player1.hp += 5;
     }
   } else if (correctWord === false) {
     player1.hp -= 5;
     console.log(player1);
   }
   $("#entry").val("");
   $("#score").text("Score: " + player1.score);
   $("#hp").text("HP: " + player1.hp);
   $("#escaped").text("Escaped: " + enemy1.escaped);
   keyUsed = [];
   gameOver();
 };

var gameOver = function() {
  var $newP = $("<p>");
  $newP.attr("id", "endText");
  $newP.css({"font-size": "35px"});
  var $container = $("#container");
  if (player1.hp <= 0) {
    $("#enemy").stop();
    $newP.text("Game Over");
    $newP.prependTo($container);
    $("#entry").detach();
    $("#enemy").detach();
  } else if (wordList.length === 0){
    $("#enemy").stop();
    $newP.text("You Won!");
    $newP.prependTo($container);
    $("#entry").detach();
    $("#enemy").detach();
  } else if (enemy1.hp === 0) {
    newWord(wordList);
    enemy1.splitWord();
    enemy1.hp = 10;
  } else if (enemyEscaped === true){
    newWord(wordList);
    enemy1.splitWord();
  }
};

var untitledTypingGame = function() {
  $("#entry").focus();
  newWord(wordList);
  enemy1.splitWord();
}
