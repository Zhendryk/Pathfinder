import PriorityQueue from "../datastructures/PriorityQueue";
import { get_neighbors, mark_neighbors_visited, euclidean_distance } from "./util";
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

export default function a_star(grid, start, goal, search_corners = true) {
  var visitedNodes = [];
  var openSet = new PriorityQueue();
  openSet.enqueue(start, 0);

  var cameFrom = new Map();

  var gscore = new Map();
  gscore[start.id] = 0;

  var fscore = new Map();
  fscore[start.id] = euclidean_distance(start.col, start.row, goal.col, goal.row);

  while (!openSet.isEmpty()) {
    var current = openSet.dequeue();
    if (current !== start && current !== goal) {
      // Don't include start or goal in visited
      visitedNodes.push(current.asType(CellType.VISITED));
    }
    if (current.id === goal.id) {
      return [visitedNodes, reconstruct_path(cameFrom, current, start)]; // Returns all nodes visited (in order) as well as the path from start to goal (in order) for animation purposes
    }
    const neighbors = get_neighbors(grid, current, search_corners);
    grid = mark_neighbors_visited(neighbors, grid);
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      var tentative_gscore = gscore[current.id] + euclidean_distance(current.col, current.row, neighbor.col, neighbor.row);
      const neighbor_gscore = gscore.has(neighbor.id) ? gscore[neighbor.id] : Infinity;
      if (tentative_gscore < neighbor_gscore) {
        cameFrom[neighbor.id] = current;
        gscore[neighbor.id] = tentative_gscore;
        fscore[neighbor.id] = gscore[neighbor.id] + euclidean_distance(neighbor.col, neighbor.row, goal.col, goal.row) + neighbor.weight;
        if (!openSet.contains(neighbor)) {
          openSet.enqueue(neighbor, fscore[neighbor.id]);
        }
      }
    }
  }
  return null; // Failure
}
