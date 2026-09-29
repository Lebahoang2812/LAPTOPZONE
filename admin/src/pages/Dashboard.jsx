import { useEffect, useState } from "react";
import { DollarSign, ShoppingBag, Users, Laptop } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import api from "../services/api";

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        Promise.all([api.get("/orders"), api.get("/products"), api.get("/customers")]).then(([o, p, c]) => {
            setOrders(o.data); setProducts(p.data); setCustomers(c.data);
        });
    }, []);

    const revenue = orders.reduce((s, o) => s + Number(o.total_amount || 0), 0);
    const recent = orders.slice(0, 4);

    return (
        <div className="admin-app">
            <Sidebar />
            <div className="admin-content">
                <Header title="Tổng Quan Hệ Thống" />
                <main className="admin-main">
                    <div className="stat-grid">
                        <StatCard
                            label="DOANH THU THÁNG"
                            value={`${revenue.toLocaleString("vi-VN")} đ`}
                            growth="+12.5%"
                            icon={DollarSign}
                        />
                        <StatCard
                            label="ĐƠN HÀNG MỚI"
                            value={`${orders.length} đơn`}
                            growth="+8.3%"
                            icon={ShoppingBag}
                        />
                        <StatCard
                            label="KHÁCH HÀNG MỚI"
                            value={`${customers.length} user`}
                            growth="+15.1%"
                            icon={Users}
                        />
                        <StatCard
                            label="SẢN PHẨM HOẠT ĐỘNG"
                            value={`${products.filter(p => p.stock > 0).length} laptop`}
                            growth="-2.4%"
                            icon={Laptop}
                        />
                    </div>

                    <div className="dash-grid">
                        <section className="admin-card chart-card">
                            <h2>Báo cáo doanh thu tuần qua</h2>
                            <p>Tổng giao dịch: {revenue.toLocaleString("vi-VN")} đ</p>
                            <div className="fake-chart">
                                {[25, 42, 32, 65, 38, 48, 36].map((n, i) => (
                                    <div key={i} style={{ height: `${n}%` }}>
                                        <span>{["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="admin-card">
                            <h2>Sản phẩm bán chạy nhất</h2>
                            {products.slice(0, 3).map((p, i) => (
                                <div className="best-item" key={p.id}>
                                    <img src={p.image_url} alt={p.name} />
                                    <div>
                                        <b>{p.name}</b>
                                        <strong>{Number(p.price).toLocaleString("vi-VN")} đ</strong>
                                    </div>
                                    <span>{45 - i * 7} máy</span>
                                </div>
                            ))}
                        </section>
                    </div>

                    <section className="admin-card">
                        <div className="card-title-row">
                            <h2>Đơn hàng gần đây</h2>
                            <a href="/orders">Xem tất cả đơn hàng</a>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Mã Đơn</th>
                                    <th>Khách Hàng</th>
                                    <th>Ngày Mua</th>
                                    <th>Tổng Tiền</th>
                                    <th>Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recent.map(o => (
                                    <tr key={o.id}>
                                        <td><b>#{o.order_code}</b></td>
                                        <td>{o.receiver_name}</td>
                                        <td>{new Date(o.created_at).toLocaleDateString("vi-VN")}</td>
                                        <td className="money">{Number(o.total_amount).toLocaleString("vi-VN")} đ</td>
                                        <td><span className={`status ${o.order_status}`}>{o.order_status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </main>
            </div> {/* Kết thúc admin-content */}
        </div> /* Kết thúc admin-app */
    );
}