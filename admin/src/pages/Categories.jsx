import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

export default function Categories() {
    const [data, setData] = useState([]);
    const [form, setForm] = useState({ name: "", description: "" });

    const load = () => {
        api.get("/categories")
            .then((r) => setData(Array.isArray(r.data) ? r.data : []))
            .catch((err) => {
                console.error("Lỗi lấy danh sách danh mục:", err);
                setData([]); // Chống trắng màn hình nếu API lỗi
            });
    };

    // ✅ Đã sửa lỗi: Bọc hàm load() bên trong arrow function {}
    useEffect(() => {
        load();
    }, []);

    const add = async (e) => {
        e.preventDefault();
        try {
            await api.post("/categories", form);
            setForm({ name: "", description: "" });
            load();
        } catch (err) {
            console.error("Lỗi thêm danh mục:", err);
        }
    };

    return (
        <div className="admin-app">
            <Sidebar />
            <div className="admin-content">
                <Header title="Quản Lý Danh Mục" />
                <main className="admin-main two-col">
                    <div>
                        <div className="page-top">
                            <div>
                                <h2>Danh sách danh mục</h2>
                                <p>Có {data.length} danh mục trong hệ thống</p>
                            </div>
                        </div>
                        <div className="admin-card">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên danh mục</th>
                                        <th>Mô tả</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(data || []).map((cat) => (
                                        <tr key={cat.id}>
                                            <td>#{cat.id}</td>
                                            <td><b>{cat.name}</b></td>
                                            <td>{cat.description || "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <form className="admin-card form-card" onSubmit={add}>
                        <h2>Thêm Danh Mục Mới</h2>
                        <label>
                            Tên danh mục
                            <input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                placeholder="VD: Laptop Gaming"
                                required
                            />
                        </label>
                        <label>
                            Mô tả
                            <textarea
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Nhập mô tả..."
                                rows="4"
                            />
                        </label>
                        <button className="admin-primary full">Lưu danh mục</button>
                    </form>
                </main>
            </div>
        </div>
    );
}