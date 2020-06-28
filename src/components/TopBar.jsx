import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Algorithm } from "./enums";

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: "1rem",
    color: theme.palette.primary.contrastText,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "1em",
  },
  menu: {
    textAlign: "center",
    color: theme.palette.primary.contrastText,
  },
  btn: {
    textAlign: "center",
    height: 35,
    marginLeft: "5px",
    marginRight: "5px",
    border: 0,
    borderRadius: 3,
    color: theme.palette.primary.contrastText,
  },
  runBtn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
  },
}));

export default function TopBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAlgoSelection = (algo) => {
    props.setAlgo(algo);
    handleClose();
  };

  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.title} variant="h4">
          Pathfinder
        </Typography>
        <div className={classes.itemContainer}>
          <Button className={classes.menu} aria-controls="algorithms-menu" aria-haspopup="true" onClick={handleClick}>
            Algorithms
          </Button>
          <Menu id="algorithms-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => handleAlgoSelection(Algorithm.ASTAR_8)}>{Algorithm.ASTAR_8}</MenuItem>
            <MenuItem onClick={() => handleAlgoSelection(Algorithm.ASTAR_4)}>{Algorithm.ASTAR_4}</MenuItem>
            <MenuItem onClick={() => handleAlgoSelection(Algorithm.DIJIKSTRA)}>{Algorithm.DIJIKSTRA}</MenuItem>
            <MenuItem onClick={() => handleAlgoSelection(Algorithm.DFS)}>{Algorithm.DFS}</MenuItem>
            <MenuItem onClick={() => handleAlgoSelection(Algorithm.BFS)}>{Algorithm.BFS}</MenuItem>
            {/* <MenuItem
              onClick={() => handleAlgoSelection(Algorithm.GREEDY_BEST_FS)}
            >
              {Algorithm.GREEDY_BEST_FS}
            </MenuItem>
            <MenuItem onClick={() => handleAlgoSelection(Algorithm.SWARM)}>
              {Algorithm.SWARM}
            </MenuItem>
            <MenuItem
              onClick={() => handleAlgoSelection(Algorithm.CONVERGENT_SWARM)}
            >
              {Algorithm.CONVERGENT_SWARM}
            </MenuItem>
            <MenuItem
              onClick={() => handleAlgoSelection(Algorithm.BIDIRECTIONAL_SWARM)}
            >
              {Algorithm.BIDIRECTIONAL_SWARM}
            </MenuItem> */}
          </Menu>
        </div>
        <div className={classes.itemContainer}>
          <Button className={classes.btn} onClick={() => props.clearGrid()}>
            Clear Grid
          </Button>
          {/* <Button className={classes.btn} onClick={() => props.genMaze()}>
            Generate Maze
          </Button> */}
          <Button className={`${classes.btn} ${classes.runBtn}`} onClick={props.runAnimatedAlgo}>
            {`Run ${props.selectedAlgoName}`}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
