import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GridCell from "./GridCell";

const GridContainer = styled.div`
  display: grid;
  gap: 1px 1px;
  width: ${(props) => props.totalWidthPixels + 2}px;
  grid-template-rows: repeat(
    ${(props) => props.cellsPerRow},
    ${(props) => props.cellHeightPixels}px
  );
  grid-template-columns: repeat(
    ${(props) => props.cellsPerCol},
    ${(props) => props.cellWidthPixels}px
  );
  padding: 2px;
  background-color: lightgray;
`;

export default function Grid(props) {
  GridContainer.defaultProps = {
    totalWidthPixels:
      props.cells[0].length * 30 +
      (props.cells[0].length - 2) * 1 /* Num columns * widthpx of each */,
    cellsPerRow: props.cells.length,
    cellsPerCol: props.cells[0].length,
    cellHeightPixels: 30,
    cellWidthPixels: 30,
  };
  return (
    <GridContainer>
      {props.cells.map((rowArr) => {
        return rowArr.map((cellData) => (
          <GridCell
            data={cellData}
            onMouseDown={props.onMouseDown}
            onMouseEnter={props.onMouseEnter}
            onMouseUp={props.onMouseUp}
          />
        ));
      })}
    </GridContainer>
  );
}

Grid.propTypes = {
  cells: PropTypes.array,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseUp: PropTypes.func,
};

Grid.defaultProps = {
  cells: [],
  onMouseDown: () => void 0,
  onMouseEnter: () => void 0,
  onMouseUp: () => void 0,
};
