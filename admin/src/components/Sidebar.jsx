import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Laptop, Users, Folder, TicketPercent, BarChart3, Settings, LogOut } from "lucide-react";

const items = [
  ["/", "Tổng quan", LayoutDashboard],
  ["/orders", "Đơn hàng", ShoppingCart],
  ["/products", "Sản phẩm", Laptop],
  ["/customers", "Khách hàng", Users],
  ["/categories", "Danh mục", Folder],
  ["/vouchers", "Voucher", TicketPercent],
  ["/reports", "Báo cáo", BarChart3],
  ["/settings", "Cài đặt", Settings]
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="side-logo"><span className="side-logo-box">▱</span><div><b>LAPTOPZONE</b><small>ADMIN PANEL</small></div></div>
      <nav>
        {items.map(([to,label,Icon]) => (
          <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => `side-item ${isActive ? "active" : ""}`}>
            <Icon size={19}/><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="admin-profile">
        <div className="avatar">TM</div>
        <div><b>Lê Bá Hoàng</b><small>Super Admin</small></div>
      </div>
      <button className="logout" onClick={() => { localStorage.removeItem("laptopzone_admin_token"); localStorage.removeItem("laptopzone_admin_user"); location.href="/admin-login"; }}><LogOut size={17}/> Đăng xuất</button>
    </aside>
  );
}
