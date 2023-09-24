import { Route, Routes } from "react-router-dom";
import { Components } from "./components/Components";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Components />} />
    </Routes>
  );
}

export default App;
