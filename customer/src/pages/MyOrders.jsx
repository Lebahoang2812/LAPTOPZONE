import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";

const labels={pending:"Chờ xử lý",processing:"Đang xử lý",shipping:"Đang giao",completed:"Hoàn thành",cancelled:"Đã hủy"};

export default function MyOrders(){
  const [orders,setOrders]=useState([]); const navigate=useNavigate();
  useEffect(()=>{if(!localStorage.getItem("laptopzone_token")) return navigate("/login?redirect=/orders");api.get("/orders").then(r=>setOrders(r.data)).catch(console.error)},[navigate]);
  const logout=()=>{localStorage.removeItem("laptopzone_token");localStorage.removeItem("laptopzone_user");navigate("/")};
  return <><Header/><main className="container orders-page"><div className="breadcrumb">Trang chủ › <b>Đơn hàng của tôi</b></div><div className="orders-head"><div><h1>Đơn hàng của tôi</h1><p>Theo dõi những đơn hàng bạn đã đặt.</p></div><button onClick={logout}>Đăng xuất</button></div>{orders.length===0?<div className="empty-box">Bạn chưa có đơn hàng. <Link to="/">Mua sắm ngay</Link></div>:<div className="customer-orders">{orders.map(o=><div className="customer-order-card" key={o.id}><div><b>#{o.order_code}</b><span>{new Date(o.created_at).toLocaleString("vi-VN")}</span></div><div><span>{o.receiver_name}</span><span>{o.payment_method}</span></div><div><span className={`status-chip ${o.order_status}`}>{labels[o.order_status]||o.order_status}</span><strong>{Number(o.total_amount).toLocaleString("vi-VN")} đ</strong></div><button onClick={()=>navigate(`/orders/${o.id}`)}>Xem chi tiết</button></div>)}</div>}</main><Footer/></>;
}
