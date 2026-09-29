import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

const tabs=[["all","Tất cả"],["pending","Chờ xử lý"],["processing","Đang xử lý"],["shipping","Đang giao"],["completed","Hoàn thành"],["cancelled","Đã hủy"]];

export default function Orders(){
  const [orders,setOrders]=useState([]); const [filter,setFilter]=useState("all");
  const load=()=>api.get("/orders").then(r=>setOrders(filter==="all"?r.data:r.data.filter(o=>o.order_status===filter)));
  useEffect(()=>{load()},[filter]);
  const change=async(id,status)=>{await api.put(`/orders/${id}/status`,{status});load()};
  return <div className="admin-app"><Sidebar/><div className="admin-content"><Header title="Quản Lý Đơn Hàng"/><main className="admin-main"><div className="filter-tabs">{tabs.map(([v,l])=><button key={v} className={filter===v?"active":""} onClick={()=>setFilter(v)}>{l}</button>)}</div><div className="admin-card"><table className="data-table"><thead><tr><th>Mã Đơn</th><th>Khách Hàng</th><th>Số Điện Thoại</th><th>Tổng Thanh Toán</th><th>Thanh Toán</th><th>Trạng Thái</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td><b>#{o.order_code}</b></td><td>{o.receiver_name}</td><td>{o.receiver_phone}</td><td className="money">{Number(o.total_amount).toLocaleString("vi-VN")} đ</td><td>{o.payment_method}</td><td><select className="status-select" value={o.order_status} onChange={e=>change(o.id,e.target.value)}>{tabs.slice(1).map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></td></tr>)}</tbody></table></div></main></div></div>;
}
