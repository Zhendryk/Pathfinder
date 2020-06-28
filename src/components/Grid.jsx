import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GridCell from "./GridCell";

const GridContainer = styled.div`
  display: grid;
  gap: 1px 1px;
  width: ${(props) => props.totalWidthPixels + 1}px;
  grid-template-rows: repeat(${(props) => props.cellsPerRow}, ${(props) => props.cellHeightPixels}px);
  grid-template-columns: repeat(${(props) => props.cellsPerCol}, ${(props) => props.cellWidthPixels}px);
  padding: 2px;
  background-color: lightgray;
`;

export default function Grid(props) {
  GridContainer.defaultProps = {
    totalWidthPixels: props.cells[0].length * 30 + (props.cells[0].length - 2) * 1 /* (NumCols * colWidth) + (NumInternalCols * ColGap) */,
    cellsPerRow: props.cells.length,
    cellsPerCol: props.cells[0].length,
    cellHeightPixels: 30,
    cellWidthPixels: 30,
  };
  return (
    <GridContainer id="grid-container">
      {props.cells.map((rowArr) => {
        return rowArr.map((cellData) => (
          <GridCell key={`key_${cellData.id}`} data={cellData} onMouseDown={props.onMouseDown} onMouseEnter={props.onMouseEnter} />
        ));
      })}
    </GridContainer>
  );
}

Grid.propTypes = {
  cells: PropTypes.array,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

Grid.defaultProps = {
  cells: [],
  onMouseDown: () => void 0,
  onMouseEnter: () => void 0,
};
