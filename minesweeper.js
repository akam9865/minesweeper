(function () {
  if (typeof Mines === "undefined") {
    window.Mines = {};
  };

  var Game = Mines.Game = function () {

  };


  var Board = Mines.Board = function (arg) {
    this.$boardElement = arg;
    this.constructBoard();
    $l('.tile').on('click', handleClick);
    $l('.tile').on('contextmenu', handleRightClick);
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
          "' data-col='" + j + "'></div>";
      }
      result = result + "</div>"; // end of row
    }
    this.$boardElement.html(result);
  }

  function handleClick (event) {
    $target = $l(event.currentTarget);
    targetRow = $target.attr("data-row");
    targetCol = $target.attr("data-col");
    console.log(targetRow, targetCol);
  }

  function handleRightClick (event) {
    // debugger
    event.preventDefault();
    $target = $l(event.currentTarget);
    targetRow = $target.attr("data-row");
    targetCol = $target.attr("data-col");
    console.log("Right: ", targetRow, targetCol);
  }

})();
