import "./App.css";
import { Modal, Tower } from "./components";
import { Header } from "./components/Header";
import { Keyboard } from "./components/Keyboard";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Tower />
      {/* <Modal /> */}
      <Keyboard />
    </div>
  );
};

export default App;
