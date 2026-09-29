export default function StatCard({ label, value, growth, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top"><span>{label}</span><div className="stat-icon"><Icon size={18}/></div></div>
      <strong>{value}</strong>
      <small className={growth?.startsWith("-") ? "danger" : ""}>{growth} <span>so với tháng trước</span></small>
    </div>
  );
}
