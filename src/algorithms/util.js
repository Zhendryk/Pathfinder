export function get_neighbors(grid, node, search_corners) {
  var neighbors = [];
  if (search_corners) {
    if (node.row > 0 && node.col > 0 && !grid[node.row - 1][node.col - 1].visited) {
      neighbors.push(grid[node.row - 1][node.col - 1]); // NW
      grid[node.row - 1][node.col - 1].visited = true;
    }
    if (node.row > 0 && node.col < grid[0].length - 1 && !grid[node.row - 1][node.col + 1].visited) {
      neighbors.push(grid[node.row - 1][node.col + 1]); // NE
      grid[node.row - 1][node.col + 1].visited = true;
    }
    if (node.row < grid.length - 1 && node.col > 0 && !grid[node.row + 1][node.col - 1].visited) {
      neighbors.push(grid[node.row + 1][node.col - 1]); // SW
      grid[node.row + 1][node.col - 1].visited = true;
    }
    if (node.row < grid.length - 1 && node.col < grid[0].length - 1 && !grid[node.row + 1][node.col + 1].visited) {
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

export function euclidean_distance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
