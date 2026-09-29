import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import api from "../services/api";

const initial = {
    name: "", sku: "", brand: "ASUS", category_id: "",
    price: "", old_price: "", stock: "",
    image_url: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=600&q=80",
    cpu: "", ram: "16GB DDR5", storage: "512GB SSD",
    gpu: "NVIDIA GeForce RTX 4060 8GB GDDR6",
    screen: '16.0" WUXGA 165Hz', battery: "90 Whrs", weight: "2.50 kg", os: "Windows 11 Home"
};

export default function Products() {
    const [products, setProducts] = useState([]);
    const [cats, setCats] = useState([]);
    const [form, setForm] = useState(initial);
    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState(null); // State mới để lưu ID sản phẩm đang sửa

    const load = () => {
        api.get("/products")
            .then(r => setProducts(Array.isArray(r.data) ? r.data : []))
            .catch(console.error);
    };

    useEffect(() => {
        load();
        api.get("/categories")
            .then(r => setCats(Array.isArray(r.data) ? r.data : []))
            .catch(console.error);
    }, []);

    // Hàm xử lý khi bấm nút "Sửa"
    const handleEdit = (product) => {
        setForm({
            ...product,
            category_id: product.category_id || "",
        });
        setEditId(product.id); // Lưu lại ID để biết đang sửa
        setOpen(true); // Mở form
        window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn màn hình lên đầu
    };

    const save = async (e) => {
        e.preventDefault();

        // BƯỚC QUAN TRỌNG: Chỉ bóc tách đúng những trường dữ liệu mà Database cần
        // Loại bỏ các trường thừa như id, created_at, updated_at, categories...
        const payload = {
            name: form.name,
            sku: form.sku,
            brand: form.brand,
            category_id: form.category_id ? Number(form.category_id) : null,
            price: Number(form.price),
            old_price: Number(form.old_price || 0),
            stock: Number(form.stock),
            image_url: form.image_url,
            cpu: form.cpu,
            ram: form.ram,
            storage: form.storage,
            gpu: form.gpu,
            screen: form.screen,
            battery: form.battery,
            weight: form.weight,
            os: form.os
        };

        try {
            if (editId) {
                // Cập nhật (PUT)
                await api.put(`/products/${editId}`, payload);
                alert("Cập nhật sản phẩm thành công!");
            } else {
                // Thêm mới (POST)
                await api.post("/products", payload);
                alert("Thêm sản phẩm thành công!");
            }
            setForm(initial);
            setEditId(null);
            setOpen(false);
            load(); // Tải lại danh sách
        } catch (error) {
            console.error("Lỗi lưu sản phẩm:", error);
            alert("Lỗi! Vui lòng kiểm tra lại dữ liệu hoặc xem tab Network.");
        }
    };

    const del = async (id) => {
        if (window.confirm("Xóa sản phẩm?")) {
            try {
                await api.delete(`/products/${id}`);
                load();
            } catch (error) {
                console.error("Lỗi xóa sản phẩm:", error);
            }
        }
    };

    return (
        <div className="admin-app">
            <Sidebar />
            <div className="admin-content">
                <Header title="Quản Lý Sản Phẩm" />
                <main className="admin-main">
                    <div className="page-top">
                        <div>
                            <h2>Danh sách sản phẩm e-commerce</h2>
                            <p>Tổng số: {products.length} sản phẩm trong hệ thống</p>
                        </div>
                        <button
                            className="admin-primary"
                            onClick={() => {
                                setForm(initial); // Reset form về rỗng
                                setEditId(null); // Đưa về trạng thái thêm mới
                                setOpen(!open);
                            }}
                        >
                            {open ? "Đóng form" : "+ Thêm sản phẩm"}
                        </button>
                    </div>

                    {open && (
                        <form className="admin-card form-card" onSubmit={save}>
                            <h3>{editId ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}</h3>
                            <div className="form-two">
                                <label>Tên sản phẩm<input value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
                                <label>SKU<input value={form.sku || ""} onChange={e => setForm({ ...form, sku: e.target.value })} required /></label>
                                <label>Hãng<input value={form.brand || ""} onChange={e => setForm({ ...form, brand: e.target.value })} /></label>
                                <label>
                                    Danh mục
                                    <select value={form.category_id || ""} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                                        <option value="">-- Chọn --</option>
                                        {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </label>
                                <label>Giá bán<input type="number" value={form.price || ""} onChange={e => setForm({ ...form, price: e.target.value })} required /></label>
                                <label>Giá cũ<input type="number" value={form.old_price || ""} onChange={e => setForm({ ...form, old_price: e.target.value })} /></label>
                                <label>Kho hàng<input type="number" value={form.stock || ""} onChange={e => setForm({ ...form, stock: e.target.value })} /></label>
                                <label>Ảnh URL<input value={form.image_url || ""} onChange={e => setForm({ ...form, image_url: e.target.value })} /></label>
                            </div>
                            <button className="admin-primary">{editId ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}</button>
                        </form>
                    )}

                    <div className="admin-card">
                        <div className="filters">
                            <input placeholder="Tìm sản phẩm theo tên, SKU..." />
                            <select><option>Danh mục: Tất cả</option></select>
                            <select><option>Hãng: Tất cả</option></select>
                            <select><option>Trạng thái: Còn hàng</option></select>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm / SKU</th>
                                    <th>Danh mục</th>
                                    <th>Giá bán</th>
                                    <th>Kho hàng</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(products || []).map(p => (
                                    <tr key={p.id}>
                                        <td><img className="table-img" src={p.image_url} alt={p.sku} /></td>
                                        <td><b>{p.name}</b><small>{p.sku}</small></td>
                                        <td>{p.categories?.name || "Laptop"}</td>
                                        <td className="money">{Number(p.price).toLocaleString("vi-VN")} đ</td>
                                        <td><b>{p.stock} máy</b></td>
                                        <td><span className={`status ${p.stock > 0 ? "success" : "danger"}`}>{p.stock > 0 ? "Còn hàng" : "Hết hàng"}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                {/* Nút Sửa được thêm mới */}
                                                <button className="icon-btn" onClick={() => handleEdit(p)} title="Sửa">✏️</button>
                                                <button className="icon-btn" onClick={() => del(p.id)} title="Xóa">🗑</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}