import Queue from "../datastructures/Queue";
import { CellType } from "../datastructures/CellData";
import { get_neighbors, mark_neighbors_visited } from "./util";

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
    const neighbors = get_neighbors(grid, current, false);
    grid = mark_neighbors_visited(neighbors, grid);
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      cameFrom[neighbor.id] = current;
      q.enqueue(neighbor);
    }
  }
  return null;
}
