import Queue from "../datastructures/Queue";
import { CellType } from "../datastructures/CellData";

function get_neighbors(grid, node) {
  let neighbors = [];
  if (node.row > 0 && !grid[node.row - 1][node.col].visited && grid[node.row - 1][node.col].type !== CellType.BARRIER) {
    neighbors.unshift(grid[node.row - 1][node.col]); // N
    grid[node.row - 1][node.col].visited = true;
  }
  if (node.row < grid.length - 1 && !grid[node.row + 1][node.col].visited && grid[node.row + 1][node.col].type !== CellType.BARRIER) {
    neighbors.unshift(grid[node.row + 1][node.col]); // S
    grid[node.row + 1][node.col].visited = true;
  }
  if (node.col > 0 && !grid[node.row][node.col - 1].visited && grid[node.row][node.col - 1].type !== CellType.BARRIER) {
    neighbors.unshift(grid[node.row][node.col - 1]); // W
    grid[node.row][node.col - 1].visited = true;
  }
  if (node.col < grid[0].length - 1 && !grid[node.row][node.col + 1].visited && grid[node.row][node.col + 1].type !== CellType.BARRIER) {
    neighbors.unshift(grid[node.row][node.col + 1]); // E
    grid[node.row][node.col + 1].visited = true;
  }
  return [neighbors, grid];
}

function reconstructPath(cameFrom, current, start) {
  const total_path = [];
  while (cameFrom[current.id] !== undefined) {
    current = cameFrom[current.id];
    if (current.id === start.id) {
      break;
    }
    total_path.unshift(current.asType(CellType.ADDED_TO_ROUTE));
  }
  return total_path;
}

export default function bfs(grid, start, goal) {
  let q = new Queue();
  let visitedNodes = [];
  let cameFrom = new Map();
  q.enqueue(start);
  while (!q.isEmpty()) {
    let current = q.dequeue();
    if (current !== start && current !== goal) {
      visitedNodes.push(current.asType(CellType.VISITED));
    }
    if (current.id === goal.id) {
      return [visitedNodes, reconstructPath(cameFrom, current, start)];
    }
    let result = get_neighbors(grid, current, false);
    const neighbors = result[0];
    grid = result[1];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      cameFrom[neighbor.id] = current;
      q.enqueue(neighbor);
    }
  }
  return null;
}
