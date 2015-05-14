function MinesweeperUI ($board) {
	this.$board = $board;
	this.restart();
	this.registerEvents();
};

MinesweeperUI.prototype = {
	restart: function () {
		this.game = new Game (10, 10, 10);
		this.render();
	},
	
	render: function () {
		var grid = this.game.grid;
		var board = [];
	
		grid.forEach(function (r) {
			var row = ["<div class='row'>"];
			r.forEach(function (tile) {
				row.push("<div class='tile " + tileClassesAndData(tile));
			});
			row.push("</div>")
			board.push(row.join(""));
		})
		this.$board.html(board.join(""));
	},
	
	leftClick: function (event) {
		var $tile = $l(event.target);
		var row = $tile.attr("data-row");
		var col = $tile.attr("data-col");
		var bomb = this.game.explore([row, col]);
		
		if (this.game.won()) {
			this.render();
			alert("winner");
		} else if (bomb) {
			this.game.tile([row, col]).boom = true;
			this.revealBombs();
		}
		
		this.render();
	},
	
	revealBombs: function () {
		this.game.grid.forEach(function (row) {
			row.forEach(function (tile) {
				if (tile.bomb) {
					tile.explored = true;
				}
			})
		})
	},
	
	rightClick: function (event) {
		event.preventDefault();

		var $tile = $l(event.target);
		var row = $tile.attr("data-row");
		var col = $tile.attr("data-col");
		
		var flags = this.game.flag([row, col]);
		$l("#flags").html(flags);
		this.render();
	},
	
	registerEvents: function () {
		this.$board.on("click", this.leftClick.bind(this));
		this.$board.on("contextmenu", this.rightClick.bind(this));
		
		$l("button").on('click', this.restart.bind(this));
	}
}

function tileClassesAndData (tile) {
	var res = [];
	var bombs = tile.neighborBombs();
	
	if (tile.flagged) {
		res.push("flagged");
	}
	
	if (tile.boom) {
		res.push("boom");
	}
	
	if (tile.explored) {
		res.push("revealed");
		res.push("_" + bombs);
	}

	res.push("'data-row=" + tile.coords[0]);
	res.push("data-col=" + tile.coords[1] + ">");
	
	if (tile.bomb) {
		res.push("<span class='bomb'>B</span>");
	} else if (bombs) {
		res.push("<span>" + bombs + "</span>");
	}
	
	res.push("</div>")
	return res.join(" ");
};

