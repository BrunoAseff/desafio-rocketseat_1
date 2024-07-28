import "./App.css";
import Logo from "./assets/Logo.png";
import Task from "./components/Task";
function App() {
  return (
    <>
      <div className="header">
        <img src={Logo} alt="Todo logo" />
      </div>
      <Task />
    </>
  );
}

export default App;
