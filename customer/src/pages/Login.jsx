import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("laptopzone_token", data.token);
      localStorage.setItem("laptopzone_user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo"><span className="logo-box">▱</span><strong>LAPTOPZONE</strong><b>ĐĂNG NHẬP HỆ THỐNG</b></div>
        <form onSubmit={submit}>
          <label>Email hoặc Số điện thoại</label>
          <div className="input-icon"><Mail size={18}/><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="example@gmail.com" required/></div>
          <label>Mật khẩu</label>
          <div className="input-icon"><Lock size={18}/><input type={show ? "text" : "password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••••" required/><button type="button" onClick={()=>setShow(!show)}>{show ? <EyeOff/> : <Eye/>}</button></div>
          {error && <p className="error">{error}</p>}
          <div className="remember"><label><input type="checkbox"/> Ghi nhớ đăng nhập</label><a>Quên mật khẩu?</a></div>
          <button className="primary-btn full">Đăng nhập</button>
        </form>
        <div className="auth-switch">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></div>
        <div className="social-login"><button>ⓧ Google</button><button>f Facebook</button></div>
      </div>
    </div>
  );
}
