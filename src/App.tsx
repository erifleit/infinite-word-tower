import "./App.css";
import { Modal, Tower } from "./components";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Tower />
      {/* <Modal /> */}
    </div>
  );
};

export default App;
