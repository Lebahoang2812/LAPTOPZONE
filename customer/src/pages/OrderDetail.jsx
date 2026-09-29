import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";

export default function OrderDetail(){
  const {id}=useParams(); const navigate=useNavigate(); const [order,setOrder]=useState(null);
  useEffect(()=>{api.get(`/orders/${id}`).then(r=>setOrder(r.data)).catch(()=>navigate("/orders"))},[id,navigate]);
  if(!order)return <><Header/><main className="container loading">Đang tải...</main><Footer/></>;
  return <><Header/><main className="container order-detail-page"><div className="breadcrumb">Trang chủ › Đơn hàng › <b>#{order.order_code}</b></div><div className="order-detail-grid"><section className="admin-like-card"><div className="order-title"><div><h1>Đơn hàng #{order.order_code}</h1><p>{new Date(order.created_at).toLocaleString("vi-VN")}</p></div><span>{order.order_status}</span></div>{order.order_items.map(i=><div className="order-item" key={i.id}><img src={i.products?.image_url}/><div><b>{i.products?.name}</b><small>SL: {i.quantity}</small></div><strong>{Number(i.price*i.quantity).toLocaleString("vi-VN")} đ</strong></div>)}</section><aside className="admin-like-card"><h2>Thông tin nhận hàng</h2><p><b>{order.receiver_name}</b></p><p>{order.receiver_phone}</p><p>{order.receiver_address}</p><hr/><div className="summary-lines"><span>Tạm tính</span><b>{Number(order.total_amount+order.discount).toLocaleString("vi-VN")} đ</b></div><div className="summary-lines"><span>Giảm giá</span><b>- {Number(order.discount).toLocaleString("vi-VN")} đ</b></div><div className="summary-lines grand"><span>Tổng</span><strong>{Number(order.total_amount).toLocaleString("vi-VN")} đ</strong></div></aside></div></main><Footer/></>;
}
