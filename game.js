function Game (x, y, bombs) {
	this.size = [x, y];
	this.bombs = bombs;
	this.flags = bombs;
	this.grid = this.setupGrid(x, y);
};


Game.prototype.setupGrid = function (x, y) {
	var grid = [];
	
	for (var i = 0; i < x; i++) {
		var row = [];
		for (var j = 0; j < y; j++) {
			row.push(new Tile ([i, j], grid));
		}
		grid.push(row);
	};
	
	var height = this.size[0];
	var width = this.size[1];
	
	while (this.bombs > 0) {
		var x = Math.floor(height * Math.random());
		var y = Math.floor(width * Math.random());
		
		if (!grid[x][y].bomb) {
			grid[x][y].bomb = true;
			this.bombs--;
		}
	}
	return grid;
};


Game.prototype.won = function () {
	var won = true;
	
	this.grid.forEach(function (row) {
		row.forEach(function (tile) {
			if (!tile.explored && !tile.bomb) {
				won = false;
			}
		});
	});
	return won;
};

// Game.prototype.lost = function () {
// };

Game.prototype.tile = function (coords) {
	return this.grid[coords[0]][coords[1]];
};

Game.prototype.flag = function (coords) {
	if (this.tile(coords).flagged) {
		this.tile(coords).flagged = false;
		this.flags++;
	} else {
		this.tile(coords).flagged = true;
		this.flags--;
	}
	return this.flags;
};

Game.prototype.explore = function (coords) {
	return this.tile(coords).explore();
};