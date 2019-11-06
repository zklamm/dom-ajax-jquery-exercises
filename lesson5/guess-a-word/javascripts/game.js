var randomWord = (function() {
  var words = ['apple', 'banana', 'orange', 'pear'];

  return (function() {
    if (words.length === 0) return;
    var random = Math.floor(Math.random() * words.length);
    return words.splice(random, 1)[0];
  });
})();

var Game = function() {
  this.word = randomWord();
  this.incorrect = 0;
  this.guesses = [];
  this.allowed = 6;
}