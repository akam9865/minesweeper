(function () {
  if (typeof Mines === "undefined") {
    window.Mines = {};
  };

  var Game = Mines.Game = function () {

  };

  var Board = Mines.Board = function (arg) {
    this.$boardElement = arg;
    this.constructBoard();
  };

  Board.prototype.constructBoard = function () {
    var rows = [];
    var result = ""

    for (var i = 0; i < 10; i++) {
      // var col = [];
      result = result + "<div class='row'>"; // start row
      for (var j = 0; j < 10; j++) {
        // row.push("")
        result = result +
          "<div class='tile' data-row='" + i +
          "' data-col='" + j + "'>HI!</div>";
      }
      result = result + "</div>"; // end of row
    }
    this.$boardElement.html(result);
  }

})();
