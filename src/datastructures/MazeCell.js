export default class MazeCell {
  constructor(row, col, isWall = true, isPassage = false) {
    this.row = row;
    this.col = col;
    this.id = `mazecell_${row}_${col}`;
    this.isWall = isWall;
    this.isPassage = isPassage;
    this.visited = false;
  }

  opposing_cell_coords(originCell, maze) {
    const rowDiff = this.row - originCell.row;
    const colDiff = this.col - originCell.col;
    var coords = undefined;
    if (rowDiff === 1) {
      coords = [this.row + 1, this.col];
    } else if (rowDiff === -1) {
      coords = [this.row - 1, this.col];
    } else if (colDiff === 1) {
      coords = [this.row, this.col + 1];
    } else if (colDiff === -1) {
      coords = [this.row, this.col - 1];
    }
    if (coords) {
      const in_bounds = coords[0] >= 0 && coords[0] < maze.length && coords[1] >= 0 && coords[1] < maze[0].length;
      return in_bounds ? coords : undefined;
    } else {
      return undefined;
    }
  }

  surrounding_walls(maze) {
    var walls = [];
    if (this.row > 0 && maze[this.row - 1][this.col].isWall) {
      walls.push(maze[this.row - 1][this.col]); // N
    }
    if (this.row < maze.length - 1 && maze[this.row + 1][this.col].isWall) {
      walls.push(maze[this.row + 1][this.col]); // S
    }
    if (this.col > 0 && maze[this.row][this.col - 1].isWall) {
      walls.push(maze[this.row][this.col - 1]); // W
    }
    if (this.col < maze[0].length - 1 && maze[this.row][this.col + 1].isWall) {
      walls.push(maze[this.row][this.col + 1]); // E
    }
    return walls;
  }

  mark_part_of_maze() {
    this.isPassage = true;
    this.isWall = false;
  }

  mark_wall() {
    this.isWall = true;
    this.isPassage = false;
  }
}
