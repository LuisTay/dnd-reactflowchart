import React, {useEffect, useState} from "react";
import { bindActionCreators } from 'redux';
import { selectionAction, setAllNodesAction } from '../store/action/selectionAction';
import { getSelectedNode, getAllNodes} from '../store/reducer/selectionReducer';
import image1 from "../img1.png"
import {connect} from "react-redux";

const mapStateToProps = state => {
    return {
        selectedItem: getSelectedNode(state),
        allNodes: getAllNodes(state)
    }
};
const mapDispatchToProps = dispatch => ({
    ...bindActionCreators(
        {
            selectionAction,
            setAllNodesAction
        },
        dispatch
    )
});

function ReactFlowEditor(props) {
    const { selectionAction, selectedItem, setAllNodesAction, allNodes} = props;

    let _strContent = "";
    if (localStorage.getItem("strContent") !== null) _strContent = localStorage.getItem("strContent");

    const [strTitle, setStrTitle] = useState("");
    // setStrTitle(selectedItem.data.label);
    const [strContent, setStrContent] = useState(_strContent);

    useEffect(() => {
        let timer = setTimeout(() => {
            let runningTrigger = localStorage.getItem("runningTrigger");
            if (runningTrigger === "1") {
                setStrTitle(selectedItem.data.label);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [1000]);

    const handleTitleChange = (event) => {
        setStrTitle(event.target.value);
        // let currentNode = selectedItem;
        // currentNode.data.label = event.target.value;
        // selectionAction(currentNode);
    }
    const handleContentChange = (event) => {
        setStrContent(event.target.value)
    }

    const handleTitleSubmit = (event) => {
        event.preventDefault();
        let _nodes = allNodes;
        for (let i in _nodes) {
            if (_nodes[i].id === selectedItem.id) {
                _nodes[i].data.label = strTitle;
            }
        }
        setAllNodesAction(_nodes);
    }

    const handleContentSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("strContent", strContent);
    }

    return (
        <div style={{ height: "100vh"}}>
            <div className="row">
                <h3 className="text-center text-white">TITLE 2</h3>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-6 p-3" style={{textAlign: "center"}}>
                    <img className="frm-border-2rem" src={image1} alt="Placeholder" />
                    {/* <img src="img1.png" height="100%" width="100%" style="border-radius: 2rem; width:20vw; height:20vw;"> */}
                </div>
                <div className="col-lg-6 p-3" style={{textAlign: "center"}}>
                    <form className="bg-white frm-border-2rem">
                        <div className="row h-75">

                        </div>
                        <div className="row px-4">
                            <input type={"text"} className="form-control text-white" placeholder="Search" style={{backgroundColor: "gray", borderRadius: "1rem", color:"white"}}/>
                            {/* <input class="form-control text-white" type="text" style="background-color: gray; border-radius: 1rem; border-color: transparent; color:white;" placeholder="Search"> */}
                        </div>
                    </form>
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col-md-6 p-3">
                    <form className="p-3 bg-white frm-border-2rem">
                        <textarea className="form-control h-75" value={strContent} onChange={handleContentChange}/>
                        <div className="row pt-3 px-4">
                            <button className="btn btn-secondary align-bottom" onClick={handleContentSubmit}>Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-6 p-3">
                    <form className="p-3 bg-white frm-border-2rem">
                        <textarea className="form-control h-100" value={strTitle} onChange={handleTitleChange}/>
                    </form>
                </div>
            </div>

            <div className="row" style={{marginRight: "9rem", marginLeft: "9rem", marginTop:"1rem"}}>
                <button className="btn btn-secondary" onClick={handleTitleSubmit}>Placeholder</button>
            </div>
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReactFlowEditor);