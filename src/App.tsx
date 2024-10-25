import "./App.css";
import { Tower } from "./components";

const App = () => {
  return (
    <div className="App">
      <div className="Header">
        <div className="TitleContainer">
          <div className="Title">Infinite Word Tower</div>
        </div>
        <div className="Padding"></div>
      </div>
      <Tower />
    </div>
  );
};

export default App;
