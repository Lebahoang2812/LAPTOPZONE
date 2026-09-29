import { Bell, ExternalLink, Search } from "lucide-react";

export default function Header({ title }) {
  return (
    <header className="admin-header">
      <h1>{title}</h1>
      <div className="admin-top-actions">
        <div className="admin-search"><Search size={18}/><input placeholder="Tìm kiếm nhanh... (Mã đơn, sản phẩm,...)" /></div>
        <button className="bell"><Bell size={20}/><span>5</span></button>
        <button className="store-btn" onClick={() => window.open("/", "_blank")}><ExternalLink size={16}/> Xem cửa hàng</button>
      </div>
    </header>
  );
}
