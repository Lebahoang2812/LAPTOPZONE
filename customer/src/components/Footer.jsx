export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand"><span className="logo-box">▱</span> LAPTOPZONE</div>
          <p>Hệ thống bán lẻ laptop chính hãng hàng đầu Việt Nam. Cung cấp laptop văn phòng, laptop gaming, workstation chất lượng cao từ các thương hiệu lớn toàn cầu.</p>
          <p className="muted">Địa chỉ: 123 Wellness Avenue, Suite 200, Hà Nội</p>
        </div>
        <div>
          <h4>Hỗ trợ khách hàng</h4>
          <p>Chính sách bảo hành</p>
          <p>Chính sách đổi trả</p>
          <p>Phương thức thanh toán</p>
          <p>Hướng dẫn mua trả góp</p>
          <p>Giao hàng & Lắp đặt</p>
        </div>
        <div>
          <h4>Về chúng tôi</h4>
          <p>Hệ thống cửa hàng</p>
          <p>Tuyển dụng nhân sự</p>
          <p>Liên hệ hợp tác</p>
          <p>Đóng góp ý kiến</p>
          <p>Khiếu nại dịch vụ</p>
        </div>
        <div>
          <h4>Phương thức thanh toán</h4>
          <div className="payments"><span>VISA</span><span>VNPAY</span><span>MOMO</span><span>CASH</span></div>
          <h4>Kết nối với chúng tôi</h4>
          <div className="socials"><span>f</span><span>yt</span><span>tkt</span></div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 LAPTOPZONE. Toàn bộ bản quyền thuộc về Công ty Cổ phần Bán lẻ Công nghệ LAPTOPZONE.</span>
        <span>Đã thông báo với <b>BỘ CÔNG THƯƠNG</b></span>
      </div>
    </footer>
  );
}
