$(document).ready(function(){
  $("#entry").on("keydown", keypressCheck);
  $("#entry").focus();

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



var Enemy = function (word) {
  this.word = word;
  this.hp = 10;
};

var enemy1 = new Enemy("FUN");

Enemy.prototype.splitWord = function () {
  var wordArray = this.word.split("");
  this.wordArray = wordArray;
  console.log(this);
};

enemy1.splitWord();
var keyUsed = [];
var correctWord = false;
var keypressCheck = function (e) {
  console.log('pressed');
   if (e.which == "13") {
     wordMatch();
   } else {
   keyUsed.push(String.fromCharCode(e.which));
   console.log(keyUsed);
 }
 };

 var wordMatch = function (){

   for (var i = 0; i < enemy1.wordArray.length; i++)
   if (keyUsed[i] == enemy1.wordArray[i] && keyUsed.length == enemy1.wordArray.length) {
     correctWord = true;
     console.log("correct key pressed");
   } else {
     correctWord = false;
     console.log("wrong key");
   }
   scoring();
 };

var scoring = function() {

  if (correctWord === true) {
     player1.score += 10;
     enemy1.hp -= 10;
     console.log(player1);
     console.log(enemy1);
   } else if (correctWord === false) {

     player1.hp -= 5;
     console.log(player1);
   }
   $("#entry").val("");
   $("#score").text("Score: " + player1.score);
   $("#hp").text("HP: " + player1.hp);
   keyUsed = [];
   gameOver();
 };

var gameOver = function() {
  if (player1.hp <= 0) {
    var $newP = $("<p>");
    var $container = $("#container");
    $newP.text("Game Over");
    $newP.prependTo($container);
    return (console.log("Game Over"));
  }
};
