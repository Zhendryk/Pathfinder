import MazeCell from "../datastructures/MazeCell";
import { random_integer, random_integer_in_range } from "./util";
import { CellData, CellType } from "../datastructures/CellData";

const Orientation = {
  HORIZONTAL: 0,
  VERTICAL: 1,
};

function convert_maze_to_grid(maze, startCell, goalCell) {
  var gridWallsToAnimate = [];
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      const isStart = row === startCell.row && col === startCell.col;
      const isGoal = row === goalCell.row && col === goalCell.col;
      if (maze[row][col].isWall && !isStart && !isGoal) {
        gridWallsToAnimate.push(new CellData(row, col, CellType.BARRIER));
      }
    }
  }
  return gridWallsToAnimate;
}

function get_initial_maze(rows, cols) {
  var maze = [];
  for (let row = 0; row < rows; row++) {
    var curRow = [];
    for (let col = 0; col < cols; col++) {
      curRow.push(new MazeCell(row, col, false, true));
    }
    maze.push(curRow);
  }
  return maze;
}

function divide(maze, width, height, startRow, endRow, startCol, endCol, orientation) {
  if (width < 2 || height < 2) return;

  const horizontal = orientation === Orientation.HORIZONTAL;

  // Cut our section in half
  const cutRow = Math.floor(endRow / 2.0) + startRow;
  const cutCol = Math.floor(endCol / 2.0) + startCol;

  // Where will the opening be?
  const holeRow = horizontal ? cutRow : random_integer_in_range(startRow, endRow);
  const holeCol = horizontal ? random_integer_in_range(startCol, endCol) : cutCol;
  // How long is our segment to draw?
  const length = horizontal ? endCol - startCol : endRow - startRow;

  for (let i = 0; i < length; i++) {
    const row = horizontal ? cutRow : startRow + i;
    const col = horizontal ? startCol + i : cutCol;
    if ((horizontal && col !== holeCol) || (!horizontal && row !== holeRow)) {
      maze[row][col].mark_wall();
    }
  }

  var w = horizontal ? width : Math.floor(width / 2.0);
  var h = horizontal ? Math.floor(height / 2.0) : height;
  var sr = startRow;
  var er = horizontal ? cutRow : endRow;
  var sc = startCol;
  var ec = horizontal ? endCol : cutCol;

  divide(maze, w, h, sr, er, sc, ec, get_orientation(w, h));

  sr = horizontal ? cutRow : startRow;
  er = endRow;
  sc = horizontal ? startCol : cutCol;
  ec = endCol;

  divide(maze, w, h, sr, er, sc, ec, get_orientation(w, h));
}

export default function recursive_division_maze(rows, cols, startCell, goalCell) {
  var maze = get_initial_maze(rows, cols);
  divide(maze, cols, rows, 0, rows, 0, cols, get_orientation(cols, rows));
  const converted = convert_maze_to_grid(maze, startCell, goalCell);
  return converted;
}

// const S = 1;
// const E = 2;

// function convert_maze_to_grid(maze, startCell, goalCell) {
//   var gridWallsToAnimate = [];
//   for (let row = 0; row < maze.length; row++) {
//     for (let col = 0; col < maze[row].length; col++) {
//       const isStart = row === startCell.row && col === startCell.col;
//       const isGoal = row === goalCell.row && col === goalCell.col;
//       if (!maze[row][col] && !isStart && !isGoal) {
//         gridWallsToAnimate.push(new CellData(row, col, CellType.BARRIER));
//       }
//     }
//   }
//   return gridWallsToAnimate;
// }

// function get_initial_maze(rows, cols) {
//   var maze = [];
//   for (let row = 0; row < rows; row++) {
//     var curRow = [];
//     for (let col = 0; col < cols; col++) {
//       curRow.push(0);
//     }
//     maze.push(curRow);
//   }
//   return maze;
// }

function get_orientation(width, height) {
  if (width < height) return Orientation.HORIZONTAL;
  else if (height < width) return Orientation.VERTICAL;
  else return random_integer(2) === 0 ? Orientation.HORIZONTAL : Orientation.VERTICAL;
}

// function divide(maze, x, y, width, height, orientation) {
//   if (width < 2 || height < 2) return;

//   const horizontal = orientation === Orientation.HORIZONTAL;

//   // Where will the line be drawn from?
//   var wx = x + (horizontal ? 0 : random_integer(width - 2));
//   var wy = y + (horizontal ? random_integer(height - 2) : 0);

//   // Where will the passage through the wall exist?
//   var px = wx + (horizontal ? random_integer(width) : 0);
//   var py = wy + (horizontal ? 0 : random_integer(height));

//   // What direction will the wall be drawn?
//   var dx = horizontal ? 1 : 0;
//   var dy = horizontal ? 0 : 1;

//   // How long will the wall be?
//   var length = horizontal ? width : height;

//   // What direction is perpendicular to the wall?
//   var dir = horizontal ? S : E;

//   for (let i = 0; i < length; i++) {
//     if (wx !== px || wy !== py) {
//       maze[wy][wx] |= dir;
//     }
//     wx += dx;
//     wy += dy;
//   }
//   var nx = x;
//   var ny = y;
//   var w = horizontal ? width : wx - x + 1;
//   var h = horizontal ? wy - y + 1 : height;
//   divide(maze, nx, ny, w, h, get_orientation(w, h));

//   nx = horizontal ? x : wx + 1;
//   ny = horizontal ? wy + 1 : y;
//   w = horizontal ? width : x + width - wx - 1;
//   h = horizontal ? y + height - wy - 1 : height;
//   divide(maze, nx, ny, w, h, get_orientation(w, h));
// }

// export default function recursive_division_maze(rows, cols, startCell, goalCell) {
//   var maze = get_initial_maze(rows, cols);
//   divide(maze, 0, 0, cols, rows, get_orientation(cols, rows));
//   const converted = convert_maze_to_grid(maze, startCell, goalCell);
//   return converted;
// }
