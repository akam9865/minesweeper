(function () {
  if (typeof Mines === "undefined") {
    window.Mines = {};
  };

  var Tile = Mines.Tile = function (board, row, col) {
    this.board = board;
    this.position = [row, col];
    this.flagged = false;
    this.revealed = false;
    this.bombed = false;
  }
})()
