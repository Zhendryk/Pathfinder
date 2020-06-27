import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { CellData, CellType } from "../datastructures/CellData";
import startIcon from "../assets/start.png";
import goalIcon from "../assets/goal.png";
import weightIcon from "../assets/weight.png";

const visitKeyframe = keyframes`
    0% {}
    50% {
        background-color: red;
    }
    100% {
        background-color: blue;
    }
`;

// TODO: Figure out how to do responsive square grid with non-square grid dimensions
const StyledGridCell = styled.div`
    width: 26px;
    height: 26px;
    outline: 1px solid rgba(50, 50, 50, 0.349);
    margin-top: -1px;
    margin-right: 1px;
    display: inline-block;
    background-color: white;
`;

const StyledStartCell = styled(StyledGridCell)`
  background-color: #7cfc00;
  background-image: url(${startIcon});
  background-repeat: no-repeat;
  background-size: 24px 24px;
`;

const StyledGoalCell = styled(StyledGridCell)`
  background-color: #ff6347;
  background-image: url(${goalIcon});
  background-repeat: no-repeat;
  background-size: 24px 24px;
`;

const StyledWeightCell = styled(StyledGridCell)`
  background-color: #a9a9a9;
  background-image: url(${weightIcon});
  background-repeat: no-repeat;
  background-size: 24px 24px;
`;

const StyledBarrierCell = styled(StyledGridCell)`
  background-color: black;
`;

const StyledVisitedCell = styled(StyledGridCell)`
  background-color: blue;
  animation: ${visitKeyframe} 1.5s ease-out 0s alternate 1 forwards running;
`;

const StyledRouteCell = styled(StyledGridCell)`
  background-color: yellow;
`;

export default function GridCell(props) {
  switch (props.data.type) {
    case CellType.START:
      return (
        <StyledStartCell
          onMouseDown={() => props.onMouseDown(props.row, props.col)}
          onMouseEnter={() =>
            props.onMouseEnter(props.row, props.col)
          }
          onMouseUp={() => props.onMouseUp()}
        />
      );
    case CellType.GOAL:
      return (
        <StyledGoalCell
          onMouseDown={() => props.onMouseDown(props.row, props.col)}
          onMouseEnter={() =>
            props.onMouseEnter(props.row, props.col)
          }
          onMouseUp={() => props.onMouseUp()}
        />
      );
    case CellType.BARRIER:
      return (
        <StyledBarrierCell
          onMouseDown={() => props.onMouseDown(props.row, props.col)}
          onMouseEnter={() =>
            props.onMouseEnter(props.row, props.col)
          }
          onMouseUp={() => props.onMouseUp()}
        />
      );
    case CellType.WEIGHTED:
      return (
        <StyledWeightCell
          onMouseDown={() => props.onMouseDown(props.row, props.col)}
          onMouseEnter={() =>
            props.onMouseEnter(props.row, props.col)
          }
          onMouseUp={() => props.onMouseUp()}
        />
      );
    case CellType.VISITED:
      return <StyledVisitedCell />;
    case CellType.ADDED_TO_ROUTE:
      return <StyledRouteCell />;
    case CellType.STANDARD:
    default:
      return (
        <StyledGridCell
          onMouseDown={() => props.onMouseDown(props.row, props.col)}
          onMouseEnter={() =>
            props.onMouseEnter(props.row, props.col)
          }
          onMouseUp={() => props.onMouseUp()}
        />
      );
  }
}

GridCell.propTypes = {
    data: PropTypes.instanceOf(CellData),
    row: PropTypes.number,
    col: PropTypes.number,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseUp: PropTypes.func
};

GridCell.defaultProps = {
    data: new CellData(),
    row: undefined,
    col: undefined,
    onMouseDown: () => void 0,
    onMouseEnter: () => void 0,
    onMouseUp: () => void 0,
};
