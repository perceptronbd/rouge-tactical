import { Navigate, Route, Routes } from "react-router-dom";
import { AddEmployee, EditEmployee, EmployeeInfo, Home, Login } from "./pages";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user } = useAuth();

  const isAuthenticated = !!user;

  return (
    <Routes>
      <Route
        path="login"
        element={!isAuthenticated ? <Login /> : <Navigate to={"/employee"} />}
      />
      <Route
        path="/"
        element={
          isAuthenticated ? <Home /> : <Navigate to={"/login"} replace />
        }
      >
        <Route path="employee" element={<EmployeeInfo />} />
        <Route path="employee/add" element={<AddEmployee />} />
        <Route path="employee/edit" element={<EditEmployee />} />
      </Route>
    </Routes>
  );
}

export default App;
