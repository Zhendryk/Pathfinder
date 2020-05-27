import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CellData, CellType } from '../datastructures/CellData';
import startIcon from '../assets/start.png';
import goalIcon from '../assets/goal.png';
import weightIcon from '../assets/weight.png';


// TODO: Figure out how to do responsive square grid with non-square grid dimensions
const StyledGridCell = styled.div`
    display: block
    background-color: white;
    border: 1px solid black;
    min-width: 10px;
    padding-bottom: 100%;
    margin: 1.66%;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
`;

const StyledStartCell = styled(StyledGridCell)`
    background-color: #7CFC00;
    background-image:url(${startIcon});
`;
const StyledGoalCell = styled(StyledGridCell)`
    background-color: #FF6347;
    background-image:url(${goalIcon});
`;
const StyledWeightCell = styled(StyledGridCell)`
    background-color: #A9A9A9;
    background-image:url(${weightIcon});
`;
const StyledBarrierCell = styled(StyledGridCell)`
    background-color: black;
`;
const StyledVisitedCell = styled(StyledGridCell)`
    background-color: blue;
`;
const StyledRouteCell = styled(StyledGridCell)`
    background-color: yellow;
`;

export default function GridCell(props) {
    switch (props.data.type) {
        case CellType.START:
            return <StyledStartCell onClick={() => props.onCellClick(props.data)} />;
        case CellType.GOAL:
            return <StyledGoalCell onClick={() => props.onCellClick(props.data)} />;
        case CellType.BARRIER:
            return <StyledBarrierCell onClick={() => props.onCellClick(props.data)} />;
        case CellType.WEIGHTED:
            return <StyledWeightCell onClick={() => props.onCellClick(props.data)} />;
        case CellType.VISITED:
            return <StyledVisitedCell />;
        case CellType.ADDED_TO_ROUTE:
            return <StyledRouteCell />;
        case CellType.STANDARD:
        default:
            return <StyledGridCell onClick={() => props.onCellClick(props.data)} />;
    }
}

GridCell.propTypes = {
    data: PropTypes.instanceOf(CellData),
    onCellClick: PropTypes.func
};

GridCell.defaultProps = {
    data: new CellData(),
    onCellClick: (() => void 0)
};
