import "./App.css";
import { Tower } from "./components";
import { Header } from "./components/Header";
import { Keyboard } from "./components/Keyboard";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Tower />
      <Keyboard />
      {/* <Modal /> */}
    </div>
  );
};

export default App;
