import { Provider } from 'react-redux';
// store
import configureStore from './store';
import ReactFlowRenderer from "./components/ReactFlowRenderer";
import ReactFlowEditor from "./components/ReactFlowEditor";
// import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
function App() {
  return (
    <div>
      <Provider store={configureStore()}>
        <div className="row frm-bg-gray">
          <div className="col-md-6">
            <div style={{backgroundColor:"black", margin:"20px"}}>
              <ReactFlowRenderer />
            </div>
          </div>
          <div className="col-md-6">
            <div style={{backgroundColor:"black", margin:"20px"}}>
              <ReactFlowEditor />
            </div>
          </div>
        </div>
      </Provider>
    </div>
  );
}

export default App;
