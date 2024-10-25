import "./App.css";
import { Tower } from "./components";
import { GameContextProvider } from "./context";

const App = () => {
  return (
    <div className="App">
      <h1>Infinite Word Tower</h1>
      <GameContextProvider>
        <Tower />
      </GameContextProvider>
    </div>
  );
};

export default App;
