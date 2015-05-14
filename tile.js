function Tile (coords, grid) {
	this.coords = coords;
	this.grid = grid;
	this.explored = false;
	this.bomb = false;
	this.flagged = false;
	this.boom = false;
};

Tile.prototype.neighbors = function () {
	var results = [];
	var x = this.coords[0];
	var y = this.coords[1];

	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (this._onBoard([x + i, y + j]) && this !== this.grid[x + i][y + j]) {
				results.push(this.grid[x + i][y + j]);
			}
		}
	}
	return results;
};

Tile.prototype._onBoard = function (coords) {
	return 0 <= coords[0] && coords[0] < this.grid.length && 0 <= coords[1] && coords[1] < this.grid[0].length
};


Tile.prototype.explore = function () {
  if (this.explored) {
		return false;
	};

	this.explored = true;

	if (this.bomb) {
		return true;
	}
	
	if (this.neighborBombs() === 0) {
		this.neighbors().forEach(function (neighbor) {
			neighbor.explore();
		});
	}
};

Tile.prototype.neighborBombs = function () {
	var count = 0;

	this.neighbors().forEach(function (neighbor) {
		if (neighbor.bomb) { 
			count++ 
		};
	});
	return count;
};