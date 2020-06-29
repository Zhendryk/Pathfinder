import React, { useState } from "react";
import "./Pathfinder.css";
import PropTypes from "prop-types";
import Grid from "./Grid";
import TopBar from "./TopBar";
import { CellType, CellData } from "../datastructures/CellData";
import { Algorithm } from "./enums";
import a_star from "../algorithms/astar";
import dijikstra from "../algorithms/dijikstra";
import bfs from "../algorithms/bfs";
import dfs from "../algorithms/dfs";
import recursive_division_maze from "../algorithms/recursive_division_maze";

let Pathfinder = (props) => {
  const DEFAULT_START_ROW = Math.round(props.gridRows / 2.0);
  const DEFAULT_START_COL = Math.round(props.gridColumns * 0.1);
  const DEFAULT_GOAL_ROW = Math.round(props.gridRows / 2.0);
  const DEFAULT_GOAL_COL = Math.round(props.gridColumns - props.gridColumns * 0.1);

  const getInitialGrid = (rows, cols) => {
    const grid = [];
    for (let row = 0; row < rows; row++) {
      const curRow = [];
      for (let col = 0; col < cols; col++) {
        if (row === DEFAULT_START_ROW && col === DEFAULT_START_COL) {
          curRow.push(new CellData(row, col, CellType.START));
        } else if (row === DEFAULT_GOAL_ROW && col === DEFAULT_GOAL_COL) {
          curRow.push(new CellData(row, col, CellType.GOAL));
        } else {
          curRow.push(new CellData(row, col, CellType.STANDARD));
        }
      }
      grid.push(curRow);
    }
    return grid;
  };

  const [grid, setGrid] = useState(getInitialGrid(props.gridRows, props.gridColumns));
  const [startCell, setStartCell] = useState(grid[DEFAULT_START_ROW][DEFAULT_START_COL]);
  const [goalCell, setGoalCell] = useState(grid[DEFAULT_GOAL_ROW][DEFAULT_GOAL_COL]);
  const [selectedAlgo, setSelectedAlgo] = useState(Algorithm.ASTAR_8);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [draggingCell, setDraggingCell] = useState(false);
  const [draggedCellType, setDraggedCellType] = useState(undefined);
  const [draggedFrom, setDraggedFrom] = useState(undefined);
  const [draggedTo, setDraggedTo] = useState(undefined);

  const clearGrid = () => {
    var newGrid = grid.slice();
    newGrid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.row === DEFAULT_START_ROW && cell.col === DEFAULT_START_COL) {
          newGrid[cell.row][cell.col] = cell.asType(CellType.START);
          document.getElementById(cell.id).className = "grid-cell start-cell";
        } else if (cell.row === DEFAULT_GOAL_ROW && cell.col === DEFAULT_GOAL_COL) {
          newGrid[cell.row][cell.col] = cell.asType(CellType.GOAL);
          document.getElementById(cell.id).className = "grid-cell goal-cell";
        } else {
          newGrid[cell.row][cell.col] = cell.asType(CellType.STANDARD);
          document.getElementById(cell.id).className = "grid-cell";
        }
      });
    });
    setGrid(newGrid);
    setStartCell(newGrid[DEFAULT_START_ROW][DEFAULT_START_COL]);
    setGoalCell(newGrid[DEFAULT_GOAL_ROW][DEFAULT_GOAL_COL]);
  };

  const genMaze = () => {
    const wallsToAnimate = recursive_division_maze(props.gridRows, props.gridColumns, startCell, goalCell);
    var newGrid = [];
    wallsToAnimate.forEach((mazeWall, i) => {
      newGrid = placeWallAndGetGrid(mazeWall.row, mazeWall.col);
      setTimeout(() => {
        document.getElementById(mazeWall.id).className = `grid-cell wall-cell`;
      }, 10 * i);
      if (i + 1 === wallsToAnimate.length) {
        setTimeout(() => {
          setGrid(newGrid);
          return;
        }, 10 * i);
      }
    });
  };

  const placeWallAndGetGrid = (row, col) => {
    const newGrid = grid.slice();
    newGrid[row][col] = newGrid[row][col].asType(CellType.BARRIER);
    return newGrid;
  };

  const dragCellAndGetGrid = (fromRow, fromCol, toRow, toCol) => {
    let newGrid = grid.slice();
    newGrid[fromRow][fromCol] = newGrid[fromRow][fromCol].asType(CellType.STANDARD);
    newGrid[toRow][toCol] = newGrid[toRow][toCol].asType(draggedCellType);
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    setMouseIsDown(true);
    if (grid[row][col].type === CellType.START || grid[row][col].type === CellType.GOAL) {
      setDraggingCell(true);
      setDraggedCellType(grid[row][col].type);
      setDraggedFrom([row, col]);
    } else {
      const newGrid = placeWallAndGetGrid(row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsDown) return;
    if (grid[row][col].type === CellType.START || grid[row][col].type === CellType.GOAL) return;
    if (draggingCell) {
      setDraggedTo([row, col]);
      const newGrid = dragCellAndGetGrid(
        draggedFrom[0],
        draggedFrom[1],
        row /* Can't use draggedTo here yet, because the state setting calls are batched together */,
        col /* Can't use draggedTo here yet, because the state setting calls are batched together */
      );
      setGrid(newGrid);
      setDraggedFrom([row, col]);
    } else {
      const newGrid = placeWallAndGetGrid(row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
    if (draggingCell) {
      setDraggingCell(false);
      if (draggedCellType === CellType.START) {
        setStartCell(grid[draggedTo[0]][draggedTo[1]]);
      } else {
        setGoalCell(grid[draggedTo[0]][draggedTo[1]]);
      }
      setDraggedCellType(undefined);
      setDraggedFrom(undefined);
      setDraggedTo(undefined);
    }
  };

  const runAnimatedAlgo = () => {
    var result = undefined;
    switch (selectedAlgo) {
      case Algorithm.ASTAR_8:
        result = a_star(grid, startCell, goalCell, true);
        break;
      case Algorithm.ASTAR_4:
        result = a_star(grid, startCell, goalCell, false);
        break;
      case Algorithm.DFS:
        result = dfs(grid, startCell, goalCell);
        break;
      case Algorithm.BFS:
        result = bfs(grid, startCell, goalCell);
        break;
      case Algorithm.DIJIKSTRA:
        result = dijikstra(grid, startCell, goalCell);
        break;
      // case Algorithm.SWARM:
      //   result = a_star(grid, startCell, goalCell, true);
      //   break;
      // case Algorithm.CONVERGENT_SWARM:
      //   result = a_star(grid, startCell, goalCell, true);
      //   break;
      // case Algorithm.BIDIRECTIONAL_SWARM:
      //   result = a_star(grid, startCell, goalCell, true);
      //   break;
      // case Algorithm.GREEDY_BEST_FS:
      //   result = a_star(grid, startCell, goalCell, true);
      //   break;
      default:
        result = a_star(grid, startCell, goalCell, true);
        break;
    }
    const visitedNodes = result[0];
    const reconstructedRoute = result[1];
    animateAlgo(visitedNodes, reconstructedRoute);
  };

  const animateAlgo = (visitedNodes, reconstructedRoute) => {
    visitedNodes.forEach((visitedNode, i) => {
      setTimeout(() => {
        document.getElementById(visitedNode.id).className = `grid-cell visited`;
      }, 10 * i);
      if (i + 1 === visitedNodes.length) {
        setTimeout(() => {
          animateRouteReconstruction(reconstructedRoute);
        }, 10 * i);
        return;
      }
    });
  };

  const animateRouteReconstruction = (reconstructedRoute) => {
    reconstructedRoute.forEach((routeNode, i) => {
      setTimeout(() => {
        document.getElementById(routeNode.id).className = "grid-cell route";
      }, 50 * i);
    });
  };

  return (
    <React.Fragment>
      <TopBar clearGrid={clearGrid} setAlgo={setSelectedAlgo} selectedAlgoName={selectedAlgo} runAnimatedAlgo={runAnimatedAlgo} genMaze={genMaze} />
      <div className="grid-parent" onMouseUp={() => handleMouseUp()}>
        <Grid cells={grid} onMouseDown={handleMouseDown} onMouseEnter={handleMouseEnter} />
      </div>
    </React.Fragment>
  );
};

Pathfinder.propTypes = {
  gridRows: PropTypes.number,
  gridColumns: PropTypes.number,
};

Pathfinder.defaultProps = {
  gridRows: 20,
  gridColumns: 50,
};

Pathfinder = React.memo(Pathfinder);

export default Pathfinder;
