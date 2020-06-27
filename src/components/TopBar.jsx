import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default function TopBar(props) {
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button onClick={props.onClickPlaceStart}>Place Start Node</Button>
      <Button onClick={props.onClickPlaceGoal}>Place Goal Node</Button>
      <Button onClick={props.onClickPlaceWeight}>Place Weight Node</Button>
      <Button onClick={props.animateAStar}>Run</Button>
    </ButtonGroup>
  );
}
