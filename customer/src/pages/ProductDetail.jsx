import { useEffect, useState } from "react";
import { Heart, Plus, Minus, ShoppingCart, Star, ShieldCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [activeTab, setActiveTab] = useState("specs"); // State quản lý tab đang chọn ('specs' hoặc 'reviews')

    useEffect(() => {
        api.get(`/products/${id}`).then(r => setProduct(r.data)).catch(console.error);
    }, [id]);

    if (!product) return <><Header /><main className="container loading">Đang tải sản phẩm...</main><Footer /></>;

    const price = Number(product.price);
    const old = Number(product.old_price || 0);

    const add = () => {
        const cart = JSON.parse(localStorage.getItem("laptopzone_cart") || "[]");
        const found = cart.find(x => x.product_id === product.id);
        if (found) found.quantity += qty;
        else cart.push({ product_id: product.id, name: product.name, image_url: product.image_url, price, quantity: qty });
        localStorage.setItem("laptopzone_cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cart-updated"));
        alert("Đã thêm vào giỏ hàng.");
    };

    return (
        <>
            <Header />
            <main className="container">
                <div className="breadcrumb">Trang chủ › Laptop Gaming › {product.name}</div>
                <div className="detail-top">
                    <div className="gallery">
                        <div className="gallery-main"><img src={product.image_url} alt={product.name} /></div>
                        <div className="thumbs">
                            {[product.image_url, product.image_url, product.image_url, product.image_url].map((src, i) => <img key={i} src={src} alt="" />)}
                        </div>
                    </div>

                    <div className="detail-card">
                        <div className="brand-badge">{product.brand}</div>
                        <span className="sku">Mã sản phẩm: {product.sku}</span>
                        <h1>{product.name}</h1>
                        <div className="rating large"><Star size={17} /><Star size={17} /><Star size={17} /><Star size={17} /><Star size={17} /> <span>5 đánh giá của người mua</span></div>
                        <div className="detail-price">
                            {old > price && <span className="old">{old.toLocaleString("vi-VN")} đ</span>}
                            <span>{price.toLocaleString("vi-VN")} đ</span>
                            <small>* Giá đã bao gồm thuế VAT</small>
                        </div>
                        <div className="stock"><span>●</span> Còn hàng (Sẵn sàng tại Showroom Hà Nội)</div>
                        <div className="qty-row"><b>Số lượng:</b><div className="qty-box"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={15} /></button><b>{qty}</b><button onClick={() => setQty(qty + 1)}><Plus size={15} /></button></div></div>
                        <div className="action-row">
                            <button className="outline-btn" onClick={add}><ShoppingCart size={18} /> THÊM VÀO GIỎ HÀNG<small>Thêm vào giỏ để mua tiếp</small></button>
                            <button className="primary-btn" onClick={() => { add(); location.href = "/cart"; }}>MUA NGAY<small>Giao hàng nhanh toàn quốc</small></button>
                            <button className="heart-btn"><Heart /></button>
                        </div>
                        <div className="guarantee"><ShieldCheck size={18} /> Chính hãng • Bảo hành • Đổi trả minh bạch</div>
                    </div>
                </div>

                {/* Khung chuyển đổi Tab Thông số kỹ thuật & Đánh giá */}
                <div className="spec-card" style={{ marginTop: "24px" }}>
                    <div className="tabs" style={{ display: "flex", gap: "24px", borderBottom: "2px solid #eee", marginBottom: "16px", cursor: "pointer" }}>
                        <b
                            onClick={() => setActiveTab("specs")}
                            style={{ paddingBottom: "8px", borderBottom: activeTab === "specs" ? "2px solid red" : "none", color: activeTab === "specs" ? "red" : "#333" }}
                        >
                            Thông số kỹ thuật
                        </b>
                        <span
                            onClick={() => setActiveTab("reviews")}
                            style={{ paddingBottom: "8px", borderBottom: activeTab === "reviews" ? "2px solid red" : "none", color: activeTab === "reviews" ? "red" : "#666", fontWeight: activeTab === "reviews" ? "bold" : "normal" }}
                        >
                            Đánh giá & Nhận xét
                        </span>
                    </div>

                    {/* Nội dung Tab 1: Thông số kỹ thuật */}
                    {activeTab === "specs" && (
                        <div>
                            {[
                                ["CPU", product.cpu], ["Bộ nhớ RAM", product.ram], ["Ổ cứng lưu trữ", product.storage],
                                ["Card đồ họa (GPU)", product.gpu], ["Màn hình hiển thị", product.screen], ["Dung lượng Pin", product.battery],
                                ["Trọng lượng", product.weight], ["Hệ điều hành", product.os]
                            ].map(([k, v]) => <div className="spec-row" key={k}><b>{k}</b><span>{v || "Đang cập nhật"}</span></div>)}
                        </div>
                    )}

                    {/* Nội dung Tab 2: Đánh giá & Nhận xét */}
                    {activeTab === "reviews" && (
                        <div className="reviews-tab-content" style={{ padding: "10px 0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px", background: "#f9f9f9", padding: "16px", borderRadius: "8px" }}>
                                <div>
                                    <div style={{ fontSize: "28px", fontWeight: "bold", color: "#f59e0b" }}>5.0 / 5</div>
                                    <div style={{ color: "#f59e0b", display: "flex", gap: "2px" }}><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /><Star size={14} /></div>
                                </div>
                                <div style={{ color: "#666", fontSize: "14px" }}>Dựa trên tổng số 5 đánh giá thực tế từ những khách hàng đã mua và trải nghiệm sản phẩm tại hệ thống LAPTOPZONE.</div>
                            </div>

                            {/* Danh sách bình luận mẫu */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <div style={{ borderBottom: "1px solid #eee", paddingBottom: "12px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                        <b>Hoàng Văn Nam</b>
                                        <span style={{ color: "#f59e0b", display: "flex", gap: "2px" }}><Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} /></span>
                                    </div>
                                    <p style={{ fontSize: "14px", color: "#444", margin: "4px 0" }}>Máy thiết kế rất đẹp, chạy mượt, giao hàng siêu tốc trong vòng 2 tiếng.</p>
                                    <small style={{ color: "#888" }}>Đã mua hàng tại LAPTOPZONE • 3 ngày trước</small>
                                </div>

                                <div style={{ borderBottom: "1px solid #eee", paddingBottom: "12px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                        <b>Nguyễn Thu Trang</b>
                                        <span style={{ color: "#f59e0b", display: "flex", gap: "2px" }}><Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} /><Star size={12} /></span>
                                    </div>
                                    <p style={{ fontSize: "14px", color: "#444", margin: "4px 0" }}>Nhân viên hỗ trợ nhiệt tình, cài đặt sẵn phần mềm. Rất đáng tiền!</p>
                                    <small style={{ color: "#888" }}>Đã mua hàng tại LAPTOPZONE • 1 tuần trước</small>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}