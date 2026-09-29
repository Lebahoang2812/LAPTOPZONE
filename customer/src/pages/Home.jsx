import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import api from "../services/api";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        Promise.all([
            api.get("/products"),
            api.get("/categories")
        ])
            .then(([p, c]) => {
                setProducts(Array.isArray(p.data) ? p.data : []);
                setCategories(Array.isArray(c.data) ? c.data : []);
            })
            .catch(console.error);
    }, []);

    // Đọc các thông số lọc từ URL query
    const search = (searchParams.get("search") || "").toLowerCase();
    const currentBrand = (searchParams.get("brand") || "").toLowerCase();
    const currentCategory = searchParams.get("category");

    // Xử lý sao chép Mã giảm giá
    const handleCopyCoupon = (code) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Xử lý khi bấm vào Thương hiệu (DELL, HP, LENOVO...)
    const handleSelectBrand = (brandName) => {
        if (currentBrand === brandName.toLowerCase()) {
            // Bấm lại thương hiệu đang chọn -> Bỏ lọc
            searchParams.delete("brand");
            setSearchParams(searchParams);
        } else {
            searchParams.set("brand", brandName);
            setSearchParams(searchParams);
        }
    };

    // Lọc sản phẩm theo Search, Brand và Category
    const filtered = products.filter((p) => {
        const pName = (p.name || "").toLowerCase();
        const pBrand = (p.brand || "").toLowerCase();

        const matchSearch = !search || pName.includes(search) || pBrand.includes(search);
        const matchBrand = !currentBrand || pBrand === currentBrand;
        const matchCategory =
            !currentCategory ||
            currentCategory === "all" ||
            String(p.category_id) === String(currentCategory);

        return matchSearch && matchBrand && matchCategory;
    });

    const brands = ["DELL", "HP", "LENOVO", "ASUS", "ACER", "MSI", "MACBOOK"];

    return (
        <>
            <Header />
            <main className="container">
                <Banner />

                {/* Thanh thương hiệu: Đã thêm sự kiện click để lọc theo Hãng */}
                <div className="brand-strip">
                    {brands.map((b) => {
                        const isSelected = currentBrand === b.toLowerCase();
                        return (
                            <div
                                key={b}
                                onClick={() => handleSelectBrand(b)}
                                style={{
                                    cursor: "pointer",
                                    border: isSelected ? "2px solid #d97706" : "1px solid #e5e7eb",
                                    backgroundColor: isSelected ? "#fef3c7" : "#ffffff",
                                    transition: "all 0.2s ease"
                                }}
                            >
                                <span>{b[0]}</span>
                                <b>{b}</b>
                            </div>
                        );
                    })}
                </div>

                {/* Thanh Flash Sale & Mã giảm giá */}
                <div className="deal-row">
                    <div className="flash-sale">
                        <b>GIỜ VÀNG SĂN DEAL</b>
                        <div><strong>02</strong> : <strong>14</strong> : <strong>45</strong></div>
                    </div>
                    <div className="coupon">
                        <span>🎟️</span>
                        <div>
                            <b>GIẢM 500K ĐƠN LAPTOP</b>
                            <small>Mã: ZONE500 (Hạn 31/12)</small>
                        </div>
                        <button onClick={() => handleCopyCoupon("ZONE500")}>
                            {copied ? "Đã chép! ✓" : "Sao chép"}
                        </button>
                    </div>
                </div>

                {/* Danh Mục Nổi Bật (Có id để cuộn từ Header) */}
                <section id="categories-section">
                    <div className="section-title">
                        <h2>Danh Mục Nổi Bật</h2>
                        {(currentBrand || search || currentCategory) && (
                            <button
                                onClick={() => setSearchParams({})}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#d97706",
                                    cursor: "pointer",
                                    fontWeight: "bold"
                                }}
                            >
                                ✕ Xóa tất cả bộ lọc
                            </button>
                        )}
                    </div>
                    <div className="category-grid">
                        {categories.slice(0, 6).map((c, i) => (
                            <CategoryCard key={c.id} category={c} index={i} />
                        ))}
                    </div>
                </section>

                {/* Danh sách sản phẩm được lọc */}
                <section>
                    <div className="section-title">
                        <h2>
                            {search
                                ? `Kết quả tìm kiếm cho "${search}"`
                                : currentBrand
                                    ? `Laptop thương hiệu ${currentBrand.toUpperCase()}`
                                    : "Sản Phẩm Đang Khuyến Mãi"}
                        </h2>
                        <a href="#all">Xem tất cả →</a>
                    </div>

                    {filtered.length === 0 ? (
                        <p style={{ padding: "20px 0", textAlign: "center", color: "#666" }}>
                            Không tìm thấy sản phẩm nào phù hợp.
                        </p>
                    ) : (
                        <div className="product-grid">
                            {filtered.slice(0, 8).map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    )}
                </section>

                {/* Top Sản Phẩm Bán Chạy */}
                <section id="all">
                    <div className="section-title">
                        <h2>Top Sản Phẩm Bán Chạy Nhất</h2>
                        <a href="#all">Xem tất cả →</a>
                    </div>
                    <div className="product-grid">
                        {filtered.slice(0, 4).map((p, i) => (
                            <ProductCard key={`${p.id}-${i}`} product={p} hot />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}