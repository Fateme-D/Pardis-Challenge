import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import TableComponent from "./componenet/TableComponent/TableComponent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ToastContainer />
        <TableComponent />
      </div>
    </Provider>
  );
}

export default App;
