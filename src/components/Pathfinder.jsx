import React from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import { CellType, CellData } from '../datastructures/CellData'

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { a_star } from '../algorithms/astar';

const PlacementMode = {
    BARRIER: 0,
    START: 1,
    GOAL: 2,
    WEIGHTED: 3,
}

export default class Pathfinder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: this.getInitialGrid(),
            // grid: new GridData(this.props.gridRows, this.props.gridColumns),
            placementMode: PlacementMode.BARRIER,
            mouseIsDown: false
        }
    }

    getInitialGrid = () => {
        const grid = [];
        for(let row = 0; row < this.props.gridRows; row++) {
            const curRow = [];
            for(let col = 0; col < this.props.gridColumns; col++) {
                curRow.push(new CellData())
            }
            grid.push(curRow);
        }
        return grid;
    }

    onClickPlaceStart = () => {
        this.setState(state => ({
            ...state,
            placementMode: PlacementMode.START
        }));
    }

    onClickPlaceGoal = () => {
        this.setState(state => ({
            ...state,
            placementMode: PlacementMode.GOAL
        }));
    }

    onClickPlaceWeight = () => {
        this.setState(state => ({
            ...state,
            placementMode: PlacementMode.WEIGHTED
        }));
    }

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
    }

    placeCellAndGetResultingGrid = (row, col) => {
        // let newGrid = { ...this.state.grid }; // Deep copy
        let newGrid = this.state.grid.slice();
        newGrid[row][col] = newGrid[row][col].asType(this.cellTypeForCurrentPlacementMode());
        return newGrid;

    }

    handleMouseDown = (row, col) => {
        const newGrid = this.placeCellAndGetResultingGrid(row, col);
        this.setState(state => ({
            ...state,
            grid: newGrid,
            mouseIsDown: true
        }))
    }

    handleMouseEnter = (row, col) => {
        if (!this.state.mouseIsDown) return;
        const newGrid = this.placeCellAndGetResultingGrid(row, col);
        this.setState(state => ({
            ...state,
            grid: newGrid
        }))
    }

    handleMouseUp = () => {
        this.setState({ mouseIsDown: false })
    }

    updateCell = (newData) => {
        const newGrid = { ...this.state.grid };
        const dataToChange = newGrid.cells[newData.row][newData.col];
        newGrid.cells[newData.row][newData.col] = dataToChange.toType(newData.type);
        this.setState(state => ({
            ...state,
            grid: newGrid
        }))
    }

    animateAStar = () => {
        var result = a_star(this.state.grid, this.state.grid.start, this.state.grid.goal);
        const updatesInOrder = result[0].concat(result[1]);
        updatesInOrder.forEach((updatedNode, i) => {
            if (updatedNode.id !== this.state.grid.start.id && updatedNode.id !== this.state.grid.goal.id) {
                setTimeout(() => {
                    this.updateCell(updatedNode);
                }, 10 * i)
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button onClick={this.onClickPlaceStart}>Place Start Node</Button>
                    <Button onClick={this.onClickPlaceGoal}>Place Goal Node</Button>
                    <Button onClick={this.onClickPlaceWeight}>Place Weight Node</Button>
                    <Button onClick={this.animateAStar}>Run</Button>
                </ButtonGroup>
                <Grid cells={this.state.grid} onMouseDown={this.handleMouseDown} onMouseEnter={this.handleMouseEnter} onMouseUp={this.handleMouseUp} />
            </React.Fragment>
        );
    }
}

Pathfinder.propTypes = {
    gridRows: PropTypes.number,
    gridColumns: PropTypes.number
}

Pathfinder.defaultProps = {
    gridRows: 50,
    gridColumns: 50
}
