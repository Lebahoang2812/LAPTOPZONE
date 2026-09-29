import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ message: "Chưa đăng nhập" });

    const token = header.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { data: user, error } = await supabase
      .from("customers")
      .select("id,full_name,email,phone,role,status")
      .eq("id", payload.id)
      .single();

    if (error || !user || user.status !== "active") return res.status(401).json({ message: "Phiên đăng nhập không hợp lệ" });

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ message: "Bạn không có quyền quản trị" });
  next();
}
