import "./App.css";
import { Tower } from "./components";
import { GameContextProvider } from "./context";

const App = () => {
  return (
    <div className="App">
      <GameContextProvider>
        <div className="Header">
          <div className="TitleContainer">
            <div className="Title">Infinite Word Tower</div>
          </div>
          <div className="Padding"></div>
        </div>
        <Tower />
      </GameContextProvider>
    </div>
  );
};

export default App;
