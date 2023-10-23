import { Navigate, Route, Routes } from "react-router-dom";
import {
  EmployeeInfo,
  Home,
  Invoice,
  InvoiceForm,
  Login,
  Maintenance,
  Orders,
  Payments,
  Permits,
  Production,
  Purchase,
  PurchaseForm,
} from "./pages";
import { useAuth } from "./contexts/AuthContext";
import { Components } from "./components/Components";

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
        <Route path="components" element={<Components />} />
        <Route path="orders" element={<Orders />} />
        <Route path="invoice" element={<Invoice />} />
        <Route path="invoice/new" element={<InvoiceForm />} />
        <Route path="purchase" element={<Purchase />} />
        <Route path="purchase/new" element={<PurchaseForm />} />
        <Route path="permits" element={<Permits />} />
        <Route path="payments" element={<Payments />} />
        <Route path="production" element={<Production />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>
    </Routes>
  );
}

export default App;
