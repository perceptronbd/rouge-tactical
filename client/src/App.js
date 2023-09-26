import DashboardPage from "./pages/DashboardPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
<>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />

        </Routes>
      </Router>
    </>
    
  );
}

export default App;
