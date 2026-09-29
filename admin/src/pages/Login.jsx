import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import api from "../services/api";

export default function Login() {
  const [show,setShow] = useState(false);
  const [form,setForm] = useState({email:"admin@laptopzone.vn",password:"Admin@123"});
  const [error,setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      const {data}=await api.post("/auth/login",form);
      if(data.user.role !== "admin") throw new Error("Tài khoản không có quyền quản trị");
      localStorage.setItem("laptopzone_admin_token",data.token);
      localStorage.setItem("laptopzone_admin_user",JSON.stringify(data.user));
      location.href="/";
    } catch(err) {
      setError(err.response?.data?.message || err.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="admin-auth">
      <div className="admin-auth-card">
        <div className="admin-auth-logo"><span className="side-logo-box">▱</span><b>LAPTOPZONE</b><strong>ĐĂNG NHẬP QUẢN TRỊ</strong><small>Hệ thống quản lý nội bộ e-commerce</small></div>
        <form onSubmit={submit}>
          <label>Email quản trị viên</label>
          <div className="field"><Mail size={18}/><input value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
          <label>Mật khẩu</label>
          <div className="field"><Lock size={18}/><input type={show?"text":"password"} value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff/>:<Eye/>}</button></div>
          {error && <p className="error">{error}</p>}
          <label className="remember"><input type="checkbox"/> Ghi nhớ đăng nhập trên thiết bị này</label>
          <button className="admin-primary full">Đăng Nhập Ngay</button>
        </form>
        <p className="contact-it">Liên hệ phòng IT nếu bạn quên thông tin tài khoản</p>
      </div>
    </div>
  );
}
