import { useEffect, useState } from "react";
import { Trash2, Minus, Plus, Ticket } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const load = () => setCart(JSON.parse(localStorage.getItem("laptopzone_cart") || "[]"));
  useEffect(load, []);

  const save = (next) => {
    setCart(next);
    localStorage.setItem("laptopzone_cart", JSON.stringify(next));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const changeQty = (id, delta) => save(cart.map(x => x.product_id === id ? {...x, quantity: Math.max(1, x.quantity + delta)} : x));
  const remove = (id) => save(cart.filter(x => x.product_id !== id));

  const subtotal = cart.reduce((s, x) => s + x.price * x.quantity, 0);
  const total = Math.max(0, subtotal - discount);

  const applyVoucher = () => {
    if (voucher.trim().toUpperCase() === "ZONE500" && subtotal >= 5000000) setDiscount(500000);
    else setDiscount(0);
  };

  return (
    <>
      <Header/>
      <main className="container cart-page">
        <div className="breadcrumb">Trang chủ › <b>Giỏ hàng của bạn</b></div>
        <h1>Giỏ hàng của bạn <span>({cart.length} sản phẩm)</span></h1>
        <div className="cart-layout">
          <div>
            <div className="cart-head"><b>SẢN PHẨM</b><b>ĐƠN GIÁ</b><b>SỐ LƯỢNG</b><b>TỔNG TIỀN</b></div>
            {cart.length === 0 && <div className="empty-cart">Giỏ hàng đang trống. <Link to="/">Tiếp tục mua sắm</Link></div>}
            {cart.map(item => (
              <div className="cart-row" key={item.product_id}>
                <div className="cart-product"><img src={item.image_url}/><div><span>{item.name.split(" ")[0]}</span><b>{item.name}</b><small>Core i7 | 16GB | 512GB | RTX 4060 8GB | 16.0"... </small></div></div>
                <strong>{item.price.toLocaleString("vi-VN")} đ</strong>
                <div className="qty-box"><button onClick={()=>changeQty(item.product_id,-1)}><Minus size={15}/></button><b>{item.quantity}</b><button onClick={()=>changeQty(item.product_id,1)}><Plus size={15}/></button></div>
                <strong className="red">{(item.price*item.quantity).toLocaleString("vi-VN")} đ</strong>
                <button className="remove" onClick={()=>remove(item.product_id)}><Trash2 size={18}/></button>
              </div>
            ))}
            <div className="ship-note">ⓘ Miễn phí giao hàng toàn quốc cho đơn hàng laptop | Trả góp 0% qua thẻ tín dụng nhanh chóng tiện lợi.</div>
          </div>

          <aside className="summary-card">
            <h2>Tóm tắt đơn hàng</h2>
            <div><span>Tạm tính:</span><b>{subtotal.toLocaleString("vi-VN")} đ</b></div>
            <div><span>Phí vận chuyển:</span><b className="green">Miễn phí</b></div>
            <div><span>Giảm giá Voucher:</span><b className="red">- {discount.toLocaleString("vi-VN")} đ</b></div>
            <div className="voucher-box"><Ticket/><input value={voucher} onChange={e=>setVoucher(e.target.value)} placeholder="Nhập mã ZONE500"/><button onClick={applyVoucher}>Áp dụng</button></div>
            <hr/>
            <div className="grand"><b>Thành tiền:</b><strong>{total.toLocaleString("vi-VN")} đ</strong></div>
            <button className="primary-btn full" disabled={!cart.length} onClick={()=>navigate("/checkout")}>TIẾN HÀNH THANH TOÁN</button>
            <Link to="/" className="continue">Tiếp tục mua sắm</Link>
          </aside>
        </div>
      </main>
      <Footer/>
    </>
  );
}
