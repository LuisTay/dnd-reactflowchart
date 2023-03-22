import {ALL_EDGES, ALL_NODES, SELECTED_NODE} from '../constant/selectionConstants'

// Action/Dispatch
// Action for SELECTED_NODE
export const selectionAction = value => {
  return { type: SELECTED_NODE, value }
}

export const setAllNodesAction = value => {
  localStorage.setItem("nodes", JSON.stringify(value));
  return { type: ALL_NODES, value }
}

export const setAllEdgesAction = value => {
  localStorage.setItem("edges", JSON.stringify(value));
  return { type: ALL_EDGES, value }
}