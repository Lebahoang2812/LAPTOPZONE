import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Categories from "./pages/Categories";
import Vouchers from "./pages/Vouchers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function Protected({ children }) {
  return localStorage.getItem("laptopzone_admin_token") ? children : <Navigate to="/admin-login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-login" element={<Login/>}/>
        <Route path="/" element={<Protected><Dashboard/></Protected>}/>
        <Route path="/products" element={<Protected><Products/></Protected>}/>
        <Route path="/orders" element={<Protected><Orders/></Protected>}/>
        <Route path="/customers" element={<Protected><Customers/></Protected>}/>
        <Route path="/categories" element={<Protected><Categories/></Protected>}/>
        <Route path="/vouchers" element={<Protected><Vouchers/></Protected>}/>
        <Route path="/reports" element={<Protected><Reports/></Protected>}/>
        <Route path="/settings" element={<Protected><Settings/></Protected>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </BrowserRouter>
  );
}
