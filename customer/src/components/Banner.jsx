import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section className="hero-grid">
      <div className="hero-main">
        <div className="hero-overlay">
          <span className="eyebrow">SIÊU HỦI LAPTOP GAMING</span>
          <h1>Giảm Đến <span>5.000.000đ</span> Trả Góp 0%</h1>
          <p>Tặng kèm balo ROG cao cấp + Chuột gaming không dây chính hãng + nâng cấp RAM.</p>
          <Link to="/?search=ASUS" className="primary-btn">Mua Ngay</Link>
        </div>
      </div>
      <div className="hero-side">
        <div className="mini-banner office">
          <b>Laptop Văn Phòng</b>
          <span>Chỉ từ 9.990.000đ</span>
        </div>
        <div className="mini-banner apple">
          <b>MacBook M3 Mới Nhất</b>
          <span>Hỗ trợ thu cũ đổi mới giá hời</span>
        </div>
      </div>
    </section>
  );
}
