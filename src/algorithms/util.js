import { CellType } from "../datastructures/CellData";

function is_corner(coordDiff) {
  const isUpperLeft = coordDiff[0] === -1 && coordDiff[1] === -1;
  const isUpperRight = coordDiff[0] === -1 && coordDiff[1] === 1;
  const isLowerLeft = coordDiff[0] === 1 && coordDiff[1] === -1;
  const isLowerRight = coordDiff[0] === 1 && coordDiff[1] === 1;
  return isUpperLeft || isUpperRight || isLowerLeft || isLowerRight;
}

export function get_neighbors(grid, node, search_corners = false) {
  var neighbors = [];
  for (let row = node.row - 1; row <= node.row + 1; row++) {
    for (let col = node.col - 1; col <= node.col + 1; col++) {
      const isOriginNode = row === node.row && col === node.col;
      const coordDiff = [row - node.row, col - node.col];
      if (row >= 0 && row < grid.length && col >= 0 && col < grid[row].length && !isOriginNode) {
        const neighbor = grid[row][col];
        if (search_corners || (!search_corners && !is_corner(coordDiff))) {
          if (!neighbor.visited && neighbor.type !== CellType.BARRIER) {
            neighbors.push(neighbor);
          }
        }
      }
    }
  }
  return neighbors;
}

export function mark_neighbors_visited(neighbors, grid) {
  neighbors.forEach((neighbor) => {
    grid[neighbor.row][neighbor.col] = grid[neighbor.row][neighbor.col].asType(CellType.VISITED);
  });
  return grid;
}

export function euclidean_distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function random_integer(up_to) {
  return Math.floor(Math.random() * up_to);
}

export function random_integer_in_range(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function random_coords(rows, cols) {
  return [random_integer(rows), random_integer(cols)];
}
