import React from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import GridData from '../datastructures/GridData';
import { CellType } from '../datastructures/CellData'

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { a_star } from '../algorithms/astar';

const PlacementMode = {
    BARRIER: 0,
    START: 1,
    GOAL: 2,
    WEIGHTED: 3,
}


const delayLoop = (fn, delay) => {
    return (x, i) => {
        setTimeout(() => {
            fn(x);
        }, i * delay);
    }
};

export default class Pathfinder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grid: new GridData(this.props.gridRows, this.props.gridColumns),
            placementMode: PlacementMode.BARRIER
        }
        this.onCellClick = this.onCellClick.bind(this);
        this.updateCell = this.updateCell.bind(this);
        this.onClickPlaceStart = this.onClickPlaceStart.bind(this);
        this.onClickPlaceGoal = this.onClickPlaceGoal.bind(this);
        this.onClickPlaceWeight = this.onClickPlaceWeight.bind(this);
        this.animateAStar = this.animateAStar.bind(this);
    }

    animateAStar() {
        var result = a_star(this.state.grid, this.state.grid.start, this.state.grid.goal);
        const updatesInOrder = result[0].concat(result[1]);

        updatesInOrder.forEach((updatedNode, i) => {
            if (updatedNode.id !== this.state.grid.start.id && updatedNode.id !== this.state.grid.goal.id) {
                this.updateCell(updatedNode);
            }
        });
    }

    updateCell(newData) {
        const newGrid = { ...this.state.grid };
        const dataToChange = newGrid.cells[newData.row][newData.col];
        newGrid.cells[newData.row][newData.col] = dataToChange.toType(newData.type);
        this.setState(state => ({
            ...state,
            grid: newGrid
        }))
    }

    handleMouseDown() {

    }

    onCellClick(cellData) {
        var nextType = undefined;
        const newGrid = this.state.grid;
        switch (this.state.placementMode) {
            case PlacementMode.START:
                nextType = CellType.START;
                newGrid.start = newGrid.cells[cellData.row][cellData.col];
                break;
            case PlacementMode.GOAL:
                nextType = CellType.GOAL;
                newGrid.goal = newGrid.cells[cellData.row][cellData.col];
                break;
            case PlacementMode.WEIGHTED:
                nextType = CellType.WEIGHTED;
                break;
            case PlacementMode.BARRIER:
            default:
                nextType = CellType.BARRIER;
        }
        const dataToChange = newGrid.cells[cellData.row][cellData.col];
        newGrid.cells[cellData.row][cellData.col] = dataToChange.toType(nextType);
        this.setState(state => ({
            grid: newGrid,
            placementMode: PlacementMode.BARRIER
        }))
    }

    onCellMouseDown() {

    }

    onCellMouseEnter() {

    }

    onCellMouseUp() {

    }

    onClickPlaceStart() {
        this.setState(state => ({
            ...state,
            placementMode: PlacementMode.START
        }));
    }
    onClickPlaceGoal() {
        this.setState(state => ({
            ...state,
            placementMode: PlacementMode.GOAL
        }));
    }
    onClickPlaceWeight() {
        this.setState(state => ({
            ...state,
            placementMode: PlacementMode.WEIGHTED
        }));
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
                <Grid cells={this.state.grid.cells} onCellClick={this.onCellClick} />
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