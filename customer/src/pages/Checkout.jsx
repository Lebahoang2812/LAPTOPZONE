import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useMemo(() => JSON.parse(localStorage.getItem("laptopzone_cart") || "[]"), []);
  const user = JSON.parse(localStorage.getItem("laptopzone_user") || "{}");
  const [form, setForm] = useState({
    name: user.full_name || "",
    phone: user.phone || "",
    email: user.email || "",
    province: "Hà Nội",
    district: "Cầu Giấy",
    ward: "Dịch Vọng Hậu",
    address: user.address || "",
    note: ""
  });
  const [payment, setPayment] = useState("COD");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("laptopzone_token")) {
      navigate("/login?redirect=/checkout", { replace: true });
    }
    if (!cart.length) navigate("/cart", { replace: true });
  }, [navigate, cart.length]);

  const subtotal = cart.reduce((s, x) => s + x.price * x.quantity, 0);
  const discount = subtotal >= 5000000 ? 500000 : 0;
  const total = subtotal - discount;
  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const submit = async () => {
    if (!form.name || !form.phone || !form.address) return alert("Vui lòng nhập đủ thông tin nhận hàng.");
    setSubmitting(true);
    try {
      const { data } = await api.post("/orders", {
        items: cart.map(item => ({ product_id: item.product_id, quantity: item.quantity })),
        payment_method: payment,
        receiver_name: form.name,
        receiver_phone: form.phone,
        receiver_email: form.email,
        receiver_address: `${form.address}, ${form.ward}, ${form.district}, ${form.province}`,
        note: form.note
      });
      localStorage.removeItem("laptopzone_cart");
      window.dispatchEvent(new Event("cart-updated"));
      alert(`Đặt hàng thành công! Mã đơn: ${data.order_code}`);
      navigate("/login?redirect=/orders");
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login?redirect=/checkout");
        return;
      }
      alert(err.response?.data?.message || "Không thể tạo đơn hàng");
    } finally {
      setSubmitting(false);
    }
  };

  return <>
    <Header/>
    <main className="container checkout">
      <div className="breadcrumb">Trang chủ › Giỏ hàng › <b>Thanh toán đơn hàng</b></div>
      <h1>Thông tin thanh toán</h1>
      <div className="checkout-layout">
        <div>
          <section className="checkout-section">
            <h2><span>1</span> Thông tin khách hàng</h2>
            <div className="form-grid">
              <label>Họ và tên *<input value={form.name} onChange={e => update("name", e.target.value)}/></label>
              <label>Số điện thoại *<input value={form.phone} onChange={e => update("phone", e.target.value)}/></label>
              <label className="full-field">Email<input value={form.email} onChange={e => update("email", e.target.value)}/></label>
            </div>
          </section>
          <section className="checkout-section">
            <h2><span>2</span> Địa chỉ nhận hàng</h2>
            <div className="form-grid three">
              <label>Tỉnh/Thành phố<select value={form.province} onChange={e => update("province", e.target.value)}><option>Hà Nội</option><option>Hải Phòng</option><option>Quảng Ninh</option></select></label>
              <label>Quận/Huyện<select value={form.district} onChange={e => update("district", e.target.value)}><option>Cầu Giấy</option><option>Đống Đa</option></select></label>
              <label>Phường/Xã<select value={form.ward} onChange={e => update("ward", e.target.value)}><option>Dịch Vọng Hậu</option><option>Trung Hòa</option></select></label>
              <label className="full-field">Số nhà, tên đường *<input value={form.address} onChange={e => update("address", e.target.value)} /></label>
              <label className="full-field">Ghi chú<textarea value={form.note} onChange={e => update("note", e.target.value)} /></label>
            </div>
          </section>
          <section className="checkout-section">
            <h2><span>3</span> Phương thức thanh toán</h2>
            {[
              ["COD", "Thanh toán khi nhận hàng (COD)", "Kiểm tra hàng trước khi thanh toán"],
              ["BANK_QR", "Chuyển khoản ngân hàng qua mã QR", "Xác nhận thanh toán nhanh"],
              ["E_WALLET", "Ví điện tử MoMo / ZaloPay", "Thanh toán trực tuyến"]
            ].map(([value, title, sub]) => <label className={`payment-option ${payment === value ? "selected" : ""}`} key={value}>
              <input type="radio" name="payment" checked={payment === value} onChange={() => setPayment(value)}/>
              <div><b>{title}</b><small>{sub}</small></div>
            </label>)}
          </section>
        </div>
        <aside className="order-summary">
          <h2>Chi tiết đơn hàng</h2>
          {cart.map(item => <div className="mini-item" key={item.product_id}><img src={item.image_url}/><div><b>{item.name}</b><small>SL: {item.quantity}</small></div><strong>{(item.price * item.quantity).toLocaleString("vi-VN")} đ</strong></div>)}
          <hr/>
          <div><span>Cộng tiền hàng</span><b>{subtotal.toLocaleString("vi-VN")} đ</b></div>
          <div><span>Phí vận chuyển</span><b className="green">Miễn phí</b></div>
          <div><span>Voucher ZONE500</span><b className="red">- {discount.toLocaleString("vi-VN")} đ</b></div>
          <hr/>
          <div className="checkout-total"><b>Tổng thanh toán:</b><strong>{total.toLocaleString("vi-VN")} đ</strong></div>
          <button className="primary-btn full" onClick={submit} disabled={submitting}>{submitting ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐẶT HÀNG"}</button>
          <small className="legal">Nhấn xác nhận đồng nghĩa với việc bạn đồng ý chính sách của LAPTOPZONE.</small>
        </aside>
      </div>
    </main>
    <Footer/>
  </>;
}
