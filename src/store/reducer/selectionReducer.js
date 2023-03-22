import {ALL_EDGES, ALL_NODES, SELECTED_NODE} from '../constant/selectionConstants'

const initState = {
  selectedNode: {
    id: '',
    data: {
      label: ''
    }
  },
  allNodes: [],
  allEdges: []
}

// Mutations/Reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initState, action) => {
  switch (action.type) {
    case SELECTED_NODE:
      return Object.assign({}, state, {
        selectedNode: action.value
      })
    case ALL_NODES:
      return Object.assign({}, state, {
        allNodes: action.value
      })
    case ALL_EDGES:
      return Object.assign({}, state, {
        allEdges: action.value
      })
    default:
      return state
  }
}

// getters
export const getSelectedNode = state => state.selection.selectedNode;

export const getAllNodes = state => state.selection.allNodes;

export const getAllEdges = state => state.selection.allEdges;
