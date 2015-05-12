
function Game (x, y, bombs) {
	this.size = [x, y];
	this.grid = setupGrid (x, y);
	this.bombCount = bombs;
};

function setupGrid (x, y) {
	var grid = [];
	
	for (var i = 0; i < x; i++) {
		var row = [];
		for (var j = 0; j < y; j++) {
			row.push(new Tile ([i, j], grid));
		}
		grid.push(row);
	};
	
	grid[0][0].explore();
	console.log(grid)
	return grid;
};

Game.prototype.placeBombs = function () {
	
}