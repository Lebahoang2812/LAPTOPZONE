import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

export default function Customers(){
  const [data,setData]=useState([]);
  useEffect(()=>{api.get("/customers").then(r=>setData(r.data));},[]);
  return <div className="admin-app"><Sidebar/><div className="admin-content"><Header title="Quản Lý Khách Hàng"/><main className="admin-main">
    <div className="page-top"><div><h2>Danh sách tài khoản khách hàng</h2><p>Tổng cộng: {data.length} người dùng đã đăng ký</p></div><button className="export-btn">⇩ Xuất file Excel</button></div>
    <div className="admin-card"><div className="filters"><input placeholder="Tìm kiếm khách hàng theo tên, email, số điện thoại..." /><select><option>Trạng thái: Tất cả</option></select><select><option>Chỉ tiêu: Trên 50M</option></select></div><table className="data-table"><thead><tr><th>Khách hàng</th><th>Số điện thoại</th><th>Đơn hàng</th><th>Tổng chi tiêu</th><th>Ngày tham gia</th><th>Trạng thái</th></tr></thead><tbody>{data.map(c=><tr key={c.id}><td><div className="customer-cell"><div className="avatar small">TM</div><div><b>{c.full_name}</b><small>{c.email}</small></div></div></td><td>{c.phone}</td><td>0 đơn</td><td className="money">0 đ</td><td>{new Date(c.created_at).toLocaleDateString("vi-VN")}</td><td><span className={`status ${c.status==="active"?"success":"danger"}`}>{c.status==="active"?"Mở":"Khóa"}</span></td></tr>)}</tbody></table></div>
  </main></div></div>;
}
