export const PlacementMode = {
  BARRIER: 0,
  START: 1,
  GOAL: 2,
  WEIGHTED: 3,
};

export const Algorithm = {
  ASTAR_8: "A* (8-Connectivity)",
  ASTAR_4: "A* (4-Connectivity)",
  DFS: "Depth-First Search",
  BFS: "Breadth-First Search",
  DIJIKSTRA: "Dijikstra's",
  SWARM: "Swarm",
  CONVERGENT_SWARM: "Convergent Swarm",
  BIDIRECTIONAL_SWARM: "Bi-directional Swarm",
  GREEDY_BEST_FS: "Greedy Best-First Search",
};
