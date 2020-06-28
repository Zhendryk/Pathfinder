import { get_neighbors } from "./util";
import PriorityQueue from "../datastructures/PriorityQueue";
import { CellType } from "../datastructures/CellData";

function reconstructPath(prev, current) {
  const total_path = [];
  while (prev[current.id] !== undefined) {
    current = prev[current.id];
    total_path.unshift(current.asType(CellType.ADDED_TO_ROUTE));
  }
  return total_path.slice(1);
}

export default function dijikstra(grid, start, goal) {
  var dist = new Map();
  dist[start.id] = 0;

  var prev = new Map();
  var visitedNodes = [];

  var vertices = new PriorityQueue();
  vertices.enqueue(start, dist[start.id]);

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const node = grid[row][col];
      if (node.id !== start.id) {
        dist[node.id] = Infinity;
        prev[node.id] = undefined;
      }
    }
  }
  while (!vertices.isEmpty()) {
    var current = vertices.dequeue();
    if (current !== start && current !== goal) {
      visitedNodes.push(current.asType(CellType.VISITED));
    }
    if (current.id === goal.id) {
      return [visitedNodes, reconstructPath(prev, current)];
    }
    var result = get_neighbors(grid, current, false);
    var neighbors = result[0];
    grid = result[1];
    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];
      const alt = dist[current.id] + neighbor.weight;
      if (alt < dist[neighbor.id]) {
        dist[neighbor.id] = alt;
        prev[neighbor.id] = current;
        if (!vertices.contains(neighbor)) {
          vertices.enqueue(neighbor, dist[neighbor.id]);
        }
      }
    }
  }
  // Failed to find goal
  return null;
}
