import PriorityQueue from "../datastructures/PriorityQueue";
import { CellType } from "../datastructures/CellData";

function reconstruct_path(cameFrom, current, start) {
  const total_path = [];
  while (cameFrom[current.id] !== undefined && current.id !== start.id) {
    current = cameFrom[current.id];
    current.type = CellType.ADDED_TO_ROUTE;
    total_path.unshift(current);
  }
  return total_path.slice(1); // Don't include the start node
}

function get_neighbors(grid, node, search_corners) {
  var neighbors = [];
  if (search_corners) {
    if (
      node.row > 0 &&
      node.col > 0 &&
      !grid[node.row - 1][node.col - 1].visited
    ) {
      neighbors.push(grid[node.row - 1][node.col - 1]); // NW
      grid[node.row - 1][node.col - 1].visited = true;
    }
    if (
      node.row > 0 &&
      node.col < grid[0].length - 1 &&
      !grid[node.row - 1][node.col + 1].visited
    ) {
      neighbors.push(grid[node.row - 1][node.col + 1]); // NE
      grid[node.row - 1][node.col + 1].visited = true;
    }
    if (
      node.row < grid.length - 1 &&
      node.col > 0 &&
      !grid[node.row + 1][node.col - 1].visited
    ) {
      neighbors.push(grid[node.row + 1][node.col - 1]); // SW
      grid[node.row + 1][node.col - 1].visited = true;
    }
    if (
      node.row < grid.length - 1 &&
      node.col < grid[0].length - 1 &&
      !grid[node.row + 1][node.col + 1].visited
    ) {
      neighbors.push(grid[node.row + 1][node.col + 1]); // SE
      grid[node.row + 1][node.col + 1].visited = true;
    }
  }
  if (node.row > 0 && !grid[node.row - 1][node.col].visited) {
    neighbors.push(grid[node.row - 1][node.col]); // N
    grid[node.row - 1][node.col].visited = true;
  }
  if (node.row < grid.length - 1 && !grid[node.row + 1][node.col].visited) {
    neighbors.push(grid[node.row + 1][node.col]); // S
    grid[node.row + 1][node.col].visited = true;
  }
  if (node.col > 0 && !grid[node.row][node.col - 1].visited) {
    neighbors.push(grid[node.row][node.col - 1]); // W
    grid[node.row][node.col - 1].visited = true;
  }
  if (node.col < grid[0].length - 1 && !grid[node.row][node.col + 1].visited) {
    neighbors.push(grid[node.row][node.col + 1]); // E
    grid[node.row][node.col + 1].visited = true;
  }
  return [neighbors, grid];
}

function euclidean_distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

export function a_star(grid, start, goal, search_corners = true) {
  var visitedNodes = [];
  var openSet = new PriorityQueue();
  openSet.enqueue(start, 0);

  var cameFrom = new Map();

  var gscore = new Map();
  gscore[start.id] = 0;

  var fscore = new Map();
  fscore[start.id] = euclidean_distance(
    start.col,
    start.row,
    goal.col,
    goal.row
  );

  while (!openSet.isEmpty()) {
    var current = openSet.dequeue();
    if (current !== start && current !== goal) {
      // Don't include start or goal in visited
      visitedNodes.push(current.asType(CellType.VISITED));
    }
    if (current.id === goal.id) {
      return [visitedNodes, reconstruct_path(cameFrom, current, start)]; // Returns all nodes visited (in order) as well as the path from start to goal (in order) for animation purposes
    }
    var result = get_neighbors(grid, current, search_corners);
    var neighbors = result[0];
    grid = result[1];
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      var tentative_gscore =
        gscore[current.id] +
        euclidean_distance(
          current.col,
          current.row,
          neighbor.col,
          neighbor.row
        );
      const neighbor_gscore = gscore.has(neighbor.id)
        ? gscore[neighbor.id]
        : Infinity;
      if (tentative_gscore < neighbor_gscore) {
        cameFrom[neighbor.id] = current;
        gscore[neighbor.id] = tentative_gscore;
        fscore[neighbor.id] =
          gscore[neighbor.id] +
          euclidean_distance(neighbor.col, neighbor.row, goal.col, goal.row) +
          neighbor.weight;
        if (!openSet.contains(neighbor)) {
          openSet.enqueue(neighbor, fscore[neighbor.id]);
        }
      }
    }
  }
  return null; // Failure
}
