import { Search, MapPin, ShoppingCart, UserRound, Menu, Phone, X, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
    const navigate = useNavigate();
    const [count, setCount] = useState(0);

    // State quản lý việc chọn Vị trí & hiển thị Popup chọn khu vực
    const [location, setLocation] = useState("Hà Nội");
    const [showLocationModal, setShowLocationModal] = useState(false);

    const locations = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];

    const refreshCart = () => {
        const cart = JSON.parse(localStorage.getItem("laptopzone_cart") || "[]");
        setCount(cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0));
    };

    useEffect(() => {
        refreshCart();
        window.addEventListener("cart-updated", refreshCart);
        return () => window.removeEventListener("cart-updated", refreshCart);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const q = new FormData(e.currentTarget).get("q");
        if (q?.trim()) navigate(`/?search=${encodeURIComponent(q.trim())}`);
    };

    // Xử lý khi click vào nút "Danh mục sản phẩm"
    const handleCategoryClick = () => {
        const element = document.getElementById("categories-section");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate("/?category=all");
        }
    };

    const loggedIn = Boolean(localStorage.getItem("laptopzone_token"));

    return (
        <>
            {/* Topbar: Đã đổi các <span> thành thẻ <Link> để bấm được */}
            <div className="topbar">
                <div className="container topbar-inner">
                    <span><Phone size={14} /> Hotline: <b>1800.1234</b> (Miễn phí)</span>
                    <span>● Hệ thống 45 cửa hàng toàn quốc</span>
                    <div className="top-links">
                        <Link to="/news">Tin Công Nghệ</Link>
                        <Link to="/build-pc">Xây Dựng Cấu Hình</Link>
                        <Link to="/warranty">Tra Cứu Bảo Hành</Link>
                    </div>
                </div>
            </div>

            {/* Header chính */}
            <header className="main-header">
                <div className="container header-inner">
                    <Link to="/" className="logo">
                        <span className="logo-box">▱</span>
                        <span>
                            <strong>LAPTOPZONE</strong>
                            <small>CHUYÊN LAPTOP SỐ 1</small>
                        </span>
                    </Link>

                    {/* Nút Danh mục sản phẩm */}
                    <button className="category-btn" onClick={handleCategoryClick}>
                        <Menu size={18} />
                        Danh mục sản phẩm
                    </button>

                    {/* Nút Xem giá tại (Có bấm mở chọn Hà Nội/TP.HCM...) */}
                    <button className="location-btn" onClick={() => setShowLocationModal(true)}>
                        <MapPin size={18} />
                        <span><small>Xem giá tại</small><b>{location}</b></span>
                        <ChevronDown size={14} style={{ marginLeft: "2px" }} />
                    </button>

                    {/* Ô Tìm kiếm */}
                    <form className="search-box" onSubmit={handleSearch}>
                        <input name="q" placeholder="Hôm nay bạn muốn tìm laptop gì?" />
                        <button aria-label="Tìm kiếm"><Search size={20} /></button>
                    </form>

                    <div className="hotline">
                        Gọi mua hàng
                        <b>1800.1234</b>
                    </div>

                    {/* Giỏ hàng */}
                    <Link to="/cart" className="cart-link">
                        <ShoppingCart size={24} />
                        <span className="badge">{count}</span>
                        <b>Giỏ hàng</b>
                    </Link>

                    {/* Tài khoản */}
                    <button className="account-btn" onClick={() => navigate(loggedIn ? "/profile" : "/login")}>
                        <UserRound size={22} />
                        <span>Xin chào,<b>{loggedIn ? "Tài khoản" : "Đăng nhập"}</b></span>
                    </button>
                </div>
            </header>

            {/* Bảng Popup chọn Vị Trí (Tự động hiển thị khi bấm nút Vị trí) */}
            {showLocationModal && (
                <div
                    onClick={() => setShowLocationModal(false)}
                    style={{
                        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
                        alignItems: "center", justifyContent: "center", zIndex: 9999
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#fff", padding: "20px", borderRadius: "8px", width: "320px", boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
                        }}
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Chọn khu vực xem giá</h3>
                            <button onClick={() => setShowLocationModal(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                                <X size={20} />
                            </button>
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {locations.map((loc) => (
                                <li
                                    key={loc}
                                    style={{
                                        padding: "10px 12px", borderBottom: "1px solid #eee", cursor: "pointer", borderRadius: "4px",
                                        fontWeight: location === loc ? "bold" : "normal",
                                        color: location === loc ? "#d97706" : "#333",
                                        backgroundColor: location === loc ? "#fef3c7" : "transparent"
                                    }}
                                    onClick={() => {
                                        setLocation(loc);
                                        setShowLocationModal(false);
                                    }}
                                >
                                    {loc} {location === loc && " ✓"}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}