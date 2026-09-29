import { useState } from "react";
import { UserRound, Phone, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ full_name:"Nguyễn Văn A", phone:"", email:"", password:"", confirm_password:"" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const update = (key, value) => setForm(prev => ({...prev, [key]: value}));

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm_password) return setError("Mật khẩu xác nhận không khớp");
    try {
      await api.post("/auth/register", form);
      alert("Đăng ký thành công. Bạn hãy đăng nhập.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo"><span className="logo-box">▱</span><strong>LAPTOPZONE</strong><b>ĐĂNG KÝ TÀI KHOẢN MỚI</b></div>
        <form onSubmit={submit}>
          <label>Họ và Tên</label><div className="input-icon"><UserRound size={18}/><input value={form.full_name} onChange={e=>update("full_name",e.target.value)} required/></div>
          <label>Số điện thoại</label><div className="input-icon"><Phone size={18}/><input value={form.phone} onChange={e=>update("phone",e.target.value)} required/></div>
          <label>Địa chỉ Email</label><div className="input-icon"><Mail size={18}/><input type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="example@gmail.com" required/></div>
          <label>Mật khẩu</label><div className="input-icon"><Lock size={18}/><input type={show ? "text" : "password"} value={form.password} onChange={e=>update("password",e.target.value)} required/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div>
          <div className="strength"><i/><i/><i/><i/><small>Mạnh</small></div>
          <label>Xác nhận mật khẩu</label><div className="input-icon"><Lock size={18}/><input type="password" value={form.confirm_password} onChange={e=>update("confirm_password",e.target.value)} required/></div>
          {error && <p className="error">{error}</p>}
          <label className="consent"><input type="checkbox" required/> Tôi đồng ý với các Điều khoản dịch vụ và Chính sách bảo mật của LAPTOPZONE.</label>
          <button className="primary-btn full">Đăng ký tài khoản</button>
        </form>
        <div className="auth-switch">Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></div>
      </div>
    </div>
  );
}
