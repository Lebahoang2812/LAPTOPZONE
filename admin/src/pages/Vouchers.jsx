import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

export default function Vouchers() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({
        code: "",
        discount_type: "fixed",
        discount_value: "500000",
        min_order: "5000000",
        usage_limit: "100"
    });

    const load = () => {
        api.get("/vouchers")
            .then((r) => setData(Array.isArray(r.data) ? r.data : []))
            .catch((err) => {
                console.error("Lỗi lấy danh sách voucher:", err);
                setData([]);
            });
    };

    // ✅ Sửa lỗi useEffect: Bọc hàm call trong block {} để không return Promise
    useEffect(() => {
        load();
    }, []);

    const add = async (e) => {
        e.preventDefault();
        try {
            await api.post("/vouchers", {
                ...form,
                discount_value: Number(form.discount_value),
                min_order: Number(form.min_order),
                usage_limit: Number(form.usage_limit)
            });
            setForm({
                code: "",
                discount_type: "fixed",
                discount_value: "500000",
                min_order: "5000000",
                usage_limit: "100"
            });
            load();
        } catch (err) {
            console.error("Lỗi thêm voucher:", err);
        }
    };

    return (
        <div className="admin-app">
            <Sidebar />
            <div className="admin-content">
                <Header title="Quản Lý Voucher & Khuyến Mãi" />
                <main className="admin-main two-col">
                    <div>
                        <div className="page-top">
                            <div>
                                <h2>Mã giảm giá đang hoạt động</h2>
                                <p>Có {data.length} mã giảm giá trong hệ thống</p>
                            </div>
                        </div>
                        <div className="admin-card">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Mã Code</th>
                                        <th>Loại giảm</th>
                                        <th>Giá trị</th>
                                        <th>Điều kiện</th>
                                        <th>Đã dùng / Giới hạn</th>
                                        <th>Hạn sử dụng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(data || []).map((v) => (
                                        <tr key={v.id}>
                                            <td><b>{v.code}</b></td>
                                            <td>{v.discount_type}</td>
                                            <td className="money">
                                                {Number(v.discount_value).toLocaleString("vi-VN")} đ
                                            </td>
                                            <td>
                                                Đơn từ {Number(v.min_order).toLocaleString("vi-VN")} đ
                                            </td>
                                            <td>{v.used_count || 0} / {v.usage_limit}</td>
                                            <td>
                                                {v.end_date ? new Date(v.end_date).toLocaleDateString("vi-VN") : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <form className="admin-card form-card" onSubmit={add}>
                        <h2>Tạo Voucher Mới Nhanh</h2>
                        <label>
                            Mã giảm giá
                            <input
                                value={form.code}
                                onChange={(e) => setForm({ ...form, code: e.target.value })}
                                placeholder="VD: GAMING2026"
                                required
                            />
                        </label>
                        <label>
                            Loại voucher
                            <select
                                value={form.discount_type}
                                onChange={(e) => setForm({ ...form, discount_type: e.target.value })}
                            >
                                <option value="fixed">Số tiền cố định (đ)</option>
                                <option value="percent">Phần trăm (%)</option>
                            </select>
                        </label>
                        <label>
                            Mức giảm giá
                            <input
                                type="number"
                                value={form.discount_value}
                                onChange={(e) => setForm({ ...form, discount_value: e.target.value })}
                            />
                        </label>
                        <label>
                            Điều kiện tối thiểu
                            <input
                                type="number"
                                value={form.min_order}
                                onChange={(e) => setForm({ ...form, min_order: e.target.value })}
                            />
                        </label>
                        <label>
                            Giới hạn sử dụng
                            <input
                                type="number"
                                value={form.usage_limit}
                                onChange={(e) => setForm({ ...form, usage_limit: e.target.value })}
                            />
                        </label>
                        <button className="admin-primary full">Lưu và phát hành ngay</button>
                    </form>
                </main>
            </div>
        </div>
    );
}