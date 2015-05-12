function MinesweeperUI ($board) {
	this.$board = $board;
	this.game = new Game (3, 3, 2);
};

MinesweeperUI.prototype.render = function () {
	
	var size = this.game.size;
  var result = ""

  for (var i = 0; i < size[0]; i++) {
    // var col = [];
    result = result + "<div class='row'>"; // start row
    for (var j = 0; j < size[1]; j++) {
      // row.push("")
      result = result +
        "<div class='tile' data-row='" + i +
        "' data-col='" + j + "'></div>";
    }
    result = result + "</div>"; // end of row
  }
  this.$board.html(result);
};

// on click, call game.reveal which returns all tiles to reveal
// iterate through and add classes.