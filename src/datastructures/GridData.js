import { CellData } from './CellData';

export default function GridData(length, width) {
    this.length = length
    this.width = width
    this.size = length * width
    this.cells = new Array(length)
    for (var row = 0; row < length; row++) {
        this.cells[row] = new Array(width)
        for (var col = 0; col < width; col++) {
            this.cells[row][col] = new CellData(row, col) // Append new cell
        }
    }
    this.start = undefined
    this.goal = undefined
}