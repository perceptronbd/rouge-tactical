import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeInfo, Home, Login } from "./pages";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={!user ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        exact
        path="/"
        element={user ? <Home /> : <Navigate to={"/login"} replace />}
      >
        <Route path="" element={<EmployeeInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
