import React, {useCallback, useEffect} from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  ConnectionLineType, Position,
} from "react-flow-renderer";
import { bindActionCreators } from 'redux';
import { selectionAction, setAllNodesAction, setAllEdgesAction } from '../store/action/selectionAction';
import {getAllEdges, getAllNodes, getSelectedNode} from '../store/reducer/selectionReducer';
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";

const mapStateToProps = state => {
  return {
    selectedItem: getSelectedNode(state),
    allNodes: getAllNodes(state),
    allEdges: getAllEdges(state)
  }
};
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
      {
        selectionAction,
        setAllNodesAction,
        setAllEdgesAction
      },
      dispatch
  )
});

function ReactFlowRenderer(props) {
  let { selectionAction, setAllNodesAction, allNodes, allEdges} = props;

  let _nodes = [];
  if (localStorage.getItem("nodes") !== null)
      _nodes = JSON.parse(localStorage.getItem("nodes"));

  let _edges = [];
  if (localStorage.getItem("edges") !== null)
    _edges = JSON.parse(localStorage.getItem("edges"));

    useEffect(() => {
        let timer = setTimeout(() => {
            let runningTrigger = localStorage.getItem("runningTrigger");

        }, 100);
        return () => clearTimeout(timer);
    }, [100]);


  const [nodes, setNodes, onNodesChange] = useNodesState(_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(_edges);
  
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: ConnectionLineType.ConnectionLineType,
        animated: true,
        style: { stroke: "white" },
      };
      setEdges((eds) => eds.concat(newEdge));
      let _edges = edges;
      _edges.push(newEdge);
      setAllEdgesAction(_edges);
    },
    [setEdges, setAllEdgesAction, edges]

  );
  const getNodeId = () => Math.floor(Math.random() * 100000000) + 1;

  function onInit() {
    localStorage.setItem("runningTrigger", "0");
  }

  function onNodeItemClick(e, item) {
    localStorage.setItem("runningTrigger", "1");
    selectionAction(item);
    setAllNodesAction(nodes);
  }

  const onAdd = useCallback(
    (data) => {
      const newNode = {
        id: String(getNodeId()),
        data: { label: data },
        type: "default",
        position: {
          x: 50,
          y: Math.round(Math.random() * 500) + 50,
        },
        style: {
          background: '#808080',
          color: 'white',
          width: 100,
          fontsize: 10
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
      setNodes((nds) => nds.concat(newNode));

      let _nodes = nodes;
      _nodes.push(newNode);
      setAllNodesAction(_nodes);
    },
    [setNodes, nodes]
  );

  return (
    <div style={{ height: "100vh"}}>
      <h3 className="text-center text-white">TITLE 1</h3>
      <button className="btn btn-secondary" style={{marginLeft:"30px"}} onClick={() => onAdd("New Node")}>
        Add Custom Name Node
      </button>
      <div style={{ height: "91vh"}}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={onInit}
            fitView
            attributionPosition="bottom-left"
            onNodeClick={onNodeItemClick}
            connectionLineType={ConnectionLineType.SmoothStep}>
        </ReactFlow>
      </div>
    </div>
  );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactFlowRenderer);
