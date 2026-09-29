import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";

function sign(user) {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export async function register(req, res) {
  const { full_name, phone, email, password } = req.body;
  if (!full_name || !email || !password) return res.status(400).json({ message: "Vui lòng nhập đủ thông tin bắt buộc" });

  const { data: existed } = await supabase.from("customers").select("id").eq("email", email).maybeSingle();
  if (existed) return res.status(409).json({ message: "Email đã tồn tại" });

  const password_hash = await bcrypt.hash(password, 10);
  const { data, error } = await supabase.from("customers").insert({
    full_name, phone, email, password_hash, role:"customer", status:"active"
  }).select("id,full_name,email,phone,role,status").single();

  if (error) return res.status(400).json({ message:error.message });
  res.status(201).json({ user:data });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const { data:user, error } = await supabase.from("customers").select("*").eq("email", email).maybeSingle();
  if (error || !user) return res.status(401).json({ message:"Email hoặc mật khẩu không đúng" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message:"Email hoặc mật khẩu không đúng" });
  if (user.status !== "active") return res.status(403).json({ message:"Tài khoản đã bị khóa" });

  const safe = { id:user.id, full_name:user.full_name, email:user.email, phone:user.phone, role:user.role, status:user.status };
  res.json({ token:sign(safe), user:safe });
}

export async function me(req, res) {
  res.json({ user:req.user });
}
