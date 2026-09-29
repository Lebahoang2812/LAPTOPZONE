import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function Settings(){
  return <div className="admin-app"><Sidebar/><div className="admin-content"><Header title="Cấu Hình Hệ Thống"/><main className="admin-main">
    <div className="settings-tabs"><b>Thông tin cửa hàng</b><span>Thanh toán</span><span>Vận chuyển</span><span>Email cấu hình</span><span>Bảo mật</span></div>
    <div className="settings-grid"><section className="admin-card"><h2>Thiết lập thông tin chung</h2><div className="form-two"><label>Tên cửa hàng / Doanh nghiệp<input defaultValue="LaptopZone Việt Nam"/></label><label>Số điện thoại hotline<input defaultValue="1900 8198"/></label><label>Email liên hệ kỹ thuật<input defaultValue="admin@laptopzone.vn"/></label><label>Email hỗ trợ kinh doanh<input defaultValue="sales@laptopzone.vn"/></label><label className="full-field">Địa chỉ văn phòng / Store chính<input defaultValue="Số 120, Đường Thái Hà, Phường Trung Liệt, Quận Đống Đa, Hà Nội"/></label><label>Giờ mở cửa hoạt động<input defaultValue="08:00 AM - 21:30 PM (Thứ 2 - Chủ Nhật)"/></label><label>Liên kết Facebook Fanpage<input defaultValue="https://facebook.com/laptopzone.vietnam"/></label></div><div className="settings-actions"><button className="cancel-btn">Hủy thay đổi</button><button className="admin-primary">Lưu cấu hình</button></div></section><aside><div className="admin-card"><h2>Logo Hệ Thống</h2><div className="logo-upload">▱<b>Tải lên Logo mới</b><small>Định dạng PNG, JPG tối đa 2MB</small></div></div><div className="admin-card"><h2>Phiên bản hệ thống</h2><p>Admin Panel <b className="float-right">v1.0.0</b></p><p>E-commerce Core <b className="float-right">v1.0.0</b></p></div></aside></div>
  </main></div></div>;
}
