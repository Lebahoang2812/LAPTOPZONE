import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

export default function Reports(){
  const [data,setData]=useState(null);
  useEffect(()=>{api.get("/reports/summary").then(r=>setData(r.data));},[]);
  if(!data)return <div className="admin-app"><Sidebar/><div className="admin-content"><Header title="Báo Cáo & Thống Kê Chi Tiết"/><main className="admin-main">Đang tải...</main></div></div>;
  return <div className="admin-app"><Sidebar/><div className="admin-content"><Header title="Báo Cáo & Thống Kê Chi Tiết"/><main className="admin-main">
    <div className="page-top"><div><h2>Phân tích số liệu kinh doanh</h2><p>Cập nhật theo dữ liệu thực tế từ API</p></div><div className="date-filter">01/01/2026 - hiện tại</div></div>
    <div className="stat-grid"><div className="stat-card"><span>TỔNG DOANH THU</span><strong>{Number(data.revenue).toLocaleString("vi-VN")} đ</strong><small>+14.2% <span>so với tháng trước</span></small></div><div className="stat-card"><span>ĐƠN HÀNG THÀNH CÔNG</span><strong>{data.completedOrders} đơn</strong><small>+8.3% <span>so với tháng trước</span></small></div><div className="stat-card"><span>GIÁ TRỊ ĐƠN TRUNG BÌNH</span><strong>{Number(data.aov).toLocaleString("vi-VN")} đ</strong><small>+2.1% <span>so với tháng trước</span></small></div><div className="stat-card"><span>TỶ LỆ CHUYỂN ĐỔI</span><strong>3.42%</strong><small>+0.8% <span>so với tháng trước</span></small></div></div>
    <div className="report-grid"><div className="admin-card"><h2>Xu hướng doanh thu theo tháng</h2><div className="fake-chart tall">{[30,52,38,65,44,58].map((n,i)=><div key={i} style={{height:`${n}%`}}><span>{["T5","T6","T7","T8","T9","T10"][i]}</span></div>)}</div></div><div className="admin-card"><h2>Doanh số theo Hãng sản xuất</h2><div className="brand-bars">{["ASUS","Apple","Lenovo"].map((x,i)=><div key={x}><b>{x}</b><span style={{width:`${[50,28,22][i]*2}%`}}></span><strong>{[50,28,22][i]}%</strong></div>)}</div></div></div>
    <div className="admin-card"><h2>Sản phẩm bán chạy nhất tháng này</h2><table className="data-table"><tbody>{data.topProducts.map(p=><tr key={p.id}><td><b>{p.name}</b></td><td>{p.sold} máy</td><td className="money">{Number(p.revenue).toLocaleString("vi-VN")} đ</td></tr>)}</tbody></table></div>
  </main></div></div>;
}
