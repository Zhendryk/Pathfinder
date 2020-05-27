export const CellType = {
    STANDARD: 0,
    START: 1,
    GOAL: 2,
    BARRIER: 3,
    WEIGHTED: 4,
    VISITED: 5,
    ADDED_TO_ROUTE: 6,
    LAST: 7
}

export class CellData {
    constructor(row, col, type = CellType.STANDARD, isSelected = false, weight = 0.0) {
        this.row = row
        this.col = col
        this.id = '(' + row + ', ' + col + ')'
        this.type = type
        this.isSelected = isSelected
        this.visited = type === (CellType.VISITED || CellType.ADDED_TO_ROUTE) ? true : false;
        switch (type) {
            case CellType.WEIGHTED:
                this.weight = weight;
                break;
            case CellType.BARRIER:
                this.weight = Infinity;
                break;
            case CellType.STANDARD:
            case CellType.START:
            case CellType.GOAL:
            default:
                this.weight = 0
        }
    }

    toType(newType) {
        return new CellData(this.row, this.col, newType, this.isSelected)
    }
}
