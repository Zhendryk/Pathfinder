import { CellData, CellType } from "../datastructures/CellData";

function get_random_int(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function get_random_coords(rows, cols) {
  return [get_random_int(0, rows), get_random_int(0, cols)];
}

function get_opposite_side_coords(wall, node) {
  const rowDiff = wall.row - node.row;
  const colDiff = wall.col - node.col;
  if (rowDiff === 1) {
    return [wall.row + 1, wall.col];
  } else if (rowDiff === -1) {
    return [wall.row - 1, wall.col];
  } else if (colDiff === 1) {
    return [wall.row, wall.col + 1];
  } else if (colDiff === -1) {
    return [wall.row, wall.col - 1];
  } else {
    return null;
  }
}

export function get_surrounding_walls(grid, node) {
  var walls = [];
  if (node.row > 0 && grid[node.row - 1][node.col].type === CellType.BARRIER) {
    walls.push(grid[node.row - 1][node.col]); // N
  }
  if (node.row < grid.length - 1 && grid[node.row + 1][node.col].type === CellType.BARRIER) {
    walls.push(grid[node.row + 1][node.col]); // S
  }
  if (node.col > 0 && grid[node.row][node.col - 1].type === CellType.BARRIER) {
    walls.push(grid[node.row][node.col - 1]); // W
  }
  if (node.col < grid[0].length - 1 && grid[node.row][node.col + 1].type === CellType.BARRIER) {
    walls.push(grid[node.row][node.col + 1]); // E
  }
  return walls;
}

function gen_initial_maze(rows, cols) {
  var maze = [];
  for (let row = 0; row < rows; row++) {
    var curRow = [];
    for (let col = 0; col < cols; col++) {
      curRow.push(new CellData(row, col, CellType.BARRIER));
    }
    maze.push(curRow);
  }
  return maze;
}

export default function randomized_prims(rows, cols, start, goal) {
  let maze = gen_initial_maze(rows, cols, start, goal);
  let partOfMaze = [];
  let wallsToAnimate = [];
  let cellForWall = new Map();
  const randomCoords = get_random_coords(rows, cols);
  const randomNode = maze[randomCoords[0]][randomCoords[1]];
  maze[randomNode.row][randomNode.col] = randomNode.asType(CellType.STANDARD);
  partOfMaze.push(randomNode.asType(CellType.STANDARD));
  let algoWalls = get_surrounding_walls(maze, randomNode);
  algoWalls.forEach((wall) => {
    cellForWall[wall.id] = randomNode;
  });
  while (algoWalls.length) {
    let randomWall = algoWalls[get_random_int(0, algoWalls.length)];
    const opposite_cell_coords = get_opposite_side_coords(randomWall, cellForWall[randomWall.id]);
    if (opposite_cell_coords === undefined) {
      console.log("Hello");
    }
    const opposing_cell = maze[opposite_cell_coords[0]][opposite_cell_coords[1]];
    if (opposing_cell !== undefined && !partOfMaze.includes(opposing_cell)) {
      maze[randomWall.row][randomWall.col] = maze[randomWall.row][randomWall.col].asType(CellType.STANDARD);
      partOfMaze.push(maze[randomWall.row][randomWall.col]);
      partOfMaze.push(opposing_cell);
      const nextSurroundingWalls = get_surrounding_walls(maze, opposing_cell);
      nextSurroundingWalls.forEach((nxtWall) => {
        cellForWall[nxtWall.id] = opposing_cell;
        algoWalls.push(nxtWall);
      });
    } else {
      wallsToAnimate.push(randomWall);
      const wallToRemoveIndex = algoWalls.findIndex((element) => element.id === randomWall.id);
      algoWalls.splice(wallToRemoveIndex, 1);
    }
  }
  return wallsToAnimate;
}
