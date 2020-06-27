import React from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import { CellType, CellData } from "../datastructures/CellData";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { a_star } from "../algorithms/astar";

const PlacementMode = {
  BARRIER: 0,
  START: 1,
  GOAL: 2,
  WEIGHTED: 3,
};

export default class Pathfinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.getInitialGrid(),
      placementMode: PlacementMode.BARRIER,
      mouseIsDown: false,
      startCell: undefined,
      goalCell: undefined,
    };
  }

  getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < this.props.gridRows; row++) {
      const curRow = [];
      for (let col = 0; col < this.props.gridColumns; col++) {
        curRow.push(new CellData(row, col));
      }
      grid.push(curRow);
    }
    return grid;
  };

  onClickPlaceStart = () => {
    this.setState({ placementMode: PlacementMode.START });
  };

  onClickPlaceGoal = () => {
    this.setState({ placementMode: PlacementMode.GOAL });
  };

  onClickPlaceWeight = () => {
    this.setState({ placementMode: PlacementMode.WEIGHTED });
  };

  cellTypeForCurrentPlacementMode = () => {
    switch (this.state.placementMode) {
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

  placeCellAndGetResultingGrid = (row, col) => {
    let newGrid = this.state.grid.slice();
    const typeToPlace = this.cellTypeForCurrentPlacementMode();
    newGrid[row][col] = newGrid[row][col].asType(typeToPlace);
    if (typeToPlace === CellType.START) {
      this.setState({ startCell: newGrid[row][col] });
    } else if (typeToPlace === CellType.GOAL) {
      this.setState({ goalCell: newGrid[row][col] });
    }
    return newGrid;
  };

  handleMouseDown = (row, col) => {
    const newGrid = this.placeCellAndGetResultingGrid(row, col);
    this.setState({ grid: newGrid, mouseIsDown: true });
  };

  handleMouseEnter = (row, col) => {
    if (!this.state.mouseIsDown) return;
    const newGrid = this.placeCellAndGetResultingGrid(row, col);
    this.setState({ grid: newGrid });
  };

  handleMouseUp = () => {
    this.setState({ mouseIsDown: false });
  };

  updateCell = (newData) => {
    const newGrid = { ...this.state.grid };
    const dataToChange = newGrid.cells[newData.row][newData.col];
    newGrid.cells[newData.row][newData.col] = dataToChange.toType(newData.type);
    this.setState({ grid: newGrid });
  };

  animateAStar = () => {
    var result = a_star(
      this.state.grid,
      this.state.startCell,
      this.state.goalCell
    );
    const visitedNodes = result[0];
    const reconstructedRoute = result[1];
    visitedNodes.forEach((visitedNode, i) => {
      setTimeout(() => {
        document.getElementById(visitedNode.id).className = `grid-cell visited`;
      }, 10 * i);
      if (i + 1 === visitedNodes.length) {
        setTimeout(() => {
          this.animateRouteReconstruction(reconstructedRoute);
        }, 10 * i);
        return;
      }
    });
  };

  animateRouteReconstruction = (reconstructedRoute) => {
    reconstructedRoute.forEach((routeNode, i) => {
      setTimeout(() => {
        document.getElementById(routeNode.id).className = "grid-cell route";
      }, 50 * i);
    });
  };

  render() {
    return (
      <React.Fragment>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button onClick={this.onClickPlaceStart}>Place Start Node</Button>
          <Button onClick={this.onClickPlaceGoal}>Place Goal Node</Button>
          <Button onClick={this.onClickPlaceWeight}>Place Weight Node</Button>
          <Button onClick={this.animateAStar}>Run</Button>
        </ButtonGroup>
        <Grid
          cells={this.state.grid}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseUp={this.handleMouseUp}
        />
      </React.Fragment>
    );
  }
}

Pathfinder.propTypes = {
  gridRows: PropTypes.number,
  gridColumns: PropTypes.number,
};

Pathfinder.defaultProps = {
  gridRows: 20,
  gridColumns: 50,
};
