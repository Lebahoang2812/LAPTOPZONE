import supabase from "../config/supabase.js";

export async function listVouchers(req,res){
  const {data,error}=await supabase.from("vouchers").select("*").order("created_at",{ascending:false});
  if(error)return res.status(500).json({message:error.message});
  res.json(data);
}
export async function createVoucher(req,res){
  const {data,error}=await supabase.from("vouchers").insert(req.body).select("*").single();
  if(error)return res.status(400).json({message:error.message});
  res.status(201).json(data);
}
export async function updateVoucher(req,res){
  const {data,error}=await supabase.from("vouchers").update(req.body).eq("id",req.params.id).select("*").single();
  if(error)return res.status(400).json({message:error.message});
  res.json(data);
}
export async function deleteVoucher(req,res){
  const {error}=await supabase.from("vouchers").delete().eq("id",req.params.id);
  if(error)return res.status(400).json({message:error.message});
  res.json({message:"Đã xóa voucher"});
}
