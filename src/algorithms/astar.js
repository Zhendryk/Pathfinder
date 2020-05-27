import PriorityQueue from '../datastructures/PriorityQueue';
import { CellType } from '../datastructures/CellData';

function reconstruct_path(cameFrom, current, start) {
    const total_path = [];
    while (cameFrom[current.id] !== undefined && current.id !== start.id) {
        current = cameFrom[current.id];
        current.type = CellType.ADDED_TO_ROUTE;
        total_path.unshift(current);
    }
    return total_path;
}

function get_neighbors(grid, node) {
    var neighbors = []
    if (node.row > 0 && !grid.cells[node.row - 1][node.col].visited) {
        neighbors.push(grid.cells[node.row - 1][node.col]) // Above
        grid.cells[node.row - 1][node.col].visited = true
    }
    if (node.row < grid.length - 1 && !grid.cells[node.row + 1][node.col].visited) {
        neighbors.push(grid.cells[node.row + 1][node.col]) // Below
        grid.cells[node.row + 1][node.col].visited = true
    }
    if (node.col > 0 && !grid.cells[node.row][node.col - 1].visited) {
        neighbors.push(grid.cells[node.row][node.col - 1]) // Left
        grid.cells[node.row][node.col - 1].visited = true
    }
    if (node.col < grid.width - 1 && !grid.cells[node.row][node.col + 1].visited) {
        neighbors.push(grid.cells[node.row][node.col + 1]) // Right
        grid.cells[node.row][node.col + 1].visited = true
    }
    return [neighbors, grid]
}

function euclidean_distance(x1, y1, x2, y2) {
    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2))
}

export function a_star(grid, start, goal) {
    var visitedNodes = []
    var openSet = new PriorityQueue()
    openSet.enqueue(start, 0)

    var cameFrom = new Map()

    var gscore = new Map()
    gscore[start.id] = 0

    var fscore = new Map()
    fscore[start.id] = euclidean_distance(start.col, start.row, goal.col, goal.row)

    while (!openSet.isEmpty()) {
        var current = openSet.dequeue()

        visitedNodes.push(current.toType(CellType.VISITED))
        if (current.id === goal.id) {
            return [visitedNodes, reconstruct_path(cameFrom, current, start)] // Returns all nodes visited (in order) as well as the path from start to goal (in order) for animation purposes
        }
        var result = get_neighbors(grid, current)
        var neighbors = result[0];
        grid = result[1];
        for (var i = 0; i < neighbors.length; i++) {
            var neighbor = neighbors[i]
            var tentative_gscore = gscore[current.id] + euclidean_distance(current.col, current.row, neighbor.col, neighbor.row)
            const neighbor_gscore = gscore.has(neighbor.id) ? gscore[neighbor.id] : Infinity;
            if (tentative_gscore < neighbor_gscore) {
                cameFrom[neighbor.id] = current
                gscore[neighbor.id] = tentative_gscore
                fscore[neighbor.id] = gscore[neighbor.id] + euclidean_distance(neighbor.col, neighbor.row, goal.col, goal.row) + neighbor.weight
                if (!openSet.contains(neighbor)) {
                    openSet.enqueue(neighbor, fscore[neighbor.id])
                }
            }
        }
    }
    return null // Failure
}
