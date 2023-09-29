import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeInfo, Home, Login } from "./pages";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user } = useAuth();

  const isAuthenticated = !!user;

  return (
    <Routes>
      <Route
        exact
        path="/login"
        element={!isAuthenticated ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        exact
        path="/"
        element={
          isAuthenticated ? <Home /> : <Navigate to={"/login"} replace />
        }
      >
        <Route path="" element={<EmployeeInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
