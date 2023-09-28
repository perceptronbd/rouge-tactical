import { Navigate, Route, Routes } from "react-router-dom";
import { EmployeeInfo, Home, Login } from "./pages";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    id: 1,
    username: "tanjim",
    email: "tanjim@gmail.com",
  });

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
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
