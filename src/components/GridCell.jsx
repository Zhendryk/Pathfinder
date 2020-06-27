import React from "react";
import PropTypes from "prop-types";
import { CellData, CellType } from "../datastructures/CellData";
import "./GridCell.css";

export default function GridCell(props) {
  const cType = props.data.type;
  const subclass =
    cType === CellType.START
      ? " start-cell"
      : cType === CellType.GOAL
      ? " goal-cell"
      : cType === CellType.WEIGHTED
      ? " weighted-cell"
      : cType === CellType.BARRIER
      ? " wall-cell"
      : cType === CellType.VISITED
      ? " visited"
      : cType === CellType.ADDED_TO_ROUTE
      ? " route"
      : "";

  return (
    <div
      className={`grid-cell${subclass}`}
      key={`key_${props.data.id}`}
      id={props.data.id}
      onMouseDown={() => props.onMouseDown(props.data.row, props.data.col)}
      onMouseEnter={() => props.onMouseEnter(props.data.row, props.data.col)}
    ></div>
  );
}

GridCell.propTypes = {
  data: PropTypes.instanceOf(CellData),
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
};

GridCell.defaultProps = {
  data: new CellData(),
  onMouseDown: () => void 0,
  onMouseEnter: () => void 0,
};
