(function () {
  if (typeof Mines === "undefined") {
    window.Mines = {};
  };

  var Game = Mines.Game = function () {

  };

  var Tile = Mines.Tile = function (board, row, col) {
    this.board = board;
    this.position = [row, col];
    this.flagged = false;
    this.revealed = false;
    this.bombed = false;
  }


  var Board = Mines.Board = function (arg) {
    this.$boardElement = arg;

    this.grid = setup();
    this.render(this.grid);
    $l('.tile').on('click', handleClick);
    $l('.tile').on('contextmenu', handleRightClick);
  };


  Board.prototype.render = function (grid) {
    // var rows = [];
    var result = ""

    for (var i = 0; i < 10; i++) {
      // var col = [];
      result = result + "<div class='row'>"; // start row
      for (var j = 0; j < 10; j++) {
        // row.push("")
        result = result +
          "<div class='tile' data-row='" + i +
          "' data-col='" + j + "'></div>";
      }
      result = result + "</div>"; // end of row
    }
    this.$boardElement.html(result);
  }

  function setup () {
    var rows = [];
    for (var i = 0; i < 10; i++) {
      var cols = [];
      for (var j = 0; j < 10; j++) {
        var cell = new Tile(this, i, j);
        cols.push(cell);
      };
      rows.push(cols);
    };
    return rows;
  };

  function handleClick (event) {
    $target = $l(event.currentTarget);
    targetRow = $target.attr("data-row");
    targetCol = $target.attr("data-col");
    console.log(targetRow, targetCol);
  }

  function handleRightClick (event) {
    event.preventDefault();
    $target = $l(event.currentTarget);
    targetRow = $target.attr("data-row");
    targetCol = $target.attr("data-col");
    console.log("Right: ", targetRow, targetCol);
  }

})();
