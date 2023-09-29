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
        <Route path="orders" element={<div>Orders</div>} />
        <Route path="invoice" element={<div>Invoice</div>} />
        <Route path="purchase" element={<div>Purchase</div>} />
        <Route path="permits" element={<div>Permits</div>} />
        <Route path="payments" element={<div>Payments</div>} />
        <Route path="production" element={<div>Production</div>} />
        <Route path="maintenance" element={<div>Maintenance</div>} />
      </Route>
    </Routes>
  );
}

export default App;
