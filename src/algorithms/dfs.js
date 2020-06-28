import { CellType } from "../datastructures/CellData";

function direct_edges(grid, node) {
  let edges = [];
  if (node.row > 0 && !grid[node.row - 1][node.col].visited && grid[node.row - 1][node.col].type !== CellType.BARRIER) {
    edges.unshift(grid[node.row - 1][node.col]); // N
  }
  if (node.row < grid.length - 1 && !grid[node.row + 1][node.col].visited && grid[node.row + 1][node.col].type !== CellType.BARRIER) {
    edges.unshift(grid[node.row + 1][node.col]); // S
  }
  if (node.col > 0 && !grid[node.row][node.col - 1].visited && grid[node.row][node.col - 1].type !== CellType.BARRIER) {
    edges.unshift(grid[node.row][node.col - 1]); // W
  }
  if (node.col < grid[0].length - 1 && !grid[node.row][node.col + 1].visited && grid[node.row][node.col + 1].type !== CellType.BARRIER) {
    edges.unshift(grid[node.row][node.col + 1]); // E
  }
  return edges;
}

export default function dfs(grid, start, goal) {
  let s = [start];
  let visitedNodes = [];
  let explored = new Map();
  let cameFrom = new Map();
  explored[start.id] = true;
  while (s.length) {
    let current = s.pop();
    if (current.id !== start.id && current.id !== goal.id) {
      visitedNodes.push(current.asType(CellType.VISITED));
    }
    if (current.id === goal.id) {
      return [visitedNodes, visitedNodes];
    }
    explored[current.id] = true;
    current.visited = true;
    direct_edges(grid, current).forEach((neighbor) => {
      if (!explored[neighbor.id]) {
        cameFrom[neighbor.id] = current;
        s.push(neighbor);
      }
    });
  }
  return null;
}
