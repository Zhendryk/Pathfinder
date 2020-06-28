import React, { useState } from "react";
import "./Pathfinder.css";
import PropTypes from "prop-types";
import Grid from "./Grid";
import TopBar from "./TopBar";
import { CellType, CellData } from "../datastructures/CellData";
import { a_star } from "../algorithms/astar";
import { PlacementMode, Algorithm } from "./enums";

const DEFAULT_START = [10, 5];
const DEFAULT_GOAL = [10, 45];

const getInitialGrid = (rows, cols) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const curRow = [];
    for (let col = 0; col < cols; col++) {
      if (row === DEFAULT_START[0] && col === DEFAULT_START[1]) {
        curRow.push(new CellData(row, col, CellType.START));
      } else if (row === DEFAULT_GOAL[0] && col === DEFAULT_GOAL[1]) {
        curRow.push(new CellData(row, col, CellType.GOAL));
      } else {
        curRow.push(new CellData(row, col, CellType.STANDARD));
      }
    }
    grid.push(curRow);
  }
  return grid;
};

const cellTypeForPlacementMode = (mode) => {
  switch (mode) {
    case PlacementMode.START:
      return CellType.START;
    case PlacementMode.GOAL:
      return CellType.GOAL;
    case PlacementMode.WEIGHTED:
      return CellType.WEIGHTED;
    case PlacementMode.BARRIER:
    default:
      return CellType.BARRIER;
  }
};

export default function Pathfinder(props) {
  const initialGrid = getInitialGrid(props.gridRows, props.gridColumns);
  const [grid, setGrid] = useState(initialGrid);
  const [startCell, setStartCell] = useState(
    grid[DEFAULT_START[0]][DEFAULT_START[1]]
  );
  const [goalCell, setGoalCell] = useState(
    grid[DEFAULT_GOAL[0]][DEFAULT_GOAL[1]]
  );
  const [placementMode, setPlacementMode] = useState(PlacementMode.BARRIER);
  const [selectedAlgo, setSelectedAlgo] = useState(Algorithm.ASTAR_8);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [draggingCell, setDraggingCell] = useState(false);
  const [draggedCellType, setDraggedCellType] = useState(undefined);
  const [draggedFrom, setDraggedFrom] = useState(undefined);
  const [draggedTo, setDraggedTo] = useState(undefined);

  // TODO: Look into why this doesn't work after running the algo
  const clearGrid = () => {
    setGrid(getInitialGrid(props.gridRows, props.gridColumns));
    console.log("Gello");
  };

  const placeCellsAndGetResultingGrid = (
    coords,
    typesToPlace = [cellTypeForPlacementMode(placementMode)]
  ) => {
    let newGrid = grid.slice();
    coords.forEach((coord, i) => {
      const ttp = typesToPlace[i];
      const row = coord[0];
      const col = coord[1];
      newGrid[row][col] = newGrid[row][col].asType(ttp);
      if (ttp === CellType.START) {
        setStartCell(newGrid[row][col]);
      } else if (ttp === CellType.GOAL) {
        setGoalCell(newGrid[row][col]);
      }
    });
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    setMouseIsDown(true);
    if (
      grid[row][col].type === CellType.START ||
      grid[row][col].type === CellType.GOAL
    ) {
      setDraggingCell(true);
      setDraggedCellType(grid[row][col].type);
      setDraggedFrom([row, col]);
    } else {
      const newGrid = placeCellsAndGetResultingGrid([[row, col]]);
      setGrid(newGrid);
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsDown) return;
    if (draggingCell) {
      setDraggedTo([row, col]);
      const dfr = draggedFrom[0];
      const dfc = draggedFrom[1];
      document.getElementById(grid[dfr][dfc].id).className = `grid-cell`;
      document.getElementById(
        grid[row][col].id
      ).className = `grid-cell ${draggedCellType}`;
      setDraggedFrom([row, col]);
    } else {
      const newGrid = placeCellsAndGetResultingGrid([[row, col]]);
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
      const newGrid = placeCellsAndGetResultingGrid([[]]);
    }
    setDraggedCellType(undefined);
    setDraggedFrom(undefined);
    setDraggedTo(undefined);
  };

  const runAnimatedAlgo = () => {
    // TODO: Make this run the currently selected algo instead (switch on selected type and store result)
    var result = a_star(grid, startCell, goalCell);
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
      <TopBar
        clearGrid={clearGrid}
        setAlgo={setSelectedAlgo}
        selectedAlgoName={selectedAlgo}
        runAnimatedAlgo={runAnimatedAlgo}
      />
      <div className="grid-parent" onMouseUp={() => handleMouseUp()}>
        <Grid
          cells={grid}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
        />
      </div>
    </React.Fragment>
  );
}

Pathfinder.propTypes = {
  gridRows: PropTypes.number,
  gridColumns: PropTypes.number,
};

Pathfinder.defaultProps = {
  gridRows: 20,
  gridColumns: 50,
};
