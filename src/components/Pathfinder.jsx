import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import TopBar from "./TopBar";
import { CellType, CellData } from "../datastructures/CellData";
import { a_star } from "../algorithms/astar";
import "./Pathfinder.css";

const PlacementMode = {
  BARRIER: 0,
  START: 1,
  GOAL: 2,
  WEIGHTED: 3,
};

const getInitialGrid = (rows, cols) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const curRow = [];
    for (let col = 0; col < cols; col++) {
      curRow.push(new CellData(row, col));
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
  const [grid, setGrid] = useState(
    getInitialGrid(props.gridRows, props.gridColumns)
  );
  const [placementMode, setPlacementMode] = useState(PlacementMode.BARRIER);
  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [startCell, setStartCell] = useState(undefined);
  const [goalCell, setGoalCell] = useState(undefined);

  const onClickPlaceStart = () => {
    setPlacementMode(PlacementMode.START);
  };

  const onClickPlaceGoal = () => {
    setPlacementMode(PlacementMode.GOAL);
  };

  const onClickPlaceWeight = () => {
    setPlacementMode(PlacementMode.WEIGHT);
  };

  const placeCellAndGetResultingGrid = (row, col) => {
    let newGrid = grid.slice();
    const typeToPlace = cellTypeForPlacementMode(placementMode);
    newGrid[row][col] = newGrid[row][col].asType(typeToPlace);
    if (typeToPlace === CellType.START) {
      setStartCell(newGrid[row][col]);
    } else if (typeToPlace === CellType.GOAL) {
      setGoalCell(newGrid[row][col]);
    }
    return newGrid;
  };

  const handleMouseDown = (row, col) => {
    const newGrid = placeCellAndGetResultingGrid(row, col);
    setGrid(newGrid);
    setMouseIsDown(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsDown) return;
    const newGrid = placeCellAndGetResultingGrid(row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsDown(false);
  };

  const animateAStar = () => {
    var result = a_star(grid, startCell, goalCell);
    const visitedNodes = result[0];
    const reconstructedRoute = result[1];
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
        onClickPlaceStart={onClickPlaceStart}
        onClickPlaceGoal={onClickPlaceGoal}
        onClickPlaceWeight={onClickPlaceWeight}
        animateAStar={animateAStar}
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
