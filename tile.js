function Tile (coords, grid) {
	this.coords = coords;
	this.grid = grid;
	this.explored = false;
	this.bomb = false;
	this.flagged = false;
};

Tile.prototype.neighbors = function () {
	var results = [];
	var x = this.coords[0];
	var y = this.coords[1];

	for (var i = -1; i <= 1; i++) {
		for (var j = -1; j <= 1; j++) {
			if (_onBoard([x + i, y + j]) && this !== this.grid[x + i][y + j]) {
				results.push(this.grid[x + i][y + j]);
			}
		}
	}
	return results;
};

var _onBoard = function (coords) {
	return 0 <= coords[0] && coords[0] < 3 && 0 <= coords[1] && coords[1] < 3
};

Tile.prototype.explore = function () {
	
	if (this.bomb) {
		return false;
	}
	
	this.explored = true;
	var neighbors = this.neighbors();
	
	if (this.neighborBombs() || neighbors.length === 0) {
		return true;
	}
	
	neighbors.forEach(function(neighbor) {
		if (!neighbor.explored && !neighbor.bomb && !neighbor.flagged) {
			neighbor.explore();
		}
	})
	
	// this.explored = true;
	// var neighbors = this.neighbors();
	//
	// if (this.neighborBombs() || neighbors.length === 0) {
	// 	return this;
	// }
	//
	// neighbors.forEach(function (neighbor) {
	// 	neighbor.explore();
	// })
};

Tile.prototype.neighborBombs = function () {
	var count = 0;
	
	this.neighbors().forEach(function (neighbor) {
		if (neighbor.bomb) { count++ };
	});
	return count;
};