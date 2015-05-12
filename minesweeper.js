(function () {
  if (typeof Mines === "undefined") {
    window.Mines = {};
  };

  var Board = Mines.Board = function ($board) {
    this.$boardElement = $board;

    this.grid = setup();
    this.render(this.grid);
		this.setupEvents();
  };
	
	Board.prototype.setupEvents = function () {
		$l('.tile').on('click', handleClick.bind(this));
    $l('.tile').on('contextmenu', handleRightClick.bind(this));
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
    var $target = $l(event.currentTarget);
    var targetRow = $target.attr("data-row");
    var targetCol = $target.attr("data-col");
		var tile = this.grid[targetRow][targetCol];
    console.log(tile);
  }

  function handleRightClick (event) {
    event.preventDefault();
    $target = $l(event.currentTarget);
    targetRow = $target.attr("data-row");
    targetCol = $target.attr("data-col");
		var tile = this.grid[targetRow][targetCol];
    console.log(tile);
  }
})();
