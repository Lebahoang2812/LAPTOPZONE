import supabase from "../config/supabase.js";

export async function listProducts(req,res){
  let query = supabase.from("products").select("*,categories(id,name)").order("created_at",{ascending:false});
  if (req.query.search) query = query.ilike("name", `%${req.query.search}%`);
  if (req.query.brand) query = query.eq("brand", req.query.brand);
  const {data,error}=await query;
  if(error)return res.status(500).json({message:error.message});
  res.json(data);
}
export async function getProduct(req,res){
  const {data,error}=await supabase.from("products").select("*,categories(id,name)").eq("id",req.params.id).single();
  if(error)return res.status(404).json({message:"Không tìm thấy sản phẩm"});
  res.json(data);
}
export async function createProduct(req,res){
  const {data,error}=await supabase.from("products").insert(req.body).select("*").single();
  if(error)return res.status(400).json({message:error.message});
  res.status(201).json(data);
}
export async function updateProduct(req,res){
  const {data,error}=await supabase.from("products").update({...req.body,updated_at:new Date().toISOString()}).eq("id",req.params.id).select("*").single();
  if(error)return res.status(400).json({message:error.message});
  res.json(data);
}
export async function deleteProduct(req,res){
  const {error}=await supabase.from("products").delete().eq("id",req.params.id);
  if(error)return res.status(400).json({message:error.message});
  res.json({message:"Đã xóa sản phẩm"});
}
